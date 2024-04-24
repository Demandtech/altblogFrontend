import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import "react-quill/dist/quill.snow.css";
import Profile from "./pages/Profile";
import { toastConfig } from "react-simple-toasts";

toastConfig({ theme: "dark" });

function App() {
	return (
		<Routes>
			<Route element={<Home />} path="/" />
			<Route element={<SinglePost />} path="/:id" />
			<Route element={<Profile />} path="/profile/:id" />
		</Routes>
	);
}

export default App;
