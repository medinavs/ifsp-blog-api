import { UpdateUserUseCase } from ".";

export function makeUpdateUser() {
    const useCase = new UpdateUserUseCase()

    return useCase
}