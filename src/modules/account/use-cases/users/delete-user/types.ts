export interface DeleteUserUseCasePayload {
    userId: string
    headers: Record<string, string>
}

export interface DeleteUserUseCaseReturn {
    success: boolean
}
