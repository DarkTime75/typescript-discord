const {
    pathToFileURL
} = require("node:url");
const {
    promisify
} = require("node:util");
const {
    REST,
    Routes
} = require('discord.js')
const {
    config
} = require("dotenv")
config();

const slashCommands = [];
const globPromise = promisify(require("glob"));

(async () => {

    const commandFiles = await globPromise(
        `${__dirname.replace(/\\/g, "/")}/../dist/interactions/commands/*.js`
    )
    await Promise.all(
        commandFiles.map(async (filePath) => {
            const importedObject = await import(pathToFileURL(filePath))
            const commandName = Object.keys(importedObject)[2]
            const command = importedObject[commandName]
            slashCommands.push(command)
        })
    )

    try {
        console.log(
            `Started refreshing ${slashCommands.length} application (/) commands.`
        );

        const rest = new REST({
            version: "10"
        }).setToken(process.env.TOKEN)
        console.log(slashCommands)
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID.toString()), {
                body: slashCommands
            }
        );

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }


})()