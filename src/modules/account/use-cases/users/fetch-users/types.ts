import { UserWithRole } from "better-auth/plugins";

export interface FetchUsersUseCasePayload {
    headers: Record<string, string>
}

export interface FetchUsersUseCaseReturn {
    users: UserWithRole[];
    total: number;
}