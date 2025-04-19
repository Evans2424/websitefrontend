# TEUP Website

This is the website for Tuna de Engenharia da Universidade do Porto (TEUP), showcasing the academic music group, their performances, news, and history.

## Technologies Used

- **Next.js 15** - React framework for building the website
- **React 19** - JavaScript library for UI
- **TypeScript** - For type-safe code
- **Tailwind CSS** - For styling
- **Framer Motion** - For animations
- **Shadcn UI** - Component library based on Radix UI

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm (or npm/yarn)

### Installation

1. Clone the repository
2. Navigate to the project directory and install dependencies:

```bash
cd websitefrontend
pnpm install
# or with npm
npm install
# or with yarn
yarn install
```

### Development

To run the development server:

```bash
pnpm dev
# or with npm
npm run dev
# or with yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production build:

```bash
pnpm build
# or with npm
npm run build
# or with yarn
yarn build
```

To start the production server:

```bash
pnpm start
# or with npm
npm start
# or with yarn
yarn start
```

## Project Structure

```
websitefrontend/
├── app/                  # Next.js App Router pages and routes
│   ├── components/       # Page-specific components
│   ├── atuacoes/         # Performances pages
│   ├── galeria/          # Gallery pages
│   └── noticias/         # News pages
├── components/           # Shared/reusable components
│   └── ui/               # UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and services
├── public/               # Static assets
│   └── images/           # Images used in the website
```

## Customization

- Update content in `app/page.tsx` to modify the landing page
- Add new images to `/public/images/`
- Modify theme colors in `tailwind.config.ts`

## Deployment

### GitHub Pages

This project is configured for deployment on GitHub Pages. When you push to the main branch, GitHub Actions will automatically build and deploy the site.

To manually deploy:

1. Make sure your changes are committed to the main branch
2. Push to GitHub:
   ```bash
   git push origin main
   ```
3. The GitHub Actions workflow will automatically deploy your site to GitHub Pages
4. Your site will be available at `https://[your-username].github.io/websitefrontend`

### Customizing the Base Path

If your repository name is different from "websitefrontend", update the `basePath` in `next.config.mjs`:

```js
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

## License

All rights reserved. This codebase is proprietary and confidential.

## Contact

For any inquiries about this website, please contact [info@teup.pt](mailto:info@teup.pt).