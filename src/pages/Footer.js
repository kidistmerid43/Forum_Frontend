import React from "react";
import "./Footer.css";
import Logo from "../Source/img/footerlogo.png";
import { AiFillFacebook } from "react-icons/ai";
import { TiSocialInstagram } from "react-icons/ti";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
	return (
		<div className="footer-top">
			<div className="container">
				<div className="footer-bottom-content clearfix">
					{/* the all part */}
					<div className="row">
						{/* First part */}
						<div className="col-lg-4 col-md-4">
							<div className="logo-footer">
								<a className="navbar-brand" href="/">
									<img src={Logo} alt="" />
								</a>
							</div>
							<ul className="footer-social-list list-social list-inline">
								<li>
									<a
										href="https://www.facebook.com/EthiopiansNetwork"
										target="_blank"
										rel="noopener noreferrer"
									>
										<AiFillFacebook />
									</a>
								</li>
								<li>
									<a
										href="https://www.instagram.com/evangaditech/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<TiSocialInstagram />
									</a>
								</li>
								<li>
									<a
										href="https://www.youtube.com/c/weareethiopians"
										target="_blank"
										rel="noopener noreferrer"
									>
										<AiFillYoutube />
									</a>
								</li>
							</ul>
						</div>

						{/* Second part */}
						<div className="col-lg-4 col-md-4">
							<h5>Useful Links</h5>
							<ul className="list-menu">
								<li>
									<a href="/explained">How it works </a>
								</li>
								<li>
									<a href="/legal/terms/">Terms of Service</a>
								</li>
								<li>
									<a href="/legal/privacy/">Privacy policy</a>
								</li>
							</ul>
						</div>

						{/* Third part */}
						<div className="col-lg-4 col-md-4">
							<h5>Contact Info</h5>
							<ul className="list-menu contact-list">
								<li>Evangadi Networks</li>
								<li>support@evangadi.com</li>
								<li>+1-202-386-2702</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
