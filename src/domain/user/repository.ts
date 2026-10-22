import type {  NewUser, PublicUser, User } from "./entity";

export interface Repository {
    getByEmail(email: string): Promise<User | null>;
    getById(id: number): Promise<PublicUser | null>;
    addUser(data: NewUser): Promise<PublicUser>;
}