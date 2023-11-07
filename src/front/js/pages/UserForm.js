import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Form, Container, Button } from "react-bootstrap";

export const UserForm = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1 className="mb-5">Login</h1>
			<Container>
				<Form>
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" aria-describedby="emailHelp" placeholder="Enter Email" onKeyUp={actions.handleInputChange}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" aria-describedby="passwordHelp" placeholder="Enter Password" onKeyUp={actions.handleInputChange}/>
					</Form.Group>
				</Form>
				<div className="d-grid gap-2">
                    <Button variant="primary" onClick={() => actions.handleSubmit(navigate)}>Submit</Button>
                </div>
			</Container>
		</div>
	);
};
