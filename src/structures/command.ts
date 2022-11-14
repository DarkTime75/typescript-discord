import {
  Button,
  Command,
  DynamicCommand,
  PossibleTypes,
} from "#src/interfaces/commands";
import MyClient from "#src/structures/client";

export abstract class BaseCommand<
  CommandName extends DynamicCommand<PossibleTypes>
> {
  abstract name: CommandName["name"];
  constructor(public readonly client: MyClient) {
    this.client = client;
  }

  public async chatInput(
    interaction: Parameters<Command["chatInput"]>[0]
  ): Promise<void> {
    console.log(
      `Received interaction for ${interaction.commandName}. But the command did not have a chatInput function.`
    );
  }

  public async button(
    interaction: Parameters<Button["button"]>[0]
  ): Promise<void> {
    console.log(
      `Received Button Interaction for ${interaction.customId}. But the button did not have a button function.`
    );
  }
}
