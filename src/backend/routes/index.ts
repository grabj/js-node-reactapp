import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import deleteUser from './user/delete.user'
import loginUser from './user/login.user'
import getReviews from './review/get.reviews'
import postReview from './review/post.review'
import putReview from './review/put.review'
const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Beauty Review - Home page')
})
const apiRoutes = [
    getStatus,
    postUser,
    loginUser,
    getReviews,
    postReview,
    putReview,
    deleteUser,
]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler)
)

export default router
