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

here if you want to make a database
using psql and heidisql

-- Step 1: Create database
CREATE DATABASE ordering_system;

-- (Optional) Connect to the new database if using psql CLI
-- \c ordering_system;

-- Step 2: Create table: categories
CREATE TABLE IF NOT EXISTS categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE
);

-- Comments for 'categories'
COMMENT ON COLUMN categories.id IS 'Primary key for the category';
COMMENT ON COLUMN categories.name IS 'Unique name of the category';

-- Step 3: Create table: menu_items
CREATE TABLE IF NOT EXISTS menu_items (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	price NUMERIC(10,2) NOT NULL,
	images VARCHAR(255) DEFAULT NULL,
	is_visible BOOLEAN DEFAULT true,
	created_at TIMESTAMP DEFAULT now(),
	description TEXT DEFAULT NULL,
	category_id INTEGER DEFAULT 1,
	CONSTRAINT menu_items_category_id_fkey FOREIGN KEY (category_id)
		REFERENCES categories (id)
		ON UPDATE NO ACTION
		ON DELETE SET NULL
);

-- Comments for 'menu_items'
COMMENT ON COLUMN menu_items.id IS 'Primary key for the menu item';
COMMENT ON COLUMN menu_items.name IS 'Name of the menu item';
COMMENT ON COLUMN menu_items.price IS 'Price of the item in RM';
COMMENT ON COLUMN menu_items.images IS 'Image path or URL';
COMMENT ON COLUMN menu_items.is_visible IS 'Visibility toggle for customers';
COMMENT ON COLUMN menu_items.created_at IS 'Creation timestamp';
COMMENT ON COLUMN menu_items.description IS 'Optional description';
COMMENT ON COLUMN menu_items.category_id IS 'Foreign key referencing categories';

also create 

.env.local
PGUSER=postgres
PGHOST=localhost
PGDATABASE=ordering_system
PGPASSWORD=root
PGPORT=5432