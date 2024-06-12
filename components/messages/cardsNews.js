export const CardsNews = (news) => {
    return `
    <div class="flex flex-col space-y-4">
        ${news.map(n => `
        <div class="flex flex-col space-y-2">
            <div class="flex items-center space-x-2">
                <span class="text-sm font-semibold text-white">${n.author}</span>
                <span class="text-sm font-normal text-gray-400">${n.publishedAt.replace('T', ' ').replace('Z', '')}</span>
            </div>
            <a href="${n.url}" target="_blank" class="text-lg font-semibold text-white">${n.title}</a>
        </div>
        `).join('')}
    </div>
    `;
}