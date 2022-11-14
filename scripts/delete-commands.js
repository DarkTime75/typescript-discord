const {
    REST,
    Routes
} = require('discord.js')
require("dotenv").config();
const chalk = require("chalk");


(async () => {
    try {
        const rest = new REST({
            version: "10"
        }).setToken(process.env.TOKEN)
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), {
                body: []
            }
        );

        console.log(
            `Successfully deleted ${chalk.bold("ALL")} application (/) commands.`
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }


})()