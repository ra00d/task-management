import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import { queryClient } from "./lib/config/query-client";
import { Main } from "./main";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "next-themes";

const container = document.querySelector("#root");
const root = createRoot(container!);

root.render(
	<QueryClientProvider client={queryClient}>
		<ThemeProvider
			enableColorScheme
			enableSystem
			themes={["dark", "light"]}
			attribute="class"
		>
			<Main />
			<Toaster />
		</ThemeProvider>
	</QueryClientProvider>,
);
