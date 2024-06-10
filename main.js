const { Client, GatewayIntentBits } = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
] });

const noPermissionMessage = 'Você não tem permissão para executar esse comando!';
const successMessage = 'Mensagem fixada com sucesso!';
const unpinSuccessMessage = 'Mensagem desafixada com sucesso!';

client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'clear') {
        clear(message, args);
    } else if (command === 'pin') {
        pin(message, args);
    } else if (command === 'unpin') {
        unpin(message, args);
    }
});

async function clear(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply(noPermissionMessage);
    }

    const fetchedMessages = await message.channel.messages.fetch();
    const messagesToDelete = fetchedMessages.filter(msg => !msg.pinned);

    try {
        const deletedMessages = await message.channel.bulkDelete(messagesToDelete);
        const responseMessage = `Foram limpas ${deletedMessages.size} mensagens.`;
        const response = await message.channel.send(responseMessage);
        setTimeout(() => response.delete().catch(console.error), 10000);
    } catch (error) {
        console.error('Erro ao limpar mensagens:', error);
        message.reply('Ocorreu um erro ao tentar limpar mensagens.');
    }
}

async function pin(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply(noPermissionMessage);
    }

    const content = args.join(' ');
    if (!content) {
        return message.reply('Por favor, forneça uma mensagem para fixar.');
    }

    try {
        const pinnedMessage = await message.channel.send(content);
        await pinnedMessage.pin();
        const reply = await message.reply(successMessage);
        setTimeout(() => {
            reply.delete().catch(console.error);
        }, 10000);
    } catch (error) {
        console.error('Erro ao fixar mensagem:', error);
        message.reply('Ocorreu um erro ao tentar fixar a mensagem.');
    }
}

async function unpin(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply(noPermissionMessage);
    }

    const messages = await message.channel.messages.fetchPinned();
    const pinnedMessage = messages.first();

    try {
        if (pinnedMessage) {
            await pinnedMessage.unpin();
            const reply = await message.reply(unpinSuccessMessage);
            setTimeout(() => {
                reply.delete().catch(console.error);
            }, 10000);
        } else {
            message.reply('Não há mensagens fixadas neste canal.');
        }
    } catch (error) {
        console.error('Erro ao desafixar mensagem:', error);
        message.reply('Ocorreu um erro ao tentar desafixar a mensagem.');
    }
}

client.login(token);
