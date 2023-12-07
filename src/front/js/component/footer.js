import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center footer-img">
		<div className="column">
			<p>
				<a href="https://www.instagram.com/tucuentadeinstagram">
					<i className="fa-brands fa-instagram" style={{ fontSize: '30px', color: 'white' }}></i>
				</a>
			</p>
		</div>
		<div className="column">
			<p>
				<a href="https://twitter.com/tucuentadetwitter">
					<FaXTwitter style={{ fontSize: '30px', color: 'white' }}/>
				</a>
			</p>
		</div>
		<div className="column">
			<p>
				<a href="https://discord.com/">
					<i class="fa-brands fa-discord" style={{ fontSize: '30px', color: 'white' }}></i>
				</a>
			</p>
		</div>
		<div className="column">
			<p>
				<a href="https://web.facebook.com/tucuentadefacebook?_rdc=1&_rdr">
					<i className="fa-brands fa-facebook" style={{ fontSize: '30px', color: 'white' }}></i>
				</a>
			</p>
		</div>
		<div className="column">
			<p>
				<a href="https://www.linkedin.com/tucuentadelinkedin">
					<i className="fa-brands fa-linkedin" style={{ fontSize: '30px', color: 'white' }}></i>
				</a>
			</p>
		</div>
	</footer>
);
