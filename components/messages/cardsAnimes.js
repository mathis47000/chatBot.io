export const cardsAnimes = (animes) => {
    return `
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
    ${animes.map(anime => `
    <div class="relative rounded-lg shadow aspect-square overflow-hidden group">
        <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
            #${anime.rank}
        </div>
        <img class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-20" src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        <div class="absolute inset-0 bg-gray-900 bg-opacity-75 text-white flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div>
                <p class="text-xs">${anime.title}</p>
                <p class="text-xs">⭐${anime.score}</p>
                <p class="text-xs">${anime.members} members</p>
            </div>
        </div>
    </div>
    `).join('')}
    </div>
    `;
}
