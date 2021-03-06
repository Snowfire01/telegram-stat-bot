// Import external packages
import request from "request-promise";

// Import internal packages
import TextMessage from "../messages/textMessage";

export default async function consent(message, consent_level, stat_bot) {
    let chat = message.chat.id;

    try {
        let response = await request({
            method: "PUT",
            uri: `http://localhost:${stat_bot.backend_port}/users`,
            json: true,
            body: {
                ...message.from,
                data_collection_consent: consent_level
            },
            contentType: "application/json"
        });

        let reply = new TextMessage(stat_bot.bot, chat, "de", "Markdown");

        reply.addLineTranslated("confirm_consent_update", {
            user_name: stat_bot.get_user_address(message.from),
            previous_value: response.result.data_collection_consent,
            new_value: consent_level
        });

        reply.send();
    } catch (error) {
        console.error(error.message);

        if (error.statusCode === 422) {
            let reply = new TextMessage(stat_bot.bot, chat, "de", "Markdown");

            reply.addLineTranslated("invalid_consent_update");

            reply.send();
        }
    }
}