import { Command } from "src/interfaces/commands";

export const pingCommand = {
  name: "ping",
  description: "Shows bot ping",
} as Omit<Command, "chatInput">;
