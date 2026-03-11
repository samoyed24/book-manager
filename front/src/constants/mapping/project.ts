import { ProjectStatus } from "types/project"

export const ProjectStatusColor: Record<ProjectStatus, string> = {
    End: '#23CF07',
    Process: '#f6a118ff',
    Quality: '#1277FA'
}

export const ProjectStatusValue: Record<ProjectStatus, string> = {
    End: '已完结',
    Process: '处理中',
    Quality: '质检'
}