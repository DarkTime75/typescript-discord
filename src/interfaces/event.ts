import type { ClientEvents, RestEvents } from "discord.js";

type PossibleEvents = keyof ClientEvents | keyof RestEvents;
type EventArguments = ClientEvents & RestEvents;

interface EventInterface {
  EventName: `${PossibleEvents}`;
  execute: (...args: EventArguments[PossibleEvents][number][]) => any;
  once?: boolean | undefined;
  rest?: boolean | undefined;
}

export { PossibleEvents, EventArguments, EventInterface };
