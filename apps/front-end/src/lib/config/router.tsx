import Layout from "@/components/layout/main-layout";
import LoginPage from "@/pages/auth/login";
import SignUpPage from "@/pages/auth/sign-up";
import NotFoundPage from "@/pages/errors/not-found";
import Home from "@/pages/home/page";
import { Profile } from "@/pages/profile/profile";
import { ProjectDetails } from "@/pages/projects/project-details";
import { Project } from "@/pages/projects/project/project";
import ProjectsPage from "@/pages/projects/projects";
import { TaskForm } from "@/pages/tasks/task/task";
import TasksPage from "@/pages/tasks/tasks";
import TeamsPage from "@/pages/teams/teams";
import UserForm from "@/pages/users/user/user";
import { UsersPage } from "@/pages/users/users";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter(
	[
		{
			element: <Layout />,
			path: "/",
			handle: {
				role: "user",
				crumb: () => <div>home</div>,
			},
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					loader: async () => {
						Promise.resolve(setTimeout(() => {}, 3000));
						return null;
					},
					path: "home",
					element: <Home />,

					handle: {
						role: "user",
					},

					// lazy: () => import("../../pages/tasks/tasks"),
				},
				{
					path: "projects",
					handle: {
						role: "user",
						crumb: () => <div>projects</div>,
					},

					children: [
						{
							index: true,

							element: <ProjectsPage />,
						},
						{
							path: ":id",
							element: <Project />,
							handle: {
								crumb: () => <div>project</div>,
							},
						},
						{
							path: ":id/details",
							element: <ProjectDetails />,
							handle: {
								crumb: () => <div>project</div>,
							},
						},
					],
				},
				{
					path: "teams",
					element: <TeamsPage />,
				},
				{
					path: "tasks",
					handle: {
						role: "user",
						crumb: () => <div>Tasks</div>,
					},

					children: [
						{
							index: true,
							element: <TasksPage />,
						},
						{
							path: ":id",
							element: <TaskForm />,
							handle: {
								crumb: () => <div>task</div>,
							},
						},
					],
				},
				{
					path: "users",
					handle: {
						crumb: () => <div>users</div>,
					},

					children: [
						{
							index: true,
							element: <UsersPage />,
						},
						{
							path: ":id",
							element: <UserForm />,
							handle: {
								crumb: () => <div>user</div>,
							},
						},
					],
				},
				{
					path: "me",
					element: <Profile />,
				},
			],
		},
		{
			path: "login",
			element: <LoginPage />,
		},
		{
			path: "sign-up",
			element: <SignUpPage />,
		},
		{
			path: "*",
			element: <NotFoundPage />,
		},
	],
	{},
);
export default routes;
