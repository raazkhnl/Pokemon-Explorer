import React from "react";
import logo from '../Images/pokemon.png'; 
const Navbar = ({ keyword, setKeyword }) => {
	return (
		<nav className="navbar shadow sticky-top navbar-expand-lg bg-pokemon">
			<div className="container mt-0">
				<a className="navbar-brand" href="#">
					<img src={logo} width={100} alt="Pokemon Explorer" />
				</a>
				<div className="d-flex ms-auto">
					<input
						type="text"
						className="form-control shadow-sm"
						placeholder="Search Pokémon..."
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
