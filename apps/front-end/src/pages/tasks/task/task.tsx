import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/stores/auth";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
						return (
							<FormItem className="flex flex-col gap-2">
								<FormLabel>Due date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													" pl-3 text-left font-normal w-full",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>{" "}
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
