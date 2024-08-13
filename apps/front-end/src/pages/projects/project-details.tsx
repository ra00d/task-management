import { getProject } from "@/lib/api/projects";
import { useAdvincedQuery } from "@/lib/hooks";
import { useParams } from "react-router-dom";

export const ProjectDetails = () => {
	const { id } = useParams();

	const { data, isLoadingOrError, loadingOrError } = useAdvincedQuery({
		queryKey: [`project-${id}`],
		queryFn: () => {
			return getProject(id!);
		},
	});
	if (isLoadingOrError) return loadingOrError;
	return <div>{JSON.stringify(data)}</div>;
};
