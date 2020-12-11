import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-my-burger-d207b.firebaseio.com/",
});

export default instance;
