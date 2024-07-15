import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import classes from "./Register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

function Register() {
    const navigate = useNavigate();
    const usernameDom = useRef();
    const firstnameDOM = useRef();
    const lastnameDOM = useRef();
    const emailDOM = useRef();
    const passwordDOM = useRef();
    const emailsignDOM = useRef();
    const passwordsignDOM = useRef();

    const [isFirstDivVisible, setIsFirstDivVisible] = useState(true);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setmessage] = useState(true);
    const [alertt, setalertt] = useState("");
    const [alertone, setalertone] = useState("");

    const { userData, setUserData } = useContext(UserContext);

    const handleFirstLinkClick = (event) => {
        event.preventDefault(); // Prevents the default anchor link behavior
        setIsFirstDivVisible(false);
    };

    const handleSecondLinkClick = (event) => {
        event.preventDefault(); // Prevents the default anchor link behavior
        setIsFirstDivVisible(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const emailvalue = emailDOM.current.value;
        const passwordvalue = passwordDOM.current.value;
        if (!emailvalue || !passwordvalue) {
            setalertone("Please Enter Email and Password");
            return;
        }
        try {
            const { data } = await axios.post("/users/login", {
                email: emailvalue,
                password: passwordvalue,
            });
            setUserData({
							...userData,
							token: data.token,
							user: data.username,
						});
            alert("Login successful");
            navigate("/");
            localStorage.setItem("token", data.token);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
                alert(`Error: ${error.response.data.message || "An error occurred during login"}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Error request data:", error.request);
                alert("No response received from server. Please try again later.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
                alert("An error occurred. Please try again later.");
            }
        }
    }

    async function handleSubmitSignup(e) {
        e.preventDefault();
        const usernameValue = usernameDom.current.value;
        const firstValue = firstnameDOM.current.value;
        const lastValue = lastnameDOM.current.value;
        const emailValue = emailDOM.current.value;
        const passwordValue = passwordDOM.current.value;
        if (!usernameValue || !firstValue || !lastValue || !emailValue || !passwordValue) {
            setmessage(false);
            alert("ALL fields are required");
            return;
        }
        try {
            await axios.post("/users/register", {
                username: usernameValue,
                firstname: firstValue,
                lastname: lastValue,
                email: emailValue,
                password: passwordValue,
            });
            alert("Register successfully. Please login");
            // navigate("/auth");
            setIsFirstDivVisible(true)
        } catch (error) {
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
                alert(`Error: ${error.response.data.message || "An error occurred during registration"}`);
            } else if (error.request) {
                console.error("Error request data:", error.request);
                alert("No response received from server. Please try again later.");
            } else {
                console.error("Error message:", error.message);
                alert("An error occurred. Please try again later.");
            }
        } finally {
            if (!message) {
                setIsFirstDivVisible(true);
            }
        }
    }

    return (
        <div className={classes.main_container}>
            <div className={classes.Middle_part}>
                {isFirstDivVisible ? (
                    <div className={`${classes.loginForm} `}>
                        <h3>Login to your account</h3>
                        <span>
                            <p>
                                Don’t have an account?{" "}
                                <Link onClick={handleFirstLinkClick} to="">
                                    Create a new account
                                </Link>
                            </p>
                        </span>
                        <div className={classes.LoginformOnly}>
                            <div
                                style={{
                                    color: "red",
                                    textAlign: "center",
                                }}
                            >
                                {alertone}
                            </div>
                            <form action="" onSubmit={handleSubmit}>
                                <div className={classes.password}>
                                    <input
                                        ref={emailDOM}
                                        type="email"
                                        placeholder="Email address"
                                    />
                                </div>

                                <div className={classes.password}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        ref={passwordDOM}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <span
                                        className="password-toggle-icon"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                                <div>
                                    <Link>Forgot password?</Link>
                                </div>
                                <div>
                                    <button type="submit" className={classes.loginbutton}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className={`${classes.SignForm} `}>
                        <h3>Join the network</h3>
                        <span>
                            <p>
                                Already have an account?
                                <Link onClick={handleSecondLinkClick} to="">
                                    Sign in
                                </Link>
                            </p>
                        </span>
                        <div>
                            <div
                                style={{
                                    color: "red",
                                    textAlign: "center",
                                    paddingBottom: "5px",
                                }}
                            >
                                {alertt}
                            </div>
                            <form action="" onSubmit={handleSubmitSignup}>
                                <div className={classes.same}>
                                    <input ref={usernameDom} type="text" placeholder="Username" />
                                </div>
                                <div className={classes.field} style={{ border: "none" }}>
                                    <input
                                        ref={firstnameDOM}
                                        type="text"
                                        placeholder="First name"
                                    />
                                    <input
                                        ref={lastnameDOM}
                                        type="text"
                                        placeholder="Last name"
                                    />
                                </div>
                                <div className={classes.same}>
                                    <input
                                        ref={emailDOM}
                                        type="email"
                                        placeholder="Email address"
                                    />
                                </div>

                                <div className={classes.same}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        ref={passwordDOM}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <span
                                        className="password-toggle-icon"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>

                                <h4 className={classes.agree}>
                                    I agree to the <Link>privacy policy</Link> and
                                    <Link>terms of service.</Link>.
                                </h4>
                                <button type="submit" className={classes.Join}>
                                    Agree and Join
                                </button>
                                <h4>
                                    <Link
                                        onClick={handleSecondLinkClick}
                                        className={classes.account}
                                    >
                                        Already have an account?
                                    </Link>
                                </h4>
                            </form>
                        </div>
                    </div>
                )}
                <div className={classes.about}>
                    <h3>About</h3>
                    <h1>Evangadi Networks</h1>
                    <p>
                        No matter what stage of life you are in, whether you’re just
                        starting elementary school or being promoted to CEO of a Fortune 500
                        company, you have much to offer to those who are trying to follow in
                        your footsteps.
                    </p>
                    <p>
                        Wheather you are willing to share your knowledge or you are just
                        looking to meet mentors of your own, please start by joining the
                        network here.
                    </p>

                    <button className={classes.howbtn}>HOW IT WORKS</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
