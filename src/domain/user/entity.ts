export interface User {
  id: number;
  
  email: string;
  password: string;
  }

export type NewUser = Omit<User, "id">;
export type PublicUser = Omit<User, "password">;