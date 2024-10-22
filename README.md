# App-Discord Bot - Message Management

This project is a Discord bot built with the [Discord.js](https://discord.js.org/) library, featuring commands to manage messages in a server. The bot includes functions to pin, unpin, and clear messages in a channel.

## Features

- **Clear Messages**: Removes all non-pinned messages in a channel using the `!clear` command.
- **Pin Messages**: Sends a message in the channel and pins it to the top using the `!pin [message]` command.
- **Unpin Messages**: Unpins the most recent pinned message using the `!unpin` command.

## Requirements

- Node.js v16.6.0 or higher
- [Discord.js](https://discord.js.org/) v14.x
- Discord bot token
- `MANAGE_MESSAGES` permission to use the commands.

## Install the dependencies:

- npm install

## Commands

- !clear: Clears all non-pinned messages in the channel.
- !pin [message]: Sends and pins a new message in the channel.
- !unpin: Unpins the most recent pinned message in the channel.
