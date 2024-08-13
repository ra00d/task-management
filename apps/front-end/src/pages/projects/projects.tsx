import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DeleteButton from "@/components/ui/delete-button";
import { ErrorPage } from "@/components/ui/error-page";
import { LoadingPage } from "@/components/ui/loading-page";
import { deleteProject, getProjects } from "@/lib/api/projects";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, EyeIcon, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export const PageHeader = () => {
	return (
		<header className="flex justify-between items-center">
			<div>
				<h1 className="text-3xl">Projects</h1>
			</div>
			<Button className="flex items-center gap-2" asChild>
				<Link to={"new"}>
					<span>New</span>
					<Plus />
				</Link>
			</Button>
		</header>
	);
};
export default function ProjectsPage() {
	const client = useQueryClient();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["projects"],
		queryFn: () => getProjects(),
	});
	if (isLoading) return <LoadingPage />;
	if (isError)
		return <ErrorPage error={error?.message || "Sorry something went wrong"} />;
	return (
		<Card className="h-full w-full flex-1">
			<CardHeader>
				<PageHeader />
			</CardHeader>
			<CardContent className="h-full flex-1">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 grid-flow-row gap-5">
					{data?.map((pr: any) => (
						<Card className="grid " key={pr?.id}>
							<CardHeader className="relative">
								<CardTitle className="relative inset-x-0 text-ellipsis line-clamp-1">
									{pr.name}
								</CardTitle>
								<CardDescription>
									<span className="text-sm font-bold text-muted-foreground flex items-end gap-2">
										<span>{pr?.tasks?.length || 0} tasks</span>
									</span>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="line-clamp-2 flex-1">{pr.description}</p>
							</CardContent>
							<CardFooter>
								<div className="flex justify-between items-center w-full ">
									<Button variant={"secondary"} asChild>
										<Link to={`${pr?.id}`}>
											<Edit />
										</Link>
									</Button>
									<Button variant={"linkHover2"} asChild>
										<Link to={`${pr?.id}/details`}>
											<EyeIcon />
										</Link>
									</Button>
									<DeleteButton
										action={async () => {
											await deleteProject(pr?.id);
											client.invalidateQueries({ queryKey: ["projects"] });
										}}
									>
										<Trash color="red" />
									</DeleteButton>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			</CardContent>{" "}
		</Card>
	);
}
