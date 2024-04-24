import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AppProvider>
		<NextUIProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</NextUIProvider>
	</AppProvider>
);
