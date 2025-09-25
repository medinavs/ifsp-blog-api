import { auth } from "@/shared/infra/auth/better-auth";
import { CreateUserUseCasePayload, CreateUserUseCaseReturn } from "./types";
import { UsersRepository } from "@/modules/account/repositories/users-repository";

export class CreateUserUseCase {
    constructor(
    ) { }

    async execute(payload: CreateUserUseCasePayload): Promise<CreateUserUseCaseReturn> {
        const createdUser = await auth.api.createUser({
            body: {
                email: payload.email,
                password: payload.password,
                name: payload.name,
                role: 'user',
            },
        });

        if (!createdUser.user) {
            throw new Error('User creation failed')
        }

        return {
            user: createdUser.user,
        }
    }
}