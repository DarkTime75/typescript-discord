import { EventArguments } from "#src/interfaces/event";
import { BaseEvent } from "#structures/event.js";
import { Events } from "discord.js";

const event = Events.InteractionCreate as const;

export default class extends BaseEvent<typeof event> {
  public EventName = event;
  async execute(interaction: EventArguments[typeof event][0]) {
    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;
      const command = this.client.commands.get(commandName);
      if (!command) return;
      try {
        await command.chatInput(interaction);
      } catch (e) {
        const subError = (e as Error).message;
        await interaction[interaction.isRepliable() ? "reply" : "followUp"]({
          embeds: [
            {
              title: "An Error Occurred!",
              description: "**Error Message:**\n> " + subError,
              color: 0x2f3136,
            },
          ],
        });
      }
    } else if (interaction.isButton()) {
      const { customId } = interaction;
      const requiredCustomId = customId.includes(":")
        ? customId.split(":")[0]
        : customId;
      const button = this.client.buttons.get(requiredCustomId);
      if (!button) return;
      const Key = customId.split(":")[2];
      await button.button(interaction);
    }
  }
}
