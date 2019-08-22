import translations from "./translations.json";

export function getMessageTypeTranslation(key, lang, plural) {
    return translations.message_types[key][lang][plural ? "many" : "single"];
}

export function getBotReplyTranslation(key, lang, params) {
    console.log(translations.bot_replies);
    let lines = translations.bot_replies[key] ? translations.bot_replies[key][lang] : undefined;

    if (lines) {
        let text = lines.join("\n");

        let regex = /p\[(\w+)\]/g;

        var matches = Array.from(text.matchAll(regex), x => [x[0], x[1]]);

        matches.forEach(x => {
            text = text.replace(x[0], params[x[1]] || x[0]);
        });

        return text;
    } else {
        return `Missing translation for [en]: ${key}`;
    }
}