import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Minimal schema — Convex is kept only for potential future use
export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),
});
