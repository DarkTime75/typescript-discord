import {
  EventInterface,
  PossibleEvents,
  EventArguments,
} from "#src/interfaces/event";
import MyClient from "#src/structures/client";
export abstract class BaseEvent<Event extends PossibleEvents>
  implements EventInterface
{
  once?: boolean | undefined = false;
  abstract EventName: `${PossibleEvents}`;
  constructor(public readonly client: MyClient) {
    this.client = client;
  }

  async execute(...parameters: EventArguments[`${Event}`][number][]) {
    console.log(
      `Received the ${this.EventName} event. But the event implementation did not have the execute method.`
    );
  }
}
