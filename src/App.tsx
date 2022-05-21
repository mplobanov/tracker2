import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { TaskList } from "./pages/TaskList/TaskList";
import { TaskPage } from "./pages/TaskPage/TaskPage";
import { CreateTask } from "./pages/CreateTask";
import { UserPage } from "./pages/UserPage/UserPage";
import { getAuth } from "firebase/auth";
import "moment/locale/ru";
import moment from "moment";

function App() {
	const auth = useMemo(() => getAuth(), []);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			user?.getIdToken().then((res) =>
				localStorage.setItem("auth_token", res)
			);
			setLoggedIn(!!user);
		});
	}, [auth]);

	useEffect(() => {
		moment.locale("ru");
	}, []);

	if (!loggedIn) {
		return (
			<BrowserRouter>
				<Routes>
					<Route element={<Login />} path={"*"} />
				</Routes>
			</BrowserRouter>
		);
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Login />} path={"/login"} />
				<Route path={"/list"} element={<TaskList />} />
				<Route path={"/me/:meType"} element={<TaskList />} />
				<Route path={"/task/:taskSlug"} element={<TaskPage />} />
				<Route path={"/create"} element={<CreateTask />} />
				<Route path={"/user/:userId"} element={<UserPage />} />
				<Route path={"/"} element={<TaskList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
