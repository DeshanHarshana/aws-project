
import { useHistory, useLocation } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './login.css'
const Login = (props) => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const id = props.match.params.id;
	console.log(id)
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
								<input type="text" name="" className="form-control input_user" placeholder="Email" onChange={(event) => {
									setEmail(event.target.value);
								}} />
							</div>
							<div className="input-group mb-2">
								<div className="input-group-append">
									<span className="input-group-text"><i className="fas fa-key"></i></span>
								</div>
								<input type="password" name="" className="form-control input_pass" placeholder="password" onChange={(event) => {
									setPassword(event.target.value);
								}} />
							</div>
							<div className="form-group">
								<div className="custom-control custom-checkbox">
									<input type="checkbox" className="custom-control-input" id="customControlInline" />
									<label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
								</div>
							</div>
							<div className="d-flex justify-content-center mt-3 login_container">
								<button type="button" name="button" className="btn login_btn" onClick={() => {
									toast.success("Logging");
									let data = {
										email: email,
										password: password
									}
									axios.get("https://bpz8liejaf.execute-api.us-east-1.amazonaws.com/user/" + data.email).then(res => {

										if (res.data.Item) {
											if (res.data.Item.password === password) {
												localStorage.setItem("username", res.data.Item.name);
												localStorage.setItem("role", res.data.Item.role);
												localStorage.setItem("email", res.data.Item.email)
												history.push("/dashboard/main")

											} else {
												toast.dismiss();
												toast.error("Wrong Password");
												console.log("Passowrd Error")
											}
										}
										else {
											toast.dismiss();
											toast.error("User Not Exist Plaese signup");
											console.log("User Not Exist")
										}
									}).catch(error => {
										console.log(error);
									})

								}}>Login</button>
							</div>
						</form>
					</div>

					<div className="mt-4">
						{id === '2' &&
							<div className="d-flex justify-content-center links">
								<p className="ml-2" style={{ cursor: 'pointer' }} onClick={() => {
									history.push("/sign-up/" + id);
								}}>Sign Up</p>
							</div>
						}
						{id === '1' &&
							<Popup trigger={<p style={{ cursor: 'pointer' }}>Signup</p>} position="right center">
								<div>
									<label htmlFor="secret">Enter Secret Key</label>
									<input id="secret" type="text" onChange={(event) => {
										if (event.target.value === "112") {
											history.push({
												pathname: "/sign-up/" + id,
												state: { access: "true" }
											});
										}
									}}></input>
								</div>
							</Popup>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
