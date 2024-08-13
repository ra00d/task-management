import { useQuery } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { LoadingPage } from "./components/ui/loading-page";
import apiClient from "./lib/api";
import routes from "./lib/config/router";
export function Main() {
	const { isLoading } = useQuery({
		queryKey: ["csrf"],
		queryFn: async () => {
			const res = await apiClient.get("csrf-token");
			document.cookie = `XSRF-TOKEN=${res.data?.token}; SameSite='strict'`;
			return res.data;
		},
	});
	if (isLoading) return <LoadingPage />;
	return <RouterProvider router={routes} />;
}
