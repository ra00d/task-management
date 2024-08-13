import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/stores/auth";
import { useState } from "react";
import { useTaskData } from "./hooks";

export const TaskForm = () => {
	const { user } = useAuth();
	const { form, projects, users, handleSubmit, loading } = useTaskData();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="grid gap-2 md:grid-cols-2"
			>
				<FormField
					name="title"
					control={form.control}
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					name="dueDate"
					control={form.control}
					render={({ field }) => {
						const [date, setDate] = useState("");
						return (
							<FormItem>
								<FormLabel>Due date</FormLabel>
								<FormControl>
									<Input
										type="date"
										{...field}
										value={date}
										onChange={(e) => {
											field.onChange(new Date(e.target.value));
											setDate(e.target.value);
										}}
									/>
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
								<FormLabel>description</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				{user.role === "ADMIN" && (
					<FormField
						name="userId"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={form.watch("userId")?.toString()}
										>
											<FormLabel>user</FormLabel>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder={"Assign to"} />
												</SelectTrigger>
											</FormControl>
											<FormMessage />
											<SelectContent>
												{!!users &&
													users?.map((item) => (
														<SelectItem
															value={item.id!.toString()}
															key={item.id! + item.name!}
														>
															{item.name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				)}
				<FormField
					name="projectId"
					control={form.control}
					render={({ field }) => {
						return (
							<FormItem>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={form.watch("projectId")?.toString()}
									>
										<FormLabel>project</FormLabel>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder={"Assign to"} />
											</SelectTrigger>
										</FormControl>
										<FormMessage />
										<SelectContent>
											{!!projects &&
												projects?.map((item) => (
													<SelectItem
														value={item.id!.toString()}
														key={item.id!}
													>
														{item.name}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<div></div>
				<Button loading={loading}>Submit</Button>
			</form>
		</Form>
	);
};
