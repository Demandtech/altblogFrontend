import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext.jsx";
import PostProvider from "./context/PostContext.jsx";
import ErrorBoundary from "./configs/ErrorBoundary.jsx";

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
	</ErrorBoundary>
);
