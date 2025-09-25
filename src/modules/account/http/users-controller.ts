import { Route } from "@/shared/infra/http/decorators/route-decorator";
import { verifyAuthentication } from "@/shared/infra/http/middlewares/verify-authentication";
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchUsers } from "../use-cases/users/fetch-users/factory";
import { makeCreateUser } from "../use-cases/users/create-user/factory";
import { randomUUID } from "crypto";

export class UsersController {
    constructor() { }

    @Route('GET', '/users', {
        middlewares: [verifyAuthentication]
    })
    async fetchUsers(request: FastifyRequest, reply: FastifyReply) {
        const useCase = makeFetchUsers()

        const headers = request.headers as Record<string, string>

        const users = await useCase.execute({ headers })

        return reply.send({ users });
    }

    @Route('POST', '/users', {
        middlewares: [verifyAuthentication]
    })
    async createUser(request: FastifyRequest, reply: FastifyReply) {

        const { email, password, name } = request.body as { email: string, password: string, name: string }

        const useCase = makeCreateUser()

        const { user } = await useCase.execute({ id: randomUUID(), email, password, name })

        return reply.status(201).send({ user })
    }

    // i dont gonna need put the other use-cases
    // on this controller because i found that better-auth
    // already have this features :p
}