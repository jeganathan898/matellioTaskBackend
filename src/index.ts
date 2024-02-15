import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import { AppDataSource } from './config/app-data-source';
import userRouter from './router/user';
import * as dotenv from "dotenv";
import path from 'path';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';
import { errorConverter, errorHandler } from './middleware/error'
dotenv.config({ path: path.join(__dirname, './.env') });

const startServer = async () => {
    const app: Express = express();
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT;
    app.use(cors())
    app.use(bodyParser.json());

    //router
    app.use('/api', userRouter)

    // send back a 404 error for any unknown api request
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    });

    // convert error to ApiError, if needed
    app.use(errorConverter);

    // handle error
    app.use(errorHandler);

    //DB Connection
    AppDataSource.initialize().then(() => {
        console.log(`Data source has been initialized`)
    }).catch((err) => {
        console.log(`Error Occured during Data source initialization  ${err}`)
    })
    
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`Server ready at http://localhost:${PORT}`);
}

startServer(); 
