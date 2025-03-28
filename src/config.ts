import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.resolve(__dirname, `../config/.env.${env}`) });

interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: parseInt(process.env.PORT || '9000', 10),
    nodeEnv: env
}

export default config;
