import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  siteTexts: defineTable({
    key: v.string(),
    locale: v.string(),
    value: v.string(),
  })
    .index("by_key_and_locale", ["key", "locale"])
    .index("by_locale", ["locale"]),
});
