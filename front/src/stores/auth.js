import { defineStore } from "pinia";
export const useUserAuthStore = defineStore('user', {
    state: () => ({
        username: localStorage.getItem('username') || '',
        roles: JSON.parse(localStorage.getItem('roles') || '[]'),
    }),
    getters: {
        isLoggedIn: (state) => !!state.username,
        permissions: (state) => state.roles
    },
    actions: {
        setUser(data) {
            this.username = data.username;
            this.roles = data.roles;
            localStorage.setItem('username', data.username);
            localStorage.setItem('roles', JSON.stringify(data.roles));
        },
        clearUser() {
            this.username = '';
            this.roles = [];
            localStorage.removeItem('username');
            localStorage.removeItem('roles');
        },
        getUser() {
            return {
                username: this.username,
                roles: this.roles,
            };
        }
    }
});
