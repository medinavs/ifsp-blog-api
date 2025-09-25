import { auth } from "@/shared/infra/auth/better-auth";
import { UpdateUserUseCasePayload, UpdateUserUseCaseReturn } from "./types";

export class UpdateUserUseCase {
    constructor() { }

    async execute(payload: UpdateUserUseCasePayload): Promise<UpdateUserUseCaseReturn> {
        const updatedUser = await auth.api.adminUpdateUser({
            body: {
                userId: payload.userId,
                data: {
                    name: payload.name,
                    email: payload.email,
                    image: payload.image,
                },
            },
            // requires session cookies.
            headers: payload.headers,
        });


        if (!updatedUser) {
            throw new Error('User not found')
        }

        return {
            user: updatedUser
        }
    }
}