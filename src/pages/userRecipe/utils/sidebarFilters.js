const sidebarFilters = [
	{
		TITLE: "Recipes",
		filters: [
			{ TITLE: "All", INDEX: 0, SELECT_RECIPE: "allRecipes" },
			{ TITLE: "Favorites", INDEX: 1, SELECT_RECIPE: "allFavorites" },
		],
	},
	{
		TITLE: "Food Ville's",
		filters: [
			{ TITLE: "All", INDEX: 2, SELECT_RECIPE: "foodVilleRecipes" },
			{ TITLE: "Favorites", INDEX: 3, SELECT_RECIPE: "foodVilleFavorites" },
		],
	},
	{
		TITLE: "Your Recipes",
		filters: [
			{ TITLE: "All", INDEX: 4, SELECT_RECIPE: "userRecipes" },
			{ TITLE: "Favorites", INDEX: 5, SELECT_RECIPE: "userFavorites" },
		],
	},
];

export default sidebarFilters;
