import apiClient from ".";
import { TTask } from "../schemas/task";

const PATH = "tasks";
export const getTasks = async () => {
	const res = await apiClient.get(PATH);
	return res.data as TTask[];
};

export const getTask = async (id: string | number) => {
	const res = await apiClient.get(`${PATH}/${id}`, {});
	return res.data;
};

export const addTask = async (data: TTask) => {
	const res = await apiClient.post(PATH, data);
	return res.data;
};

export const updateTask = async (data: TTask, id: string | number) => {
	const res = await apiClient.put(`${PATH}/${id}`, data);
	return res.data;
};
export const deleteTask = async (id: string | number) => {
	const res = await apiClient.delete(`${PATH}/${id}`, {});
	return res.data;
};
