import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Register } from "./register";
import { Login } from "./login";
import "../../styles/home.css";
import card1 from "../../img/card1.png";
import card2 from "../../img/card2.png";
import card3 from "../../img/card3.png";
import card4 from "../../img/card4.png";
import { Welcome } from "./welcome";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="pseudo-navbar">
				<h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
					Unlocking IT salaries, Embracing Transparency in Tech Careers.
				</h1>
				{store.user ? <Welcome /> : <Login />}
			</div>





			{/*CARDS*/}
			<div className="d-flex justify-content-around flex-wrap mb-5 mt-5">
				<div className="card custom-card" style={{ width: '19rem', margin: '10px 5px' }}>
					<img src={card1} className="card-img-top" alt="..." style={{ objectFit: 'cover', height: '12rem', border: '4px solid white' }} />
					<div className="card-body">
						<p className="card-text text-justify">Providing transparency in IT salaries empowers professionals to make informed decisions about their career paths. Users can compare their salaries with industry standards, helping them negotiate better compensation packages and make strategic career choices.</p>
					</div>
				</div>

				<div className="card custom-card" style={{ width: '19rem', margin: '10px 5px' }}>
					<img src={card2} className="card-img-top" alt="..." style={{ objectFit: 'cover', height: '12rem', border: '4px solid white' }} />
					<div className="card-body">
						<p className="card-text">The platform allows users to benchmark their salaries against others in the same industry or role. This valuable data enables individuals to gauge their position in the job market, understand salary trends, and identify opportunities for career growth.</p>
					</div>
				</div>

				<div className="card custom-card" style={{ width: '19rem', margin: '10px 5px' }}>
					<img src={card3} className="card-img-top" alt="..." style={{ objectFit: 'cover', height: '12rem', border: '4px solid white' }} />
					<div className="card-body">
						<p className="card-text">By openly sharing salary information, the platform contributes to fostering fair compensation practices. It helps highlight discrepancies and encourages employers to maintain competitive salary structures, creating a more equitable and just work environment for IT professionals..</p>
					</div>
				</div>

				<div className="card custom-card" style={{ width: '19rem', margin: '10px 5px' }}>
					<img src={card4} className="card-img-top" alt="..." style={{ objectFit: 'cover', height: '12rem', border: '4px solid white' }} />
					<div className="card-body">
						<p className="card-text">The platform cultivates a sense of community among IT professionals by providing a space for users to anonymously share their compensation details. This one-way sharing of salary data allows users to gain insights into industry compensation trends and make informed decisions about their careers.</p>
					</div>
				</div>
			</div>







		</div>
	);
};

