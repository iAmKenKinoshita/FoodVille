import React from "react";

export const test = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="bg-blue-500 p-4">
			<div className="container mx-auto flex items-center justify-between">
				<div className="text-white font-bold text-xl">Your Brand</div>
				<div className="hidden md:flex space-x-4">
					<a href="/" className="text-white">
						Home
					</a>
					<a href="/about" className="text-white">
						About
					</a>
					<a href="/contact" className="text-white">
						Contact
					</a>
				</div>
				<div className="md:hidden flex items-center">
					<button
						className="text-white focus:outline-none"
						onClick={toggleMobileMenu}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							{isMobileMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							)}
						</svg>
					</button>
				</div>
			</div>
			{isMobileMenuOpen && (
				<div className="md:hidden bg-blue-500">
					<a href="/" className="block text-white p-4">
						Home
					</a>
					<a href="/about" className="block text-white p-4">
						About
					</a>
					<a href="/contact" className="block text-white p-4">
						Contact
					</a>
				</div>
			)}
		</nav>
	);
};
