# Cortexuum/kalyxi.ai

## Overview

This is a full-stack marketing agency website for Cortexuum/kalyxi.ai, an AI-powered marketing platform. The application serves as a lead generation and client management system with features including a conversational AI chatbot, lead capture forms, milestone tracking, Stripe payment integration, and an admin dashboard for managing leads.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Animations**: Framer Motion for page transitions and UI animations
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Authentication**: Passport.js with local strategy, session-based auth using express-session
- **Password Security**: Scrypt hashing with timing-safe comparison
- **API Design**: RESTful endpoints under `/api/*` prefix

### Data Storage
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with drizzle-kit for migrations
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Key Tables**: users, leads, conversations, leadMilestones, marketingSettings, pageReviews

### Build and Development
- **Development**: `npm run dev` runs tsx for hot-reloading server
- **Production Build**: Vite builds frontend to `dist/public`, esbuild bundles server to `dist`
- **Database Migrations**: `npm run db:push` using drizzle-kit

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and API clients
│   │   ├── pages/       # Route components
│   │   └── assets/      # Images and static files
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── auth.ts       # Authentication setup
│   ├── storage.ts    # Database operations
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   └── schema.ts     # Drizzle schema definitions
└── migrations/       # Database migrations
```

## External Dependencies

### Database
- **Neon Database**: PostgreSQL serverless database (requires `DATABASE_URL` environment variable)

### Payment Processing
- **Stripe**: Payment integration for checkout functionality (requires `STRIPE_SECRET_KEY`)
- Client-side: `@stripe/react-stripe-js` and `@stripe/stripe-js`

### Email Service
- **SendGrid**: Email notifications for lead submissions (requires `SENDGRID_API_KEY`)
- Sends notifications to configured recipients when new leads are captured

### AI/Chatbot
- **ElevenLabs**: Conversational AI widget integration for website chatbot
- Custom chatbot components with voice synthesis capabilities

### Analytics
- **Google Analytics**: Page tracking and conversion events
- **Facebook Pixel**: Marketing attribution and lead tracking

### Replit-Specific
- Uses `@replit/vite-plugin-runtime-error-modal` for development error handling
- Uses `@replit/vite-plugin-cartographer` for development tooling