import { defineStore } from "pinia";
import { UserStoreData } from "types/api";

export const useUserAuthStore = defineStore('user', {
    state: () => ({
        username: localStorage.getItem('username') || '',
        roles: JSON.parse(localStorage.getItem('roles') || '[]') as string[],
    }),
    getters: {
        isLoggedIn: (state) => !!state.username,
        permissions: (state) => state.roles
    },
    actions: {
        setUser(data: UserStoreData) {
            this.username = data.username
            this.roles = data.roles
            localStorage.setItem('username', data.username)
            localStorage.setItem('roles', JSON.stringify(data.roles))
        },
        clearUser() {
            this.username = ''
            this.roles = []
            localStorage.removeItem('username')
            localStorage.removeItem('roles')
        },
        getUser(): UserStoreData {
            return {
                username: this.username,
                roles: this.roles,
            }
        }
    }
})