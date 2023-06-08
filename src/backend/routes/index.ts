import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import { prisma } from '../database'
import loginUser from './user/login.user'
import getReviews from './review/get.reviews'
import postReview from './review/post.review'
import putReview from './review/put.review'
const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const apiRoutes = [
    getStatus,
    postUser,
    loginUser,
    getReviews,
    postReview,
    putReview,
]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler)
)

router.get('/users', async (req, res) => {
    const arr = await prisma.uSER.findMany()
    res.send(arr)
})

export default router
