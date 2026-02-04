import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protectedRoute = (req, res, next) => {
    try {
        // lay token tu header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1] // cu phap lay token sau Bearer 

        if (!token) {
            return res.status(401).json({ message: 'Không tìm thấy access token!' })
        }
        // xac nhan token hop le
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
            if (err) {
                console.error(err)
                return res.status(403).json({ message: 'Access token hết hạn hoặc không chính xác!' })
            }
            // tim user
            const user = await User.findById(decodedUser.userId).select('-hashedPassword')

            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tốn tại!' })
            }
            // tra ve user trong req
            req.user = user
            next()
        })
    } catch (error) {
        console.error('Lỗi xác minh jwt trong middleware', error)
        return res.status(500).json({ message: 'Lỗi hệ thống!' })
    }
}