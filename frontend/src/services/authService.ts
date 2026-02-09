import api from '@/lib/axios'

export const authService = {
    signUp: async (username: string, firstName: string, lastName: string, email: string, password: string) => {
        const res = await api.post(
            "/auth/signup",
            { username, firstName, lastName, email, password },
            { withCredentials: true }
        )

        return res.data
    },

    signIn: async (username: string, password: string) => {
        const res = await api.post('/auth/signin', { username, password }, { withCredentials: true })
        return res.data
    }
}