import { listBot } from "../../services/botService";

export const Help = () => {
    console.log(listBot);
    return `
    <div class="flex flex-col items-center justify-center p-4">
        ${listBot.map(bot => `
        <div class="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg">
            <div class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-700">
                <img src="${bot.icon}" alt="${bot.name}" class="w-10 h-10 rounded-full object-contain">
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
                <span class="text-lg font-semibold text-white">${bot.name}</span>
                <div class="flex items-center justify-center gap-2">
                    ${bot.action.map(a => `
                    <div class="flex flex-col items-center justify-center p-2 bg-gray-700 rounded-lg shadow">
                        <span class="text-sm font-semibold text-white">${a}</span>
                        <div class="flex items-center justify-center gap-2">
                            ${bot.subAction.map(s => `
                            <div class="flex items-center justify-center p-2 bg-gray-800 rounded-lg shadow">
                                <span class="text-sm font-normal text-white">${s}</span>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
        `).join('')
        }
    </div>
    `;
}