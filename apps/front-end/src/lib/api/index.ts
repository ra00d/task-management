import axios from "axios";
const apiClient = axios.create({
	baseURL: process.env.FARM_BASE_URL || "127.0.0.1:3000/api",
	withXSRFToken: true,
	withCredentials: true,
	xsrfCookieName: "XSRF-TOKEN",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});
export default apiClient;
