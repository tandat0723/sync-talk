import mongoose from 'mongoose'
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Liên kết db thành công!')
    } catch (error) {
        console.log('Lỗi liên kết: ', error)
        process.exit(1)
    }
}