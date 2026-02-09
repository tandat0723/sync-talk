import type { User } from "./user"

export interface AuthState {
    accessToken: string | null
    user: User | null
    loading: boolean

    signUp: (
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => Promise<void>

    signIn: (
        username: string,
        password: string
    ) => Promise<void>

    clearState: () => void

    signOut: () => Promise<void>
}