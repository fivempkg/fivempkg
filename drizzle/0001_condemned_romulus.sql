CREATE TABLE "package_downloads" (
	"id" text PRIMARY KEY NOT NULL,
	"package_id" text NOT NULL,
	"version_id" text,
	"downloaded_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "package_maintainers" (
	"id" text PRIMARY KEY NOT NULL,
	"package_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text NOT NULL,
	"added_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "package_tags" (
	"id" text PRIMARY KEY NOT NULL,
	"package_id" text NOT NULL,
	"tag" text NOT NULL,
	"version_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "package_versions" (
	"id" text PRIMARY KEY NOT NULL,
	"package_id" text NOT NULL,
	"version" text NOT NULL,
	"description" text,
	"tarball_url" text NOT NULL,
	"shasum" text NOT NULL,
	"size" integer NOT NULL,
	"dependencies" jsonb,
	"dev_dependencies" jsonb,
	"peer_dependencies" jsonb,
	"engines" jsonb,
	"published_at" timestamp NOT NULL,
	"is_prerelease" boolean NOT NULL,
	"is_deprecated" boolean NOT NULL,
	"deprecation_message" text
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"homepage" text,
	"repository" text,
	"license" text,
	"keywords" jsonb,
	"author_id" text NOT NULL,
	"download_count" integer NOT NULL,
	"is_private" boolean NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "package_downloads" ADD CONSTRAINT "package_downloads_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_downloads" ADD CONSTRAINT "package_downloads_version_id_package_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."package_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_maintainers" ADD CONSTRAINT "package_maintainers_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_maintainers" ADD CONSTRAINT "package_maintainers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_tags" ADD CONSTRAINT "package_tags_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_tags" ADD CONSTRAINT "package_tags_version_id_package_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."package_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_versions" ADD CONSTRAINT "package_versions_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packages" ADD CONSTRAINT "packages_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "package_downloads_package_idx" ON "package_downloads" USING btree ("package_id");--> statement-breakpoint
CREATE INDEX "package_downloads_version_idx" ON "package_downloads" USING btree ("version_id");--> statement-breakpoint
CREATE INDEX "package_downloads_downloaded_at_idx" ON "package_downloads" USING btree ("downloaded_at");--> statement-breakpoint
CREATE UNIQUE INDEX "package_maintainers_package_user_idx" ON "package_maintainers" USING btree ("package_id","user_id");--> statement-breakpoint
CREATE INDEX "package_maintainers_package_idx" ON "package_maintainers" USING btree ("package_id");--> statement-breakpoint
CREATE INDEX "package_maintainers_user_idx" ON "package_maintainers" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "package_tags_package_tag_idx" ON "package_tags" USING btree ("package_id","tag");--> statement-breakpoint
CREATE INDEX "package_tags_package_idx" ON "package_tags" USING btree ("package_id");--> statement-breakpoint
CREATE UNIQUE INDEX "package_versions_package_version_idx" ON "package_versions" USING btree ("package_id","version");--> statement-breakpoint
CREATE INDEX "package_versions_package_idx" ON "package_versions" USING btree ("package_id");--> statement-breakpoint
CREATE INDEX "package_versions_published_at_idx" ON "package_versions" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "package_versions_prerelease_idx" ON "package_versions" USING btree ("is_prerelease");--> statement-breakpoint
CREATE UNIQUE INDEX "packages_name_idx" ON "packages" USING btree ("name");--> statement-breakpoint
CREATE INDEX "packages_author_idx" ON "packages" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "packages_keywords_idx" ON "packages" USING gin ("keywords");--> statement-breakpoint
CREATE INDEX "packages_download_count_idx" ON "packages" USING btree ("download_count");