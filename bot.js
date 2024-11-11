const TelegramBot = require('node-telegram-bot-api');
const token = '7995560836:AAHLzfwAP-SwNlMGpZ_44ePurDZwfF4GP3o';
const bot = new TelegramBot(token, { polling: true });
bot.on('polling_error', (error) => {
    console.error('Polling error:', error.code);
    console.error('Polling error description:', error.response.body);
});
let isoffline = true;
const botbody = (id) => {
    bot.sendMessage(id, "What can i do for you?");
}

bot.on('message', (msg) => {
    if (msg.text.toLowerCase().includes('@rank_889') && isoffline) {
        const id = msg.chat.id;
        const messageId = msg.message_id;
        const targetChatId = '1661641301';
        bot.forwardMessage(targetChatId, id, messageId)
       .then(() => {
           bot.sendMessage(id, "He is offline i sent your message to him..");
       }).catch((err)=>{
        console.log(err);
        
       })
    }
    else {
        return;
    }
});
bot.onText(/\/start/, (msg) => {
    const id = msg.chat.id;
    if (Number(msg.from.id) == 1661641301) {
        botbody(id);
    }
    else {
        bot.sendMessage(id, "Hy,\nI am assistent of Aman Ali\nI will talk only with him\nGet lost!!")
        return;
    }
});

bot.onText(/\/change_status/, (msg) => {
    id = msg.chat.id;
    if (Number(msg.from.id) == 1661641301) {
        if (isoffline) {
            isoffline = false
            bot.sendMessage(id, "Status is changed to online");
        }
        else {
            isoffline = true
            bot.sendMessage(id, "Status is changed to offline");
        }
    }
    else {
        return;
    }
})

console.log("bot is running...");
