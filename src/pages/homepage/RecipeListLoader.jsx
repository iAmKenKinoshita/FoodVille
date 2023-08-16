import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RecipeListLoader() {
	return (
		<>
			<h1 className="text-xl">
				<Skeleton width={300} />
			</h1>
			<div className="grid md:grid-cols-4 gap-3 py-5">
				{[...Array(40)].map((recipe, index) => {
					return (
						<div className="hover:border-2 border-red-500 p-2 bg-white shadow-md">
							<Skeleton height={170} />
							<Skeleton height={170 / 4} count={4} />
						</div>
					);
				})}
			</div>
			<div className="flex justify-center">
				<Skeleton width={300} height={30} className="" />
			</div>
		</>
	);
}
