import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getUser, signUp } from "@/lib/api/auth";
import { TSignUp, signUpSchema } from "@/lib/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function UserForm() {
	const { id } = useParams();
	const { data } = useQuery({
		queryKey: [`user-${id}`],
		queryFn: () => {
			return getUser(+id!) as Promise<TSignUp>;
		},
		enabled: id !== "new",
	});
	const form = useForm<TSignUp>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
			passwordConfirmation: "",
		},
	});
	const { mutate, isPending } = useMutation({
		mutationKey: ["sign-up"],
		mutationFn: (data: TSignUp) => signUp(data),
		onSuccess: () => {
			toast.success("Done", {
				description: "user added",
			});
			form.reset({});
		},
	});
	const handleSubmit = (data: TSignUp) => {
		mutate(data);
	};
	useEffect(() => {
		if (data) {
			form.reset(data);
		}
	}, [data]);
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="w-full">
					<CardHeader>
						<h1>New User</h1>
					</CardHeader>
					<CardContent>
						<div className="max-w-md w-full space-y-6 px-4 md:px-0">
							<div>
								<div className="space-y-4">
									<div className="grid gap-2">
										<FormField
											name="name"
											control={form.control}
											render={({ field }) => {
												return (
													<FormItem>
														<FormLabel>name</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												);
											}}
										/>
									</div>
									<div className="grid gap-2">
										<FormField
											name="email"
											control={form.control}
											render={({ field }) => {
												return (
													<FormItem>
														<FormLabel>email</FormLabel>
														<FormControl>
															<Input {...field} type="email" />
														</FormControl>
														<FormMessage />
													</FormItem>
												);
											}}
										/>{" "}
									</div>
									<div className="grid gap-2">
										<FormField
											name="password"
											control={form.control}
											render={({ field }) => {
												return (
													<FormItem>
														<FormLabel>password</FormLabel>
														<FormControl>
															<Input {...field} type="password" />
														</FormControl>
														<FormMessage />
													</FormItem>
												);
											}}
										/>
									</div>
									<div className="grid gap-2">
										<FormField
											name="passwordConfirmation"
											control={form.control}
											render={({ field }) => {
												return (
													<FormItem>
														<FormLabel>confirm password</FormLabel>
														<FormControl>
															<Input {...field} type="password" />
														</FormControl>
														<FormMessage />
													</FormItem>
												);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button loading={isPending} type="submit" className="w-full">
							Sign Up
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
