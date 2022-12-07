import type { Snowflake } from "discord.js";
import { nanoid } from "nanoid";

export function generateCustomId(key: string, user: Snowflake): `${string}_${string}:${string}` {
  return `${user}_${nanoid()}:${key}`;
}
