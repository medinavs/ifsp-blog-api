import { FastifyRequest, FastifyReply } from 'fastify'
import { auth } from '@/shared/infra/auth/better-auth'
import { verifyAuthentication } from './verify-authentication'


export function verifyRole(allowedRoles: string[]) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        await verifyAuthentication(request, reply)

        if (request.user) {
            const userRole = (request.user as any).role // dont have role at user object, need to fix later

            if (!allowedRoles.includes(userRole)) {
                return reply.status(403).send({
                    error: 'Forbidden',
                    message: 'Insufficient permissions'
                })
            }
        }
    }
}