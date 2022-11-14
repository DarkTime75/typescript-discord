import MyClient from "#src/structures/client";
import { Events } from "discord.js";
import chalk from "chalk";
import { BaseEvent } from "#structures/event.js";

const event = Events.ClientReady as const;

export default class extends BaseEvent<typeof event> {
  public once = true;
  public EventName = event;
  async execute(client: MyClient<true>) {
    console.log(chalk.bold("The bot is ready!"));
  }
}
