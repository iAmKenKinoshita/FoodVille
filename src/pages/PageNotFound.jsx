import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 font-serif py-20">
			{" "}
			<div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<h1 className="text-black text-2xl font-bold text-center">
					Sorry, we couldn't find the page you're looking for.
				</h1>
				<div className="flex justify-center">
					<Link to={"/"} className="">
						<button className="bg-emerald-300 hover:bg-emerald-500 text-white font-medium rounded-md focus:outline-none p-2 mt-2 right-1/2 translate-x-1">
							Go back to main page
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
