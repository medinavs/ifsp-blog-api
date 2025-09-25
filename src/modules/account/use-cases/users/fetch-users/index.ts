import { auth } from "@/shared/infra/auth/better-auth";
import { FetchUsersUseCasePayload, FetchUsersUseCaseReturn } from "./types";

export class FetchUsersUseCase {
    constructor() { }

    async execute(payload: FetchUsersUseCasePayload): Promise<FetchUsersUseCaseReturn> {
        const users = await auth.api.listUsers({
            query: {},
            headers: payload.headers
        });

        const usersList = Array.isArray(users) ? users : users.users || [];

        return {
            users: usersList,
            total: usersList.length
        };
    }
}