import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Axios from "../axiosConfig";
import "./question.css";

const NewQuestion = () => {
	const {userData} = useContext(UserContext);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		title: "",
		question: "",
	});

	const token = localStorage.getItem("token");
	

	useEffect(() => {
		if (!userData.user) {
			navigate("/auth");
		}
	}, [userData.user, navigate]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await Axios.post(
				"/question/askquestion",
				{
					title: form.title,
					description: form.question,
				},
				{
					headers: {
						authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
				}
			);
			console.log(data);

			setForm({
				title: "",
				question: "",
			});

			navigate("/");
		} catch (err) {
			console.log("Error submitting question:", err);
			alert("Failed to submit question. Please try again.");
		}
	};

	return (
		<section className="container" style={{ paddingTop: "100px" }}>
			<div className="d-flex flex-column align-items-center my-5">
				<h3>Steps to write a good question</h3>
				<ul style={{ fontSize: "large", alignItems: "baseline" }}>
					<li>Summarize your question in a one-line title.</li>
					<li>Describe your problem in more detail.</li>
					<li>Describe what you tried and what you expected to happen.</li>
					<li>Review your question and post it to the site.</li>
				</ul>
			</div>
			<div className="container" style={{ width: "90%" }}>
				<div
					className="container"
					style={{
						paddingTop: "50px",
						textAlign: "center",
						fontWeight: "bold",
					}}
				>
					<h3>Ask a public question</h3>
					<Link to="/">Go to Question Page</Link>
				</div>
				<form method="post" onSubmit={handleSubmit}>
					<div style={{ width: "100%" }}>
						<input
							style={{
								marginTop: "15px",
								height: "60px",
								width: "100%",
								borderRadius: "10px",
								padding: "10px 15px",
							}}
							maxLength="200"
							type="text"
							name="title"
							placeholder="Title"
							value={form.title}
							onChange={handleChange}
							required
						/>
						<div>
							<textarea
								style={{
									marginTop: "15px",
									height: "200px",
									width: "100%",
									borderRadius: "10px",
									padding: "10px 15px",
								}}
								maxLength="255"
								type="text"
								name="question"
								placeholder="Question Description..."
								value={form.question}
								onChange={handleChange}
								required
							/>
						</div>
						<div
							style={{
								marginTop: "10px",
								marginBottom: "10px",
							}}
						>
							<button
								style={{
									padding: "10px 25px",
									borderRadius: "5px",
								}}
								className="btn btn-lg btn-primary"
								type="submit"
							>
								Post Your Question
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
};

export default NewQuestion;
