import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { pingCommand } from "#commands/PingCommand.js";
import { BaseCommand } from "#structures/command.js";

export default class extends BaseCommand<typeof pingCommand> {
  name = pingCommand.name;
  public override async chatInput(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.reply({
      embeds: [
        {
          description: `🏓 **Pong!**\nLatency: ${this.client.ws.ping}`,
          color: 0x2f3136,
        },
      ],
    });
  }
}
