export interface PersonShort {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface ProjectShort {
    id: number;
    name: string;
}

export interface EmployeeTeamMember {
    id: number;
    employee: PersonShort;
}

export interface TeamResponse {
    id: number;
    name: string;
    project: ProjectShort | null;
    teamlead: PersonShort | null;
}

export interface TeamDetailResponse {
    id: number;
    name: string;
    project: ProjectShort | null;
    teamlead: PersonShort | null;
    members: EmployeeTeamMember[];
}

export interface TeamListResponse {
    teams: TeamResponse[];
    total: number;
}

export interface TeamCreate {
    name: string;
    project_id?: number | null;
    teamlead_id?: number | null;
}

export interface TeamCreateUpdateResponse {
    id: number;
    name: string;
    project_id?: number | null;
    teamlead_id?: number | null;
}

export interface TeamUpdate {
    name?: string | null;
    project_id?: number | null;
    teamlead_id?: number | null;
}