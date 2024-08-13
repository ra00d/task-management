import { ErrorPage } from "@/components/ui/error-page";
import { LoadingPage } from "@/components/ui/loading-page";
import { getProfile } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";

export const Profile = () => {
	const { isLoading, data, isError, error } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getProfile(),
	});
	if (isLoading) return <LoadingPage />;
	if (isError) return <ErrorPage error={error?.message} />;
	return <div>{JSON.stringify(data)}</div>;
};
