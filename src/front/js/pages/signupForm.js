import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Form, Container, Button } from "react-bootstrap";

const SignupForm = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();


	const handleClick = async () => {
		const success = await actions.handleCreateUser(email, password);
		if (success) navigate('/login');

	}


	return (
		<div className="text-center mt-5">
			{store.token && store.token != '' && store.token != undefined ? <h3 className="mb-5">You are already logged in</h3> :
				<>
					<h1 className="mb-5">Create Account</h1>
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
				</>
			}
		</div>
	);
};

export default SignupForm