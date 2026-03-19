# Little Lemon Restaurant

A responsive React web application for the **Little Lemon** restaurant, featuring a homepage with a hero section and weekly specials, and a multi-step table reservation flow.

## Tech Stack

- **React 19** — UI library
- **React Router 7** — Client-side routing
- **Vite 8** — Dev server & build tool
- **Vitest + React Testing Library** — Unit testing

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Install Dependencies

```bash
npm install
```

### Run the Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
little-lemon/
├── public/                        # Static assets (logos, images, favicon)
├── src/
│   ├── assets/                    # Imported assets (hero image, SVGs)
│   ├── components/
│   │   ├── Footer/                # Footer component & styles
│   │   ├── Header/                # Navigation header & styles
│   │   ├── Hero/                  # Hero banner & styles
│   │   ├── Reservation/           # Reservation flow components
│   │   │   ├── ReserveTable.*     #   Step 1 — date, time, party size
│   │   │   ├── GuestDetails.*     #   Step 2 — guest info & validation
│   │   │   ├── Confirmation.*     #   Step 3 — booking confirmation
│   │   │   └── FormField.*        #   Reusable form field component
│   │   └── Specials/              # Weekly specials section & styles
│   ├── pages/
│   │   ├── HomePage/              # Home page layout
│   │   └── ReservationPage/       # Reservation page (manages flow state)
│   ├── test/                      # Test setup files
│   ├── App.jsx                    # Root component with routing
│   ├── App.test.jsx               # App-level tests
│   ├── index.css                  # Global styles & CSS variables
│   └── main.jsx                   # Entry point
├── index.html                     # HTML shell
├── vite.config.js                 # Vite configuration
├── vitest.config.js               # Vitest configuration
└── package.json
```
