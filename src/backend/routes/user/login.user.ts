import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest, TCustomError } from '../../utils/request.utils'
import { createHash } from '../../utils/hash.utils'
import { createToken } from '../../utils/jwt.utils'

const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'
const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ'

export default {
    method: 'post',
    path: '/api/login',
    validators: [body('email').isEmail(), body('haslo').not().isEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const { email, haslo } = req.body
                const passwordHash = createHash(haslo, SALT)
                const user = await prisma.uSER.findFirst({ where: { email } })
                const passwordValid = user ? user.haslo === passwordHash : false
                try {
                    if (!user || !passwordValid)
                        throw {
                            status: StatusCodes.UNAUTHORIZED,
                            message: ReasonPhrases.UNAUTHORIZED,
                            isCustomError: true,
                        } as TCustomError
                } catch (e) {
                    console.error(e)
                    return 'Unauthorized'
                }
                const validToken = createToken(user, SECRET, '7d')
                res.setHeader('Set-Cookie', `Bearer=${validToken}`)
                return { token: validToken }
            },
        }),
} as TRoute
