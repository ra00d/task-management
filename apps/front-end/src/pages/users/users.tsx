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
import { deleteUser, getUsers } from "@/lib/api/auth";
import { TUser } from "@/lib/stores/auth";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { Check, MoreVerticalIcon } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export const UsersPage = () => {
	const columns = useMemo<ColumnDef<TUser>[]>(
		() => [
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "email",
				header: "Email",
			},
			{
				accessorKey: "active",
				cell: (props) => (
					<Badge>
						{props.row.original.active ? <Check /> : <Cross2Icon />}
					</Badge>
				),
			},
			{
				header: "Actions",
				cell: (props) => {
					const client = useQueryClient();
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
									<Link to={`/users/${props.row.original?.id}`}>Edit</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<DeleteButton
										dropdown
										action={async () => {
											await deleteUser(props.row.original.id!);
											client.invalidateQueries({ queryKey: ["users"] });
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

	const { data, isLoading, isError, error } = useQuery<
		TUser[],
		AxiosError<any>
	>({
		queryFn: () => getUsers(),
		queryKey: ["users"],
	});

	if (isLoading) return <LoadingPage />;

	if (isError) {
		return (
			<ErrorPage
				error={error?.response?.data?.message || "Sorry something went wrong"}
			/>
		);
	}
	return (
		<DataTable
			data={data || []}
			columns={columns}
			title="Users"
			newPage="/users/new"
		/>
	);
};
