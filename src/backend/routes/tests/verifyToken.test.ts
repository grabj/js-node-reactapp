import { verifyToken } from '../../utils/jwt.utils'
import jwt from 'jsonwebtoken'

describe('verifyToken', function () {
    const secret = 'mysecret'
    const payload = { userId: 123 }

    it('Zwraca valid token z payloadem, jeżeli weryfikacja się powiedzie', () => {
        // Stwórz sample token z payloadem
        const token = jwt.sign(payload, secret)

        const result = verifyToken(token, secret)

        expect(result.isValid).toBe(true)
        expect(result.content).toMatchObject(payload)
    })

    it('Zwraca invalid token z pustym payloadem, jeżeli weryfikacja się nie powiedzie', () => {
        // Stworz invalid token przez modyfikację payloada
        const token = jwt.sign(payload, secret)
        const invalidToken = token.replace('1', '2')

        const result = verifyToken(invalidToken, secret)

        expect(result.isValid).toBe(false)
        expect(result.content).toMatchObject({})
    })
})
