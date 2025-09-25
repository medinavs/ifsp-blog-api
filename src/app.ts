import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import betterAuthPlugin from '@/shared/infra/http/plugins/better-auth-plugin'
import z, { ZodError } from 'zod'
import { env } from './shared/config/env'
import { registerRoutes } from './shared/infra/http/decorators/route-decorator'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { controllers } from './modules/content/http'

export const app = fastify({
    logger: {
        enabled: false,
    }
})

app.register(betterAuthPlugin)

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Cookie'
    ],
    credentials: true,
    exposedHeaders: ['Set-Cookie']
})

app.get('/health', async () => {
    return { name: 'ifsp-blog-api', status: 'OK' }
})

registerRoutes(app, controllers)

app.register(fastifySwagger, {
    swagger: {
        info: {
            title: 'IFSP Blog API',
            description: 'API for IFSP Blog System',
            version: '1.0.0'
        },
        host: 'localhost:3000',
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'Auth', description: 'Authentication endpoints' },
            { name: 'Posts', description: 'Blog posts endpoints' },
            { name: 'Users', description: 'User management endpoints' }
        ],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            },
            Cookie: {
                type: 'apiKey',
                name: 'Cookie',
                in: 'header'
            }
        }
    }
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
})


app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: z.treeifyError(error) })
    }

    if (env.ENV !== 'prod') {
        console.error(error)
    } else {
        console.error('[Production Error]', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        })
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})