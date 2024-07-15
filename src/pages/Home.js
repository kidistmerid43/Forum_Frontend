import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import QuestionDetail from "../pages/QuestionDetail";
import Axios from "../axiosConfig";
import "./home.css";

const Home = () => {
	const {userData} = useContext(UserContext);
    console.log(userData)

    
	const [questions, setQuestions] = useState([]);
	const [search, setSearch] = useState("");
	const [filterData, setFilterData] = useState([]);
	const navigate = useNavigate();
	

	useEffect(() => {
        console.log(userData);
		if (!userData.user) {
			navigate("/auth");
		} else {
			loadQuestions();
		}
	}, [userData.user, navigate]);

	async function loadQuestions() {
		try {
			const response = await Axios.get(
				"/question/getquestions",
				{
					headers:{
						authorization: "Bearer "+ userData.token
					}
				},
				userData.config
			);
			const data = response.data.AllQuestions;
			console.log("Questions loaded:", data);
			setQuestions(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Error loading questions:", error);
			setQuestions([]);
		}
	}

	useEffect(() => {
		console.log("Filtering questions with search term:", search);
		const filtered = questions.filter((q) =>
			q.title.toLowerCase().includes(search.toLowerCase())
		);
		console.log("Filtered data:", filtered);
		setFilterData(filtered);
	}, [search, questions]);

	const handleAskQuestion = () => {
		navigate("/newquestion");
	};

	return (
		<section className="container">
			<div className="header_row">
				<button className="blue_button" onClick={handleAskQuestion}>
					Ask Question
				</button>
				<h1 className="header_border">
					Welcome: {userData.user}
				</h1>
			</div>
			<div className="search">
				<h2>Questions</h2>
				<input
					className="search_bar"
					type="text"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div>
				{Array.isArray(filterData) && filterData.length === 0 ? (
					<div>No Result Found</div>
				) : (
					filterData.map((quest, index) => (
						<QuestionDetail question={quest} key={index} />
					))
				)}
			</div>
		</section>
	);
};

export default Home;
