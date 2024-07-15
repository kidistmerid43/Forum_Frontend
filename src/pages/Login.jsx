import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const emailDOM = useRef();
	const passwordDOM = useRef();
	async function handleSubmit(e) {
		e.preventDefault();
		const emailValue = emailDOM.current.value;
		const passwordValue = passwordDOM.current.value;
		if (!emailValue || !passwordValue) {
			alert("ALL fields are required");
			return;
		}
		try {
			const {data}= await axios.post("/users/login", {
				email: emailValue,
				password: passwordValue,
			});
			alert("login successfully.");
			localStorage.setItem('token',data.token);
			navigate("/home");
			console.log(data)
		} catch (error) {
			alert(error?.response?.data?.msg);
			console.log(error.response.data);
		}
	}
	return (
		<section>
			<form onSubmit={handleSubmit}>
				<div>
					<span>email :---</span>
					<input type="email" placeholder="email" ref={emailDOM} />
				</div>
				<br />
				<div>
					<span>password :---</span>
					<input type="password" placeholder="password" ref={passwordDOM} />
				</div>
				<button type="submit">Login</button>
				<br/>
				<Link to={"/register"}>register</Link>
			</form>
		</section>
	);
}

export default Login;
