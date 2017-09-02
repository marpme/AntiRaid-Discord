const Discord = require('discord.js')
const bot = new Discord.Client()
const winston = require('winston')

/**
 * Logger to instanciate a const log file for checking
 * later on.
 */
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'selfbot.log' }),
  ],
})

/**
 * Acknowledge that the bot started.
 */
bot.on('ready', () => {
  console.log('ready to go')
})

bot.on('message', msg => {
  /*
   * all normal users besides selfbots or real bots does have a nonce
   * but since we don't wont to interrupt bots we gonna filter them out
   *
   * Must have: Check for attachments since uploading pictures etc are
   * automated by discord so there will not be a nonce either.
   */
  if (
    msg.nonce === null &&
    msg.attachments.size <= 0 &&
    !msg.author.bot &&
    msg.guild // make sure it's a non-private messages
  ) {
    logger.warn(
      `User (${msg.author.tag}) used a selfbot @ ${msg.channel.name} - ID: ${msg
        .author.id}`
    )
    msg
      .delete()
      .catch(() =>
        logger.log(
          `Bot wasn't able to delete msg from user: ${msg.author.tag}!`
        )
      )
  }
})

bot.login('')
