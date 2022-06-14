import React, { useState } from 'react'
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css'
function Register(props) {
	const history = useHistory();
	const location=useLocation();
	let role = "unknown";
	const id = props.match.params.id;
	if (id === '1') {
		role = "Lecture";
		if(location.state===undefined){
			history.goBack();
		}else{
		
			console.log("Lecture")
		}

	} else {
		role = "Student";
	}



	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="container h-100">
			<ToastContainer />
			<div className="d-flex justify-content-center h-100">
				<div className="user_card">
					<div className="d-flex justify-content-center">
						<div className="brand_logo_container">

						</div>
					</div>
					<div className="d-flex justify-content-center form_container">
						<form>
							<div className="input-group mb-3">
								<div className="input-group-append">
									<span className="input-group-text"><i className="fas fa-user"></i></span>
								</div>
								<input type="text" name="" className="form-control input_user" placeholder="username" onChange={(event) => {
									setName(event.target.value);
								}} />
							</div>
							<div className="input-group mb-3">
								<div className="input-group-append">
									<span className="input-group-text"><i className="fas fa-at"></i></span>
								</div>
								<input type="email" name="" className="form-control input_user" placeholder="email" onChange={(event) => {
									setEmail(event.target.value);
								}} />
							</div>
							<div className="input-group mb-3">
								<div className="input-group-append">
									<span className="input-group-text"><i className="far fa-meh-rolling-eyes" ></i></span>
								</div>
								<input type="text" name="" className="form-control input_user" disabled={true} value={role} />
							</div>
							<div className="input-group mb-2">
								<div className="input-group-append">
									<span className="input-group-text"><i className="fas fa-key"></i></span>
								</div>
								<input type="password" name="" className="form-control input_pass" placeholder="password" onChange={(event) => {
									setPassword(event.target.value);
								}} />
							</div>
							<div className="d-flex justify-content-center mt-3 login_container">
								<button type="button" name="button" className="btn login_btn" onClick={() => {
									toast.success("Creating");
									let data = {
										name: name,
										email: email,
										password: password,
										role: role
									}

									console.log(data)
									axios.put("https://bpz8liejaf.execute-api.us-east-1.amazonaws.com/users", data).then(res => {
										console.log(res.data);
										
										history.push("/sign-in/"+id);
									}).catch(error => {
										console.log(error);
										toast.error("Something went wrong i can feel it");
									
									})
								}}>Create {role} account</button>
							</div>
						</form>
					</div>

					<div className="mt-4">


					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
