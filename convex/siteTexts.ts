import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listByLocale = query({
  args: { locale: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("siteTexts")
      .withIndex("by_locale", (q) => q.eq("locale", args.locale))
      .collect();
  },
});

export const setText = mutation({
  args: {
    key: v.string(),
    locale: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("siteTexts")
      .withIndex("by_key_and_locale", (q) =>
        q.eq("key", args.key).eq("locale", args.locale)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
    } else {
      await ctx.db.insert("siteTexts", {
        key: args.key,
        locale: args.locale,
        value: args.value,
      });
    }
  },
});
