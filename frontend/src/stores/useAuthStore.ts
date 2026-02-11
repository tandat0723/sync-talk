import { create } from 'zustand'
import { toast } from 'sonner'
import { authService } from '@/services/authService'
import type { AuthState } from '@/types/store'

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
        set({ accessToken: null, user: null, loading: false })
    },

    signUp: async (username, firstName, lastName, email, password) => {
        try {
            set({ loading: true })

            //call api
            await authService.signUp(username, firstName, lastName, email, password)

            toast.success('Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập.')
        } catch (error) {
            console.error(error)
            toast.error('Đăng ký không thành công!')
        } finally {
            set({ loading: false })
        }
    },

    signIn: async (username, password) => {
        try {
            set({ loading: true })
            const { accessToken } = await authService.signIn(username, password)
            set({ accessToken })

            await get().fetchMe()
            toast.success('Đăng nhập thành công!')
        } catch (error) {
            console.error(error)
            toast.error('Đăng nhập không thành công!')
        } finally {
            set({ loading: false })
        }
    },

    signOut: async () => {
        try {
            get().clearState()
            await authService.signOut()
            toast.success('Đăng xuất thành công!')
        } catch (error) {
            console.error(error)
            toast.error('Lỗi đăng xuất')
        }
    },

    fetchMe: async () => {
        try {
            set({ loading: true })
            const user = await authService.fecthMe()
            set({ user })
        } catch (error) {
            console.error(error)
            set({ user: null, accessToken: null })
            toast.error('Lỗi xảy ra khi lấy dữ liệu người dùng')
        } finally {
            set({ loading: false })
        }
    },

}))