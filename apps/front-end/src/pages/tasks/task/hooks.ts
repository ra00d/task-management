import { getUsers } from "@/lib/api/auth";
import { getProjects } from "@/lib/api/projects";
import { addTask, getTask, updateTask } from "@/lib/api/tasks";
import { TTask, taskSchema } from "@/lib/schemas/task";
import { useAuth } from "@/lib/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useTaskData = () => {
	const { user } = useAuth();
	const client = useQueryClient();
	const { id } = useParams();
	const { data: task } = useQuery({
		queryKey: ["task-" + id],
		queryFn: () => getTask(id!),
		enabled: id !== "new",
	});
	const { data: users } = useQuery({
		queryKey: ["users"],
		queryFn: () => getUsers(),
	});
	const { data: projects } = useQuery({
		queryKey: ["projects"],
		queryFn: () => getProjects(),
	});
	const { mutate, isPending } = useMutation({
		mutationKey: ["add-task"],
		mutationFn: (data: TTask) => {
			if (id === "new") return addTask(data);
			return updateTask(data, id!);
		},
		onSuccess: (data: TTask) => {
			client.invalidateQueries({
				queryKey: ["tasks"],
			});
			if (id === "new") {
				form.reset();
				toast.success("Done", {
					description: "Task added successfuly",
				});
			} else {
				form.reset(data);
				toast.success("Done", {
					description: "Task updated successfuly",
				});
			}
		},
		onError: (err) => {
			toast.error("Error", {
				description: err.message,
			});
		},
	});
	const form = useForm<TTask>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: "",
			description: "",
			dueDate: new Date(),
			status: "pending",
			// projectId: 0,
			userId: user.id,
		},
	});
	const handleSubmit = (data: TTask) => {
		mutate(data);
	};
	useEffect(() => {
		if (task) form.reset({ ...task, project: null, user: null });
	}, [task]);
	return {
		form,
		handleSubmit,
		users,
		projects,
		loading: isPending,
	};
};
