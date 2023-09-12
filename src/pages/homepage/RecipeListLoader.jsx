import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RecipeListLoader(props) {
	const { home = false } = props;

	if (home) {
		return (
			<>
				<div className="grid md:grid-rows-2 md:grid-flow-col gap-3 py-3">
					{[...Array(3)].map((item, index) => {
						if (index <= 1) {
							return (
								<div className="row-span-1 md:mr-4 bg-white shadow-md hover:border-2 border-red-500">
									<div className="md:flex md:flex-row p-2">
										<div className="flex-1 max-w-md mx-auto p-2 md:p-4">
											<Skeleton width={230} height={144} />
										</div>
										<div className="flex-1 md:pt-3 flex flex-col">
											<Skeleton width={230} height={130 / 3} count={3} />
										</div>
									</div>
								</div>
							);
						} else {
							return (
								<div className="md:row-span-2 hover:border-2 border-red-500 p-2 bg-white shadow-md">
									<div className="p-2">
										<Skeleton width={370} height={144} />
										<Skeleton
											width={370}
											height={160 / 3}
											count={3}
											className="mt-2"
										/>
									</div>
								</div>
							);
						}
					})}
				</div>

				<div className="grid md:grid-cols-3 gap-3 py-3">
					{[...Array(30)].map((item, index) => {
						return (
							<div className="hover:border-2 border-red-500 p-2 bg-white shadow-md">
								<Skeleton height={150} />
								<Skeleton height={150 / 3} count={3} />
							</div>
						);
					})}
				</div>
			</>
		);
	} else {
		return (
			<>
				<h1 className="text-xl">
					<Skeleton width={280} />
				</h1>
				<div className="grid md:grid-cols-4 gap-3 py-5">
					{[...Array(40)].map((item, index) => {
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
}
