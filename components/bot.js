export const Bot = (bot) => {
    return `
    <div class="relative">
        <div data-tooltip-target="tooltip-bottom-${bot.name}" data-tooltip-placement="bottom" class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-700">
            <img src="${bot.icon}" alt="${bot.name}" class="w-10 h-10 rounded-full object-contain">
        </div>
        <div id="tooltip-bottom-${bot.name}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip bg-gray-700">
            ${bot.name}
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
    `;
}