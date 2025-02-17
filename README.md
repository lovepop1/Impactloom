# ImpactLoom

## Overview
The Impactloom is a Next.js application designed to assess and visualize the effectiveness of Corporate Social Responsibility (CSR) projects. It integrates with Supabase for data storage and Prisma for database management while leveraging Google's Gemini AI for generating insights and reports.

## Try it out
https://youtu.be/sja_xiI25jo?si=edgIi5UYbMexgMQm

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [Supabase](https://supabase.com/) account and project setup
- [Prisma](https://www.prisma.io/) CLI

## Installation

### 1. Install Dependencies
```sh
yarn install
# or
npm install

### 2. Setup Environment Variables
"""
Create a .env file and a .env.local file in the root directory and add the following environment variables:
DATABASE_URL=your_supabase_postgres_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
"""

### 3. Setup the Database
"""
Ensure Prisma is installed and generate the database schema:

npx prisma migrate dev --name init
If running for the first time, apply the schema:


npx prisma db push
Generate Prisma Client:

npx prisma generate

"""

### 4. Run the Application
```sh
yarn dev
# or
npm run dev