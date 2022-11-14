import type { ButtonInteraction, CacheType } from "discord.js";
import { TestButton } from "#src/interactions/buttons/test.js";
import { BaseCommand } from "#structures/command.js";
import { t } from "i18next";

export default class extends BaseCommand<typeof TestButton> {
  name = TestButton.name;
  public override async button(
    interaction: ButtonInteraction<CacheType>
  ): Promise<void> {
    const { customId } = interaction;
    const user = customId.split(":")[1];
    if (interaction.user.id !== user && user) {
      await interaction.reply({
        embeds: [
          {
            description: t("errors.interactions.unauthorized_member"),
            color: this.client.Colors.Invisible,
          },
        ],
        ephemeral: true,
      });
      return;
    }
    await interaction.reply({
      content: "Hello!",
    });
  }
}
