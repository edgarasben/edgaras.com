-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "bookmarks" (
	"id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "bookmarks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now(),
	"title" text,
	"tags" text[],
	"link" text NOT NULL,
	CONSTRAINT "favs_link_key" UNIQUE("link")
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "posts" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"markdown" text NOT NULL,
	"status" text NOT NULL,
	"id" text PRIMARY KEY DEFAULT generate_random_19_digit_id() NOT NULL,
	CONSTRAINT "posts_id_key" UNIQUE("id"),
	CONSTRAINT "posts_status_check" CHECK (status = ANY (ARRAY['public'::text, 'draft'::text]))
);
--> statement-breakpoint
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "newsletters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"subject" text,
	"text" text,
	"html" text,
	"status" text DEFAULT 'draft' NOT NULL,
	CONSTRAINT "newsletters_status_check" CHECK (status = ANY (ARRAY['draft'::text, 'sent'::text]))
);
--> statement-breakpoint
ALTER TABLE "newsletters" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "articles" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"markdown" text NOT NULL,
	"slug" text PRIMARY KEY NOT NULL,
	"status" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"tags" text,
	CONSTRAINT "posts_slug_key" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "articles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE VIEW "public"."bookmark_tags_all" AS (SELECT unnest(bookmarks.tags) AS name, count(*) AS count FROM bookmarks GROUP BY (unnest(bookmarks.tags)));--> statement-breakpoint
CREATE POLICY "Enable insert for authenticated users only" ON "bookmarks" AS PERMISSIVE FOR ALL TO "authenticated" USING ((auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)) WITH CHECK ((auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid));--> statement-breakpoint
CREATE POLICY "Everyone can read bookmarks" ON "bookmarks" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "As an admin I can view, create, updated and delete all posts" ON "posts" AS PERMISSIVE FOR ALL TO public USING ((auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)) WITH CHECK ((auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid));--> statement-breakpoint
CREATE POLICY "Everyone can see public posts" ON "posts" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "Enable all for admin" ON "articles" AS PERMISSIVE FOR ALL TO "authenticated" USING ((auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)) WITH CHECK ((auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid));--> statement-breakpoint
CREATE POLICY "Enable read access for all users" ON "articles" AS PERMISSIVE FOR SELECT TO public;
*/