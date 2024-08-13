import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import DeleteButton from "@/components/ui/delete-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ErrorPage } from "@/components/ui/error-page";
import { LoadingPage } from "@/components/ui/loading-page";
import apiClient from "@/lib/api";
import { deleteTask, getTasks } from "@/lib/api/tasks";
import { TTask } from "@/lib/schemas/task";
import { useAuth } from "@/lib/stores/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreVerticalIcon } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function TasksPage() {
	const { user } = useAuth();
	const client = useQueryClient();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["tasks"],
		queryFn: () => getTasks(),
	});
	const columns = useMemo<ColumnDef<TTask>[]>(
		() => [
			{
				id: "title",
				header: "Task",
				accessorKey: "title",
			},
			{
				header: "Status",

				accessorKey: "status",
				cell: ({ row }) => {
					return (
						<Badge
							variant={
								row.original.status === "pending"
									? "outline"
									: row.original.status === "completed"
										? "sucess"
										: "secondary"
							}
							className="capitalize"
						>
							{row.original.status}
						</Badge>
					);
				},
			},
			{
				header: "Due date",
				accessorKey: "dueDate",
				cell(props) {
					return format(props.row.original.dueDate, "MM-dd-yyyy");
				},
			},
			{
				header: "assigned to",
				accessorKey: "user",
				cell: (props) => {
					return (
						<Link to={`users/${props.row.original?.user?.id}`}>
							{props.row.original?.user?.name}
						</Link>
					);
				},
			},
			{
				header: "Project",
				accessorKey: "project",
				cell: (props) => {
					return (
						<Link to={`projects/${props.row.original?.project?.id}`}>
							{props.row.original?.project?.name}
						</Link>
					);
				},
			},

			{
				header: "Actions",
				cell: (props) => {
					const { mutate } = useMutation({
						mutationKey: ["tasks"],
						mutationFn: () => {
							return apiClient.patch(`tasks/${props.row.original.id}/complete`);
						},
					});
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button aria-haspopup="true" size="icon" variant="ghost">
									<MoreVerticalIcon className="h-4 w-4" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem asChild>
									<Link to={`/tasks/${props.row.original?.id}`}>Edit</Link>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => mutate()}>
									Mark as Complete
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<DeleteButton
										dropdown
										action={async () => {
											await deleteTask(props.row.original.id!);
											client.invalidateQueries({ queryKey: ["tasks"] });
										}}
									/>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			},
		],
		[],
	);
	if (isLoading) return <LoadingPage />;

	if (isError)
		return (
			<ErrorPage
				error={error.response?.data?.message || "Sorry something went wrong"}
			/>
		);
	return (
		<DataTable
			data={data!}
			newPage={"/tasks/new"}
			columns={columns}
			title="Tasks"
		/>
	);
}
