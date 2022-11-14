import i18next from "i18next";
import type { Button, Command } from "#src/interfaces/commands";
import {
  Client,
  type ClientEvents,
  type ClientOptions,
  Collection,
  type RestEvents,
} from "discord.js";
import chalk from "chalk";
import { EventInterface } from "#src/interfaces/event";
import { promisify } from "util";
import en from "#locales/en/en.js";
import glob from "glob";
const globPromise = promisify(glob);

class MyClient<Ready extends boolean = boolean> extends Client<Ready> {
  public commands: Collection<Command["name"], Command> = new Collection();
  public events: Collection<EventInterface["EventName"], EventInterface> =
    new Collection();
  public buttons: Collection<Button["name"], Button> = new Collection();
  public Colors = {
    Invisible: 0x2f3136,
  };

  constructor(options: ClientOptions) {
    super(options);
  }

  async connect(): Promise<string> {
    await this.configurateI18Next();
    await this.loadEvents();
    await this.loadButtons();
    await this.loadCommands();
    console.log(chalk.yellow("Successfully connected!"));
    return await super.login(process.env.TOKEN);
  }

  async loadButtons() {
    const buttons = await globPromise(
      `${__dirname.replace(/\\/g, "/")}/../buttons/*{.ts,.js}`
    );

    for (const button of buttons) {
      const Command = (await import(button))?.default;
      const buttonInstance = new Command(this);
      this.buttons.set(buttonInstance.name, buttonInstance);
    }
  }
  async loadCommands() {
    const commands = await globPromise(
      `${__dirname.replace(/\\/g, "/")}/../commands/*/*{.ts,.js}`
    );
    for (const command of commands) {
      const Command = (await import(command))?.default;
      const commandInstance: Command = new Command(this);
      this.commands.set(commandInstance.name, commandInstance);
    }
  }

  async loadEvents() {
    // On Windows, the path is path\to\file\. If you're on Linux, please replace the below line with:
    // const events = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
    const events = await globPromise(
      `${__dirname.replace(/\\/g, "/")}/../events/**/*.js`
    );

    for (const event of events) {
      const Event = (await import(event))?.default;
      const eventInstance: EventInterface = new Event(this);
      this.events.set(eventInstance.EventName, eventInstance);
      if (eventInstance.once)
        this.once(
          eventInstance.EventName as keyof ClientEvents,
          (...args: Parameters<EventInterface["execute"]>) =>
            eventInstance.execute(...args)
        );
      else {
        /**
         * REST Events are not supposed to be "once".
         */
        if (eventInstance.rest) {
          this.rest.on(
            eventInstance.EventName as keyof RestEvents,
            (...args: Parameters<EventInterface["execute"]>) =>
              eventInstance.execute(...args)
          );
        } else {
          this.on(
            eventInstance.EventName as keyof ClientEvents,
            (...args: Parameters<EventInterface["execute"]>) =>
              eventInstance.execute(...args)
          );
        }
      }
    }
  }

  async configurateI18Next() {
    i18next.init({
      fallbackLng: "en",
      resources: {
        en: {
          translation: {
            ...en,
          },
        },
      },
    });
  }
}

export default MyClient;
