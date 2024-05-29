
import { listBot } from "../services/botService";
import { Bot } from "./bot";

export const Header = () => {
    return `
    <div class="flex items-center justify-between p-4 bg-gray-800">
         <span class="text-lg font-semibold text-white">ChatBot.io</span>
            <div class="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                ${listBot.map(bot => Bot(bot)).join('')}
            </div>
         </div>
    </div>
    `;
}