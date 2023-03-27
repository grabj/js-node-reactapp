import { TServerConfig } from './server'
export type TEnv = 'production' | 'test' | 'development'
export type TConfig = {
    env: TEnv
    server: TServerConfig
}
const env = (process.env.NODE_ENV || 'production') as TEnv
const API_PORT = 3000
export const config: TConfig = {
    env,
    server: {
        corsOptions:
            env === 'development' ? { origin: 'localhost:' + API_PORT } : {},
        limiter: {
            time: 15 * 60 * 1000,
            max: 250,
        },
        port: API_PORT,
    },
}
