import { ProjectFetchResult, ProjectRequestParams } from "types/project";
import request from "./wrapper";

export function getProjectData(params: ProjectRequestParams) {
    return request.get<ProjectFetchResult>('/api/project', params)
}
