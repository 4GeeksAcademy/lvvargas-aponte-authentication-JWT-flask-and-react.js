import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Form, Container, Button } from "react-bootstrap";

const LoginForm = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleClick = () => {
		actions.handleLogin(email, password);
	}

	if (store.token && store.token != '' && store.token != undefined) navigate('/');

	return (
		<div className="text-center mt-5">
			<h1 className="mb-5">Login</h1>
			{store.token && store.token != '' && store.token != undefined ? `You are already logged in!` :
				<Container>

					<Form>
						<Form.Group className="mb-3" controlId="email">
							<Form.Control type="email" aria-describedby="emailHelp" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="password">
							<Form.Control type="password" aria-describedby="passwordHelp" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Form.Group>
					</Form>
					<div className="d-grid gap-2">
						<Button variant="primary" onClick={handleClick}>Submit</Button>
					</div>
				</Container>
			}
		</div>
	);
};

export default LoginForm