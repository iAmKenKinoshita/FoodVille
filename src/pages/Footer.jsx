import React from "react";

function Footer(props) {
	return (
		<footer className="bg-gray-800 text-white py-6">
			<div className="container mx-auto flex flex-col items-center justify-between">
				<div className="">
					<p className="text-xl text-center">
						Copyright &copy; 2023. All rights are reserved
					</p>
				</div>
				<div className="space-x-4 flex py-2">
					{/* <a
						href="https://github.com/iAmKenKinoshita"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-blue-500"
					>
						<GitHub size={40} />
					</a>
					<a
						href="https://www.linkedin.com/in/kinoshitaken"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-blue-500"
					>
						<Linkedin size={40} />
					</a>
					<a
						href="mailto:kenbuslonkinoshita@gmail.com"
						className="text-white hover:text-blue-500"
					>
						<Mail size={40} />
					</a> */}
				</div>
			</div>
		</footer>
	);
}

export default Footer;
