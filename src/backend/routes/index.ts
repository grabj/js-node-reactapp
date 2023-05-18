import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import { prisma } from '../database'
const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const apiRoutes = [getStatus, postUser]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler)
)

router.get('/users', async (req, res) => {
    const arr = await prisma.uSER.findMany()
    res.send(arr)
})

export default router
