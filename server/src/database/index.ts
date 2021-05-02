import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => createConnection(await getConnectionOptions(process.env.NODE_ENV));