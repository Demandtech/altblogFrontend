import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext.jsx";
import PostProvider from "./context/PostContext.jsx";
import ErrorBoundary from "./configs/ErrorBoundary.jsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ErrorBoundary>
		<UserProvider>
			<PostProvider>
				<NextUIProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</NextUIProvider>
			</PostProvider>
		</UserProvider>
		<Analytics />
		<SpeedInsights />
	</ErrorBoundary>
);
