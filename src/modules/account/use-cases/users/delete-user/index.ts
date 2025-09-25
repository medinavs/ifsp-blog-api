import { auth } from "@/shared/infra/auth/better-auth";
import { DeleteUserUseCasePayload, DeleteUserUseCaseReturn } from "./types";

export class DeleteUserUseCase {
    constructor() { }

    async execute(payload: DeleteUserUseCasePayload): Promise<DeleteUserUseCaseReturn> {

        const deletedUser = await auth.api.removeUser({
            body: {
                userId: payload.userId,
            },
            // session cookies
            headers: payload.headers,
        });

        return {
            success: deletedUser.success || false,
        }
    }
}