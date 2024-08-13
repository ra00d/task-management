import { Menu } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { navItems } from "@/lib/config/nav-items";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/stores/auth";

export const SideBar = () => {
	const { user } = useAuth();
	return (
		<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			<header className="sticky top-0 z-30 flex h-14 items-center px-4">
				<Sheet>
					<SheetTrigger asChild>
						<Button
							size="icon"
							title="open menu"
							variant="outline"
							className="sm:hidden"
						>
							<Menu className="z-5" />
							<span className="sr-only">open menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent title="side menu" side="left" className="sm:max-w-xs">
						<NavigationMenu.Root>
							<NavigationMenu.List className="grid gap-6 text-lg font-medium">
								{navItems.map((item) => {
									if (item?.role && item?.role !== user.role) return <></>;
									return (
										<NavigationMenu.Item key={item.title}>
											<NavigationMenu.Link
												// asChild
												asChild
												className="flex items-center gap-2	"
											>
												<div>
													<NavLink
														to={item.href}
														className={({ isActive }) => {
															return cn(
																isActive
																	? buttonVariants({
																			className:
																				"text-foreground font-bold text-xl",
																		})
																	: "",
																"capitalize flex  w-full justify-end items-center gap-2",
															);
														}}
													>
														{item.icon}
														<div>{item.title}</div>
													</NavLink>
												</div>
											</NavigationMenu.Link>
										</NavigationMenu.Item>
									);
								})}
							</NavigationMenu.List>
						</NavigationMenu.Root>
					</SheetContent>
				</Sheet>
			</header>
		</div>
	);
};
