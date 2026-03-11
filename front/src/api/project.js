import request from "./wrapper";
export function getProjectData(params) {
    return request.get('/api/project', params);
}
