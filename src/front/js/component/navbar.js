import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{!store.token ?
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
						:
						<Link to="/">
							<button onClick={actions.handleLogout} className="btn btn-danger ms-3">Logout</button>
						</Link>
					}
					<Link to="/signup">
						<button className="btn btn-success ms-3">Signup</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
