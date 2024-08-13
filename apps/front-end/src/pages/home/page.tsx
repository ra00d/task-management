import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ErrorPage } from "@/components/ui/error-page";
import { getDashboard } from "@/lib/api/home";
import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import TasksPage from "../tasks/tasks";

export default function Home() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => getDashboard(),
	});
	if (isLoading)
		return (
			<div className="h-full w-full flex flex-1 justify-center items-center">
				<LoaderPinwheel className="animate-spin" />
			</div>
		);
	if (isError)
		return <ErrorPage error={error?.message || "Sorry something went wrong"} />;
	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 grid-flow-row">
				<Card>
					<CardHeader>
						<CardTitle>Total Projects</CardTitle>
						<CardDescription>All Projects in the system</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold">{data?.projects || "0"}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Total Tasks</CardTitle>
						<CardDescription>All tasks in the system</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold">{data?.totalTasks || "0"}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Completed Tasks</CardTitle>
						<CardDescription>Tasks that are completed</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold">
							{data?.completedTasks || "0"}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Overdue Tasks</CardTitle>
						<CardDescription>Tasks that are past due</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold">
							{data?.overdueTasks || "0"}
						</div>
					</CardContent>
				</Card>
			</div>
			<Card x-chunk="dashboard-06-chunk-0">
				<CardContent>
					<TasksPage />
				</CardContent>
			</Card>
		</>
	);
}
