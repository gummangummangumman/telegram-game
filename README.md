# GuMMaN's epic telegram game!

## Play the game

Coming soon to telegram!

## I am a developer and want to make my own version of this game

Given that you can host a php website, there are some relatively easy steps to take if you want to make a version of this game yourself.

* You have to make a telegram **game** (talk to [@BotFather](https://t.me/BotFather))
* Clone this project
* Run `composer update` in the root of the project. (Get [composer](https://getcomposer.org/) if you don't have it installed)
* Make a file called *.env* containg the bot token you have gotten when you made the bot from BotFather, plus the name for the bot and game that you chose when making them. Additionally you will need to add the URL where you host the game (something like `https://yourwebsite.xyz/game`).

The .env file should have the following syntax with no spaces before the values:

```
BOT_TOKEN=
BOT_NAME=
GAME_NAME=
GAME_URL=
```
Save this file in the root folder of the project.