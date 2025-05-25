import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const packages = pgTable(
  "packages",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    homepage: text("homepage"),
    repository: text("repository"),
    license: text("license"),
    keywords: jsonb("keywords").$type<string[]>(),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    downloadCount: integer("download_count")
      .$defaultFn(() => 0)
      .notNull(),
    isPrivate: boolean("is_private")
      .$defaultFn(() => false)
      .notNull(),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    nameIdx: uniqueIndex("packages_name_idx").on(table.name),
    authorIdx: index("packages_author_idx").on(table.authorId),
    keywordsIdx: index("packages_keywords_idx").using("gin", table.keywords),
    downloadCountIdx: index("packages_download_count_idx").on(
      table.downloadCount
    ),
  })
);

export const packageVersions = pgTable(
  "package_versions",
  {
    id: text("id").primaryKey(),
    packageId: text("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    version: text("version").notNull(),
    description: text("description"),
    tarballUrl: text("tarball_url").notNull(),
    shasum: text("shasum").notNull(),
    size: integer("size").notNull(),
    dependencies: jsonb("dependencies").$type<Record<string, string>>(),
    devDependencies: jsonb("dev_dependencies").$type<Record<string, string>>(),
    peerDependencies:
      jsonb("peer_dependencies").$type<Record<string, string>>(),
    engines: jsonb("engines").$type<Record<string, string>>(),
    publishedAt: timestamp("published_at")
      .$defaultFn(() => new Date())
      .notNull(),
    isPrerelease: boolean("is_prerelease")
      .$defaultFn(() => false)
      .notNull(),
    isDeprecated: boolean("is_deprecated")
      .$defaultFn(() => false)
      .notNull(),
    deprecationMessage: text("deprecation_message"),
  },
  (table) => ({
    packageVersionIdx: uniqueIndex("package_versions_package_version_idx").on(
      table.packageId,
      table.version
    ),
    packageIdx: index("package_versions_package_idx").on(table.packageId),
    publishedAtIdx: index("package_versions_published_at_idx").on(
      table.publishedAt
    ),
    prereleaseIdx: index("package_versions_prerelease_idx").on(
      table.isPrerelease
    ),
  })
);

export const packageMaintainers = pgTable(
  "package_maintainers",
  {
    id: text("id").primaryKey(),
    packageId: text("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: text("role")
      .$type<"owner" | "maintainer" | "contributor">()
      .notNull(),
    addedAt: timestamp("added_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    packageUserIdx: uniqueIndex("package_maintainers_package_user_idx").on(
      table.packageId,
      table.userId
    ),
    packageIdx: index("package_maintainers_package_idx").on(table.packageId),
    userIdx: index("package_maintainers_user_idx").on(table.userId),
  })
);

export const packageDownloads = pgTable(
  "package_downloads",
  {
    id: text("id").primaryKey(),
    packageId: text("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    versionId: text("version_id").references(() => packageVersions.id, {
      onDelete: "cascade",
    }),
    downloadedAt: timestamp("downloaded_at")
      .$defaultFn(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
  },
  (table) => ({
    packageIdx: index("package_downloads_package_idx").on(table.packageId),
    versionIdx: index("package_downloads_version_idx").on(table.versionId),
    downloadedAtIdx: index("package_downloads_downloaded_at_idx").on(
      table.downloadedAt
    ),
  })
);

export const packageTags = pgTable(
  "package_tags",
  {
    id: text("id").primaryKey(),
    packageId: text("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    tag: text("tag").notNull(),
    versionId: text("version_id")
      .notNull()
      .references(() => packageVersions.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    packageTagIdx: uniqueIndex("package_tags_package_tag_idx").on(
      table.packageId,
      table.tag
    ),
    packageIdx: index("package_tags_package_idx").on(table.packageId),
  })
);
