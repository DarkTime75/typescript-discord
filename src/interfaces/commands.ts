import type {
  ButtonInteraction,
  CacheType,
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  PermissionResolvable,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  chatInput: (
    interaction: ChatInputCommandInteraction<CacheType>
  ) => Promise<void>;
}

export interface Button {
  name: string;
  button: (interaction: ButtonInteraction<CacheType>) => Promise<void>;
}

export type PossibleTypes = Omit<Command, "chatInput"> | Omit<Button, "button">;

export type DynamicCommand<T> = T extends Omit<Command, "chatInput">
  ? Omit<Command, "chatInput">
  : T extends Omit<Button, "button">
  ? Omit<Button, "button">
  : never;
