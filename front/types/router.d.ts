import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    show: boolean
    title?: string
    icon?: string
    requiresAuth?: boolean
    requiredPermissions?: string[]
  }
}