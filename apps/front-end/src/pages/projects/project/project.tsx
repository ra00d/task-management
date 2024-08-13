import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingPage } from "@/components/ui/loading-page";
import { Textarea } from "@/components/ui/textarea";
import { addProject, getProject } from "@/lib/api/projects";
import { TProject } from "@/lib/schemas/project";
import { getResponseErrors } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const Project = () => {
	const { id } = useParams();

	const form = useForm<TProject>({
		// resolver: zodResolver(projectSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});
	const { data, isLoading } = useQuery({
		queryKey: ["project-" + id],
		queryFn: () => getProject(id!),
		enabled: id !== "new",
	});
	const { isPending, mutate } = useMutation({
		mutationFn: (project: TProject) => addProject(project),
		onSuccess: () => {
			if (id === "new") {
				toast.success("Done", {
					description: "project added",
				});

				form.reset();
			} else {
				toast.success("Done", {
					description: "project updated",
				});
			}
		},
		onError: (error: any) => {
			getResponseErrors(error.response, form.setError);
		},
	});
	useEffect(() => {
		if (data) form.reset(data);
	}, [data]);
	useEffect(() => {
		console.log(form.formState.errors);
	}, [form.formState]);
	const onSubmit = (data: TProject) => {
		mutate(data);
	};
	if (isLoading) return <LoadingPage />;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Project</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2"
					>
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter the project name" />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							name="description"
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea {...field}></Textarea>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<Button loading={isPending} className="w-full" type="submit">
							Create
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
