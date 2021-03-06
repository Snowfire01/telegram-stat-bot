// Import external packages
import request from "request-promise";

// Import internal packages
import TextMessage from "../messages/textMessage";

export default async function total_messages(message, stat_bot) {
    let chat = message.chat.id;
    let log = ["/total_messages"];

    try {
        let response = await request({
            uri: `http://localhost:${stat_bot.backend_port}/messages/total/${chat}`,
            json: true
        });

        let total_messages = response.result;

        log.push(total_messages);
        stat_bot.log(log);

        let reply = new TextMessage(stat_bot.bot, chat, "de", "Markdown");

        reply.addLineTranslated("total_messages", { total_messages: total_messages });

        reply.send();

    } catch (err) {
        console.log(err);
    }
}