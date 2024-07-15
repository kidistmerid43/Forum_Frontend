import axios from "axios";

const axiosBase = axios.create({
	baseURL: "https://evanagadi-forum-2024-4.onrender.com/api",  
	// baseURL: "http://localhost:5500/api",  
});


export default axiosBase;
