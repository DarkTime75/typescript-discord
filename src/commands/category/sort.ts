import { sortCommand } from "#commands/sortCommand.js";
import { BaseCommand } from "#structures/command.js";
import {
  ChatInputCommandInteraction,
  CacheType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export default class extends BaseCommand<typeof sortCommand> {
  public name = sortCommand.name;
  public override async chatInput(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    /**
     * Insertion Sorting
     */
    const array = [43, 54, 64, 21, 7, 2, 56];
    const length = array.length;

    function swap(arr: number[], i1: number, i2: number): void {
      let temp = arr[i1];
      arr[i1] = arr[i2];
      arr[i2] = temp;
    }

    for (let i = 1; i < length - 1; i++) {
      let j = i;
      while (j > 0 && array[j - 1] > array[j]) {
        swap(array, array.indexOf(array[j]), array.indexOf(array[j - 1]));
        j = j - 1;
      }
    }

    console.log(array);

    await interaction.reply({
      content: "Check console.",
      components: [
        new ActionRowBuilder<ButtonBuilder>({
          components: [
            new ButtonBuilder()
              .setCustomId("test")
              .setLabel("Test Button")
              .setStyle(ButtonStyle.Secondary),
          ],
        }),
      ],
    });
  }
}
