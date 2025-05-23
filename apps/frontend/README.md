# MisterFi Frontend

## Directory Structure

```
app/
├── components/
│   ├── layout/           # Layout components
│   │   ├── Shell.tsx    # Main layout wrapper (includes persistent sidebar)
│   │   ├── Header.tsx   # App header with:
│   │   │   ├── Profile dropdown
│   │   │   ├── Notifications
│   │   │   └── Quick actions (add transaction, etc)
│   │   ├── Sidebar/     # Separate directory for sidebar components
│   │   │   ├── MainNav.tsx     # Main navigation links
│   │   │   ├── QuickStats.tsx  # Mini financial overview
│   │   │   └── Collapse.tsx    # Sidebar collapse control
│   │   └── Dashboard/     # Dashboard-specific layouts
│   │       ├── WidgetGrid.tsx  # Responsive grid for dashboard widgets
│   │       └── Widgets/        # Individual widget layouts
│   ├── ui/              # Reusable UI components
│   │   ├── buttons/     # Button variants
│   │   ├── forms/       # Form components (planned)
│   │   ├── cards/       # Card components
│   │   └── charts/      # Data visualization
│   └── shared/          # Shared feature components
├── lib/
│   └── redux/           # Redux state management
│       ├── store/       # Redux store configuration
│       ├── hooks/       # Typed Redux hooks
│       └── slices/      # Redux slices (planned)
│           ├── auth/    # Authentication state
│           ├── transactions/ # Financial transactions
│           ├── budgets/ # Budget tracking
│           ├── goals/   # Financial goals
│           └── ui/      # UI state management
├── providers/           # App providers
│   ├── index.tsx       # Combined providers
│   ├── ThemeProvider.tsx # Theme management
│   └── ReduxProvider.tsx # Redux store provider
```

## Planned Features

### Authentication (with Clerk)

- Sign in/Sign up
- Profile management
- Session handling

### Dashboard

- Overview of financial status
- Recent transactions
- Budget progress
- Goal tracking

### Transactions

- Transaction list/grid view
- Transaction categories
- Search and filtering
- Add/Edit transactions

### Budgeting

- Budget creation
- Category-based budgets
- Budget vs actual tracking
- Budget alerts

### Financial Goals

- Goal setting
- Progress tracking
- Goal categories
- Timeline projections

### Theme Support

- Light/Dark mode
- System preference detection
- Consistent colour scheme

## Tech Stack

- Next.js 14 with App Router
- TypeScript for type safety
- Redux Toolkit for state management
- Tailwind CSS for styling
- Next-themes for theme management

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
