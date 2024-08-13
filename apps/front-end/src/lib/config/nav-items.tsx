import { ReactNode } from "react";
import { ArchiveIcon, CardStackIcon, HomeIcon } from "@radix-ui/react-icons";
import { Users } from "lucide-react";

export type TNavItem = {
	href: string;
	title: string;
	icon: ReactNode;
	role?: "USER" | "ADMIN";
};
export const navItems: TNavItem[] = [
	{
		href: "/home",
		title: "home",
		icon: <HomeIcon />,
	},
	{
		href: "/users",
		title: "users",
		icon: <Users />,
		role: "ADMIN",
	},

	{
		href: "/projects",
		title: "projects",
		icon: <ArchiveIcon />,
		// role: "ADMIN",
	},
	{
		href: "/tasks",
		title: "tasks",
		icon: <CardStackIcon />,
	},
];
