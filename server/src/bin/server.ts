import createConnection from '@database'
import "reflect-metadata"
import app from '@app'

class Server {
    static async start(port: number): Promise<void> {
        try {
            const connection = await createConnection()
            if(connection.isConnected) console.log('Database connected!');
            else throw new Error("Failed to connect to the database!");
            
            app.listen(port, () => console.log(`Server running at ${port}`))
        } catch (error) {
            console.log(error)
        }
    }
}

Server.start(Number(process.env.PORT) || 3000)