import axios from "axios";
const apiClient = axios.create({
	baseURL:
		process.env.FARM_BASE_URL ||
		"https://task-management-wf4j.onrender.com/api",
	withXSRFToken: true,
	withCredentials: true,
	xsrfCookieName: "XSRF-TOKEN",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});
export default apiClient;
