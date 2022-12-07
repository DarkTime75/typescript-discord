import { GatewayIntentBits } from "discord.js";
import chalk from "chalk";
import "dotenv/config";
import MyClient from "#src/structures/client.js";
(async () => {
  const client = new MyClient<boolean>({
    intents: [
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
    ],
    ws: {
      properties: {
        browser: "Discord iOS",
      },
    },
  });
  exports.client = client;
  console.log(chalk.yellow("Successfully Connected to Discord Gateway!"));
  await client.connect();
})();
