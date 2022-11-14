# typescript-discord
Yet another discord bot template with typescript

# Steps to Follow
- Rename `.env.example` to `.env` and fill the required details
- Run `npm install` to install the dependencies
- Replace the "scripts" in package.json with 
```json
"scripts": {
    "start": "npm run build && npm run start:prod",
    "start:prod": "node dist/index.js",
    "commands:deploy": "npm run build && node scripts/deploy-commands",
    "commands:delete": "npm run build && node scripts/delete-commands",
    "build": "tsc"
  }
```
- Add the below line in package.json
```json
"imports": {
    "#structures/*": "./dist/structures/*",
    "#commands/*": "./dist/interactions/commands/*",
    "#src/*": "./dist/*",
    "#locales/*": "./locales/*"
  }
```
- Run `npm start` to run the bot