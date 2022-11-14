import { RESTEvents } from "discord.js";
import { BaseEvent } from "#structures/event.js";
import { EventArguments } from "#src/interfaces/event";

const event = RESTEvents.RateLimited as const;

export default class extends BaseEvent<typeof event> {
  public EventName = event;
  public rest = true;
  async execute(Data: EventArguments[typeof event][0]) {
    console.log(`RateLimit Event Emitted. Data:\n${Data}`);
  }
}
