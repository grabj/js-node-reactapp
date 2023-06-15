import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

export const createToken = (
    payload: object,
    secret: string,
    expiresIn?: string
) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn || '30d',
    })
}
export const verifyToken = (
    token: string,
    secret: string
): { isValid: boolean; content: {}; status: StatusCodes } => {
    const parsedToken = token.replace('Bearer ', '')
    try {
        return {
            isValid: true,
            content: jwt.verify(parsedToken, secret) as jwt.JwtPayload,
            status: StatusCodes.OK,
        }
    } catch (err) {
        return {
            isValid: false,
            content: {},
            status: StatusCodes.UNAUTHORIZED,
        }
    }
}
