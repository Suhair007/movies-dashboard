# Streaming Dashboard

A modern Netflix/Hulu-style streaming dashboard built with Next.js 14, TypeScript, and Tailwind CSS. This application fetches movie data from The Movie Database (TMDB) API and displays it in an elegant, responsive interface.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: The Movie Database (TMDB) API
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ installed
- npm package manager
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd streaming-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

You can copy the example file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your TMDB API key.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server (requires build first)
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
streaming-dashboard/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── HeroBanner.tsx      # Hero banner component
│   │   ├── MovieCard.tsx       # Individual movie card
│   │   └── MovieRow.tsx        # Horizontal scrolling row
│   ├── movie/
│   │   └── [id]/
│   │       ├── page.tsx        # Dynamic movie detail page
│   │       └── not-found.tsx   # 404 page for movies
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── lib/
│   └── tmdb.ts                 # TMDB API integration
├── types/
│   └── movie.ts                # TypeScript type definitions
├── public/                     # Static assets
├── .env.local                  # Environment variables (gitignored)
├── .env.example                # Example environment file
└── next.config.js              # Next.js configuration
```

## API Integration

This application uses The Movie Database (TMDB) API to fetch movie data. The following endpoints are used:

- `/movie/popular` - Popular movies
- `/movie/now_playing` - Currently playing movies
- `/movie/top_rated` - Top rated movies
- `/movie/{id}` - Movie details by ID

All API calls are made server-side for optimal performance and security.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add the `TMDB_API_KEY` environment variable in Vercel dashboard
4. Deploy!

The application will be automatically deployed and available at a Vercel URL.

### Environment Variables in Vercel

Make sure to add the following environment variable in your Vercel project settings:

- `TMDB_API_KEY` - Your TMDB API key