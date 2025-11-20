import api from "./api";
import type {
    TeamListResponse,
    TeamDetailResponse,
    TeamCreate,
    TeamCreateUpdateResponse,
    TeamUpdate,
} from "./types";

const base = "/api/teams";

export async function listTeams(): Promise<TeamListResponse> {
    const r = await api.get<TeamListResponse>(`${base}/`);
    return r.data;
}

export async function createTeam(payload: TeamCreate): Promise<TeamCreateUpdateResponse> {
    const r = await api.post<TeamCreateUpdateResponse>(`${base}/`, payload);
    return r.data;
}

export async function retrieveTeam(id: number): Promise<TeamDetailResponse> {
    const r = await api.get<TeamDetailResponse>(`${base}/${id}`);
    return r.data;
}

export async function updateTeam(id: number, payload: TeamUpdate): Promise<TeamCreateUpdateResponse> {
    const r = await api.patch<TeamCreateUpdateResponse>(`${base}/${id}`, payload);
    return r.data;
}

export async function deleteTeam(id: number): Promise<boolean> {
    const r = await api.delete(`${base}/${id}`);
    return r.status === 204 || r.status === 200;
}