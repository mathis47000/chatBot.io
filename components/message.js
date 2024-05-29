import { getBotFromName } from "../services/botService";

export const Message = (message) => {
    return `
    <div class="flex items-start gap-2.5" dir="${message.author == 'me' ? 'rtl' : ''}">
    <img class="w-8 h-8 rounded-full" src="${message.author != 'me' ? getBotFromName(message.author).icon : ''}" alt="icon">
    <div class="flex flex-col gap-1 w-full max-w-[320px]">
    <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-white">${message.author}</span>
        <span class="text-sm font-normal text-gray-400">${message.time}</span>
    </div>
    <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl bg-gray-700">
        <p class="text-sm font-normal text-white">${message.content}</p>
    </div>
    <span class="text-sm font-normal text-gray-400">${message.status}</span>
    </div>
    </div>
    `;
}