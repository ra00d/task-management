import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import NavBar from "./nav-bar";
import { SideBar } from "./side-bar";
import { Suspense } from "react";

export default function Layout() {
	// const navigate = useNavigate();
	// const matches = useMatches() as UIMatch<unknown, { crumb?: ReactNode }>[];
	// const crumbs = matches
	// 	.filter((m) => Boolean(m.handle?.crumb))
	// 	.map((m) => m.handle.crumb);
	return (
		<div className={cn("flex flex-col h-svh  relative overflow-scroll ")}>
			<div className="hidden md:block">
				{" "}
				<NavBar />
			</div>{" "}
			{/* <div className="flex gap-2 divide-x"> */}
			<div className=" md:hidden">
				{" "}
				<SideBar />
			</div>
			{/* 	{crumbs.map((c, i) => ( */}
			{/* 		<div key={i}>{c()}</div> */}
			{/* 	))} */}
			{/* </div> */}
			<main className="grid h-full max-h-full overflow-scroll flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
				<Suspense fallback={"loading"}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
}
