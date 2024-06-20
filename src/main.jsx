import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import {
	CommentProvider,
	PostProvider,
	UserProvider,
	ReplyProvider,
} from "./context";
import ErrorBoundary from "./configs/ErrorBoundary.jsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ErrorBoundary>
		<UserProvider>
			<PostProvider>
				<CommentProvider>
					<ReplyProvider>
						<NextUIProvider>
							<BrowserRouter>
								<App />
							</BrowserRouter>
						</NextUIProvider>
					</ReplyProvider>
				</CommentProvider>
			</PostProvider>
		</UserProvider>
		<Analytics />
		<SpeedInsights />
	</ErrorBoundary>
);
