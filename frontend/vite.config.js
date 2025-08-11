import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
        }
      }
    }
})

/*

- Will items have multiple images?
- Will items have mutliple colors?
    - Will each color have its own stock count or just in/out?
    - Will each color have its own image?
- What sizes will items have?
    - Will each size have its own stock count or just in/out?
    - Will possible sizes always be the same for each item?
    - Will there be an option for items with no sizes?
- Will individual items be on sale?
- What categories will you place items into?
    - Will there be any subcategories (golf/pants/, mens/shorts/)?
- Will items have reviews?
- Will items have ratings?
- Will items have in-depth descriptions?
- Will items have tags?
- Will items have related/goes well with items?
- Is there anything else that needs to be stored about each item?


- What is the PRIORITY of anything you've said yes to?
    - What is the MINIMUM you need to launch?
    - What can you add LATER?


*/