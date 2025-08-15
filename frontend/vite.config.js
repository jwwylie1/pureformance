import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});


/*

Selling
	> 4 pack for drink
	> 12 pack for drink
	> 12 pack for drink mix
	> 24 pack for drink mix

- Will items have multiple images?
	> Yes, probably around 4

- Will items have mutliple flavors?
    - Will each color have its own stock count or just in/out?
				> Keep track of the stock number

- What categories will you place items into?
    - Will there be any subcategories (golf/pants/, mens/shorts/)?
			> mix, drink
- Will items have reviews?
	>	No
- Will items have ratings?
	> No
- Will items have in-depth descriptions?
	> Yes

- Is there anything else that needs to be stored about each item?
	> All good

> Ambassadors
> Products
> Ingredients
> Contact
> Cart
> Logo top left

*/