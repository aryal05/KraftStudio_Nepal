# KraftStudio - Interior Design Platform

A modern interior design and furniture catalog platform built with React, TypeScript, and Vite.

## Features

- 🏠 Browse furniture, lighting, and decor collections
- 🎨 Interactive catalog with product details
- 📱 Responsive design for all devices
- ⚡ Fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 🔐 Admin dashboard for catalog management

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: Wouter
- **Backend**: Express, tRPC
- **Database**: MySQL with Drizzle ORM

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm installed
- MySQL database (for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aryal05/KraftStudio.git
cd KraftStudio
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following:
```env
DATABASE_URL=mysql://user:password@localhost:3306/kraftstudio
NODE_ENV=development
```

4. Run database migrations:
```bash
pnpm run db:push
```

5. Start the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:5000`

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

The project is configured with `vercel.json` for optimal deployment.

### Build for Production

```bash
pnpm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
kraftstudio/
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
│   └── public/      # Static assets
├── server/          # Backend Express + tRPC server
│   └── _core/       # Core server logic
├── shared/          # Shared types and constants
└── vercel.json      # Vercel deployment config
```

## Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run check` - Type check with TypeScript
- `pnpm run format` - Format code with Prettier
- `pnpm run db:push` - Run database migrations

## License

MIT

## Author

Built with ❤️ by the KraftStudio team
