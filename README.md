# Hotel PrideIN — In-Room Dining Web App

A premium, mobile-first web application for hotel guests to scan, browse, and order authentic Indian cuisine directly to their rooms.

[![Live Demo](https://img.shields.io/badge/Live_Demo-https%3A%2F%2Fbaniya--hotel.vercel.app-7A1F1F?style=for-the-badge)](https://hotel-pride-in-e-menu.vercel.app/)

---

## 📱 Features

- **Luxury Dark Theme:** Crafted with a premium dark warm brown palette (`#1A1208`), luxury typography (Playfair Display + Inter), and smooth micro-animations.
- **Frictionless Navigation:** A sticky search bar and Veg mode filter at the top of the viewport, with sticky category tabs at the bottom for quick, thumb-friendly navigation.
- **Rich Interactive Menu:** Browse categories including Breakfast, Lunch, Dinner, Bread, Snacks, Beverages, and Desserts.
- **Veg Mode Filter:** Instantly filter dishes to display only vegetarian selections, marked with custom badges.
- **Advanced Cart System:** Add, edit, and adjust item quantities with instant price calculations.
- **Synthesized Success Audio:** Plays an arpeggio audio chime on successful order placement generated dynamically via the **Web Audio API** (requires no external `.mp3` assets).
- **Responsive Animations:** Custom animations for the order placement loader and confirmation page matching the hotel's premium visual theme.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Server-Side Rendering & Client-Side Routing)
- **Bundler & Build Tool:** [Vite 7](https://vite.dev/)
- **Server Engine:** [Nitro](https://nitro.unjs.io/) (Preset configured for Vercel Serverless Functions)
- **Styling:** Tailwind CSS v4 + Lightning CSS
- **Icons:** Lucide React
- **Audio Synthesis:** Web Audio API

---

## 🚀 Local Development

To run the application locally, ensure you have [Node.js](https://nodejs.org/) installed:

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

### 2. Start the Development Server
```bash
npm run dev
# or
bun run dev
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### 3. Build for Production
To build the static resources and generate the Nitro serverless bundle for deployment:
```bash
npm run build
# or
bun run build
```

### 4. Preview the Production Build locally
```bash
npm run preview
# or
bun run preview
```

---

## 📂 Project Structure

```text
├── src/
│   ├── components/       # Reusable React components (Header, Food Card, Veg Badge, etc.)
│   ├── data/             # Static configuration data (menu items, categories)
│   ├── lib/              # Client utility files (sound synthesizer, Lovable logging)
│   ├── routes/           # TanStack Start file-based routing directory
│   │   ├── __root.tsx    # Root layout & page metadata
│   │   ├── index.tsx     # Homepage (Menu, category lists, search bar)
│   │   ├── cart.tsx      # Cart panel & order details form
│   │   └── confirm.tsx   # Order placed animated success page
│   ├── store/            # Custom state stores (Cart Context)
│   ├── styles.css        # Global CSS stylesheet & Tailwind CSS configuration
│   └── server.ts         # Nitro server entry-point wrapped with SSR error capture
├── public/               # Static public files (images, favicon, manifest)
├── vercel.json           # Vercel deployment configuration
└── vite.config.ts        # Vite, React, TanStack Start & Nitro configuration
```

---

## 🌐 Deployment to Vercel

The application is configured to deploy directly to **Vercel** with zero-configuration using the Vercel Build Output API:
1. When you push to your repository, Vercel detects the framework as **TanStack Start** (via the Nitro engine).
2. It automatically installs dependencies using `bun` or `npm` and executes the build command (`vite build`).
3. The build outputs a `.vercel/output` directory containing static files and serverless routing logic.
4. Vercel deploys the functions and starts routing requests instantly.
