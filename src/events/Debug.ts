import chalk from "chalk";
import { Events } from "discord.js";
import { BaseEvent } from "#src/structures/event.js";
import { EventArguments } from "#src/interfaces/event.js";

const event = Events.Debug as const;

export default class extends BaseEvent<typeof event> {
  public EventName = event;
  async execute(Debug: EventArguments[typeof event][0]) {
    console.log(chalk.yellow(Debug));
  }
}
