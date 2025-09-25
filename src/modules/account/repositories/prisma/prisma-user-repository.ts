import { Prisma, User } from "@prisma/client"
import { UsersRepository } from "../users-repository"
import { prisma } from "@/shared/infra/database/client"

export class PrismaUserRepository implements UsersRepository {
    async delete(userId: string): Promise<void> {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
    }

    async findById(userId: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                emailVerified: data.emailVerified ?? false,
                image: data.image || null,
            }
        })
    }

    async save(user: User): Promise<User> {
        return await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified ?? false,
                image: user.image || null,
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async findMany(): Promise<User[]> {
        return await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
}