import { Command } from "src/interfaces/commands";
import { ApplicationCommandOptionType } from "discord.js";

export const sortCommand = {
  name: "sort",
  description: "Pretty self explainatory name if you ask me.",
} as Omit<Command, "chatInput">;
