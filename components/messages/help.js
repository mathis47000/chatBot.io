import { listBot } from "../../services/botService";

export const Help = () => {
    return `
    <div class="flex flex-col items-center justify-center p-4">
        ${listBot
            .map(
                (bot) => `
        <div class="flex flex-col items-start justify-start p-4 m-2 bg-gray-800 rounded-lg shadow-lg w-full max-w-sm">
            <div class="flex items-center justify-start gap-2 mb-2">
                <img src="${bot.icon}" alt="${bot.name}" class="w-8 h-8 rounded-full object-contain">
                <span class="text-lg font-semibold text-white">${bot.name}</span>
            </div>
            <div class="text-sm text-gray-300">
                Actions: ${bot.action.join(", ")}
            </div>
            <div class="text-sm text-gray-300">
                Sub-actions: ${bot.subAction.join(", ")}
            </div>
            ${bot.query ? `<div class="text-sm text-gray-300">Query: ${bot.query}</div>` : ""}
            <div class="text-sm text-gray-300">
                Example: ${bot.action[0]} ${bot.subAction[0] ? bot.subAction[0] : ""}
                
            </div>
            <div class="text-sm text-gray-300">
                ${bot.query ? 'Example: ' + bot.action[0] + ' [query]' : ""}
            </div>
        </div>
        `,
            )
            .join("")}
    </div>
    `;
};
