import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_TTL = '30m'
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 1000 // 14 day

export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body

        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: 'Không để trống username, password, email, firstName và lastName' })
        }

        // check user tồn tại
        const duplicate = await User.findOne({ username })
        if (duplicate) {
            return res.status(400).json({ message: 'username đã tồn tại' })
        }

        // mã hóa pw
        const hashedPassword = await bcrypt.hash(password, 10)

        // tao user  
        await User.create({
            username, hashedPassword, email, displayName: `${firstName} ${lastName}`
        })

        return res.sendStatus(204)
    } catch (error) {
        console.log('Lỗi khi gọi signUp', error)
        return res.status(500).json({ message: 'Lỗi hệ thống' })
    }
}

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: 'Thiếu username hoặc password' })
        }

        // lấy hashpassword trong db so với pw input
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: 'username hoặc pw không chính xác' })
        }

        const passwordCorrect = await bcrypt.compare(password, user.hashedPassword)

        if (!passwordCorrect) {
            return res.status(401).json({ message: 'username hoặc password không chính xác' })
        }

        // nếu khớp, tạo accesstoken với jwt
        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL })

        // tạo refresh token
        const refresToken = crypto.randomBytes(64).toString('hex')

        // tạo session mới để lưu rf token

        // trả rf token về trong cookie

        // trả access token về trong res 

    } catch (error) {
        console.log('Lỗi khi gọi signIn', error)
        return res.status(500).json({ message: 'Lỗi hệ thống' })
    }
}