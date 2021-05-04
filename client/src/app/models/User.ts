export interface User {
    name: string;
    email: string;
    id: string;
    homeTeam: string;
    password: string;
    height: number;
    age: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
