This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First,navigate to your project directory and install the necessary npm dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

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

## Seed Sample Data
 ```bash
npm run seed
```
## Unit test
 ```bash
npm run test
```

## Decisions made
This Next.js Application utilizes Shadcn table and tanstack/react-table mainly because shadcn/ui components are copied directly into a developer's project via a CLI tool. This means you will have complete control over the structure, logic, and styling, and can modify the components without fighting against complex overrides or being tied to a library's release cycles.

The shadcn/ui components are built using Tailwind CSS utility classes, making styling intuitive for developers already familiar with Tailwind's utility-first workflow. Customizing the look and feel to match a specific brand or design system is straightforward using CSS variables and utility classes.

Used Status filter and search filter utilizing inbuilt shadcdn table columns  and tanstack/react-table,  data is passed as props and filtered utilizing tanstack/react-table inbuilt functions.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
