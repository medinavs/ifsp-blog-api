import { CreateUserUseCase } from ".";

export function makeCreateUser() {
    const useCase = new CreateUserUseCase()

    return useCase
}