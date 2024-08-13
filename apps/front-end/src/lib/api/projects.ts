import apiClient from ".";
import { TProject } from "../schemas/project";

const PATH = "projects";
export const getProjects = async () => {
	const res = await apiClient.get<TProject[]>(PATH);
	return res.data;
};

export const getProject = async (id: string | number) => {
	const res = await apiClient.get<TProject>(`${PATH}/${id}`, {});
	return res.data;
};

export const addProject = async (data: TProject) => {
	const res = await apiClient.post(PATH, data);
	return res.data;
};

export const updateProject = async (data: TProject, id: string | number) => {
	const res = await apiClient.put(`${PATH}/${id}`, data);
	return res.data;
};

export const deleteProject = async (id: string | number) => {
	const res = await apiClient.delete(`${PATH}/${id}`, {});
	return res.data;
};
