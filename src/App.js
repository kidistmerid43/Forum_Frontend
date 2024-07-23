import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import axios from "./axiosConfig";
import React, { useEffect, useState, createContext, useContext } from "react";
import NewQuestion from "./pages/NewQuestion";
import { UserContext, UserProvider } from "./context/UserContext";
import Answer from './pages/Answer';
import Footer from './pages/Footer';
 import Header from "./pages/Header";


function App() {
	const {userData, setUserData} = useContext(UserContext);
	
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	async function chekuser() {
		try {
			const { data } = await axios.get("/users/check", {
				headers: { authorization: "Bearer " + token },
			});
			setUserData({ ...userData, token: data.token, user: data.username });
		} catch (error) {
			console.log(error.response);
			navigate("/auth");
			
		}
	}

	useEffect(() => {
		chekuser();
	}, []);

	return (
		<>
			<Header /> 
			<Routes>
				<Route path="/" element={<Home />} />
				
				<Route path="/auth" element={<Register />} />
				<Route path="/newquestion" element={<NewQuestion />} />
				<Route path="/answer/:questionId" element={<Answer />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
