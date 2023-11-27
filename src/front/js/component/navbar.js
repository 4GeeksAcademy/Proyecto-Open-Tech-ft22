import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import openTechLogo from "../../img/navbar-brand-img.png";

export const Navbar = () => {
	return (
		<nav className="navbar" style={{ backgroundColor: 'black', height: '90px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderBottom: '1px solid #ccc' }}>
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 openTech-Logo"><img src={openTechLogo} style={{ width: '160px' }} /></span>
				</Link>
				<div className="ml-auto">
					<Link to="/adminInit">
						<button className="btn submitSalaryNav me-5" style={{ backgroundColor: '#4f89ee' }}>Temporary admin access</button>
					</Link>
					<Link to="/dashboard">
						<button className="btn submitSalaryNav me-5" style={{ backgroundColor: '#4f89ee' }}>Temporary dashboard access</button>
					</Link>
					<Link to="/formManual">
						<button className="btn submitSalaryNav" style={{ backgroundColor: '#4f89ee' }}>Submit Salary</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
