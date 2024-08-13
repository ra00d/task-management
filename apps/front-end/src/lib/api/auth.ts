import apiClient from ".";
import { TLogin, TSignUp } from "../schemas/login-schema";
import { TUser } from "../stores/auth";

export const login = async (body: TLogin) => {
	const res = await apiClient.post("auth/login", body);
	return res.data;
};
export const signUp = async (body: TSignUp) => {
	const res = await apiClient.post("auth/sign-up", body);
	return res.data;
};
export const logout = async () => {
	const res = await apiClient.get("auth/logout");
	return res.data;
};

export const getUsers = async () => {
	const res = await apiClient.get<TUser[]>("users");
	return res.data;
};

export const getUser = async (id: number) => {
	const res = await apiClient.get<TUser>(`users/${id}`);
	return res.data;
};
export const getProfile = async () => {
	const res = await apiClient.get<TUser>("me");
	return res.data;
};
export const deleteUser = async (id: number) => {
	const res = await apiClient.delete(`users/${id}`);
	return res.data;
};
