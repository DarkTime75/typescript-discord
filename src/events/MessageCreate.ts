import { Events } from "discord.js";
import { BaseEvent } from "#structures/event.js";
import { EventArguments } from "#src/interfaces/event";

const event = Events.MessageCreate as const;

export default class extends BaseEvent<typeof event> {
  public EventName = event;
  async execute(message: EventArguments[typeof event][0]) {
    /**
     * You can access the client via: this.client
     */
  }
}
