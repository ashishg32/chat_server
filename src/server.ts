import express from 'express';
import cookieParser from 'cookie-parser';

import config from './config';
import prisma from './prisma';
import userRouter from './routes/user';

const app = express();
const port = Number(config.port) || 3000; // Ensure port is a number

app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRouter);

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        const server = app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

        const shutdown = async (signal: string) => {
            console.log(`🛑 Received ${signal}. Closing server...`);
            await prisma.$disconnect();
            server.close(() => {
                console.log('✅ Server closed.');
                process.exit(0);
            });
        };
        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));

    } catch (error) {
        console.error('❌ Failed to connect to the database:', error);
        process.exit(1);
    }
};

startServer();
