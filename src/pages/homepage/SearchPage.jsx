import React, { useEffect, useState } from "react";
import homepageUtils from "./utils/homepageUtils";
import { useParams } from "react-router-dom";

import ReactPaginate from "react-paginate";

//Modal
import RecipeDetailsModal from "./RecipeDetailsModal";

export default function SearchPage(props) {
	const { user, userId, searchRecipes, setSearchRecipes } = props;
	const [selectedRecipeShow, setSelectedRecipeShow] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState("");

	const { tag, keyword } = useParams();

	const RECIPES_PER_PAGE = 40;

	useEffect(() => {}, [searchRecipes]);

	const handlePageClick = async (event) => {
		const FROM = event.selected * 40 + 1;
		await homepageUtils.searchRecipeByCategory(
			setSearchRecipes,
			tag ? tag : keyword,
			FROM
		);
	};

	return (
		<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 font-serif py-20">
			<h1 className="text-xl">
				{searchRecipes.count} matching results for "
				<span className="italic">{tag ? tag : keyword}</span>"
			</h1>
			<div className="grid md:grid-cols-4 gap-3 py-5">
				{searchRecipes.results
					? searchRecipes.results.map((recipe, index) => {
							return (
								<div
									className="hover:border-2 border-red-500 p-2 bg-white shadow-md"
									onClick={() => {
										setSelectedRecipeShow(true);
										setSelectedRecipe(recipe);
									}}
								>
									<div className="p-2">
										<img
											src={recipe.thumbnail_url}
											alt="foodimage"
											className="w-full h-36 object-cover rounded-t-lgr"
										/>
										<div className="mt-2">
											<h1 className="text-red-600 pb-">
												{recipe.tags.find((tagname) => tagname.type === "meal")
													?.display_name || ""}
											</h1>
											<h1 className="text-3xl mb-2">{recipe.name}</h1>
											{recipe.total_time_minutes &&
											recipe.total_time_minutes < 60 ? (
												<div className="flex">
													<svg
														className="meta-text__icon h-6 w-6 mr-2"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<circle cx="12" cy="12" r="10" />
														<path d="M12 6v6l4 2" />
													</svg>
													<span className="text-gray-600">
														{recipe.total_time_minutes} minutes
													</span>
												</div>
											) : (
												""
											)}
										</div>
									</div>
								</div>
							);
					  })
					: ""}
			</div>

			<ReactPaginate
				className="search_pagination"
				breakLabel="..."
				onPageChange={(e) => {
					handlePageClick(e);
				}}
				nextLabel={"Next"}
				pageRangeDisplayed={4}
				pageCount={searchRecipes.count / RECIPES_PER_PAGE}
				previousLabel={"Prev"}
				renderOnZeroPageCount={null}
			/>

			<RecipeDetailsModal
				show={selectedRecipeShow}
				onHide={() => setSelectedRecipeShow(false)}
				selectedRecipe={selectedRecipe}
				user={user}
				userId={userId}
			/>
		</div>
	);
}
