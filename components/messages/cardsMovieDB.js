export const cardsMovieDB = (movies) => {
    return `<div class="grid grid-cols-1 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
    ${movies.map(movie => `
    <div class="relative rounded-lg shadow aspect-square overflow-hidden group">
        <img class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-20" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.poster_path}" />
        <div class="absolute inset-0 bg-gray-900 bg-opacity-75 text-white flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div>
                <p class="text-xs">${movie.name ? movie.name : movie.title}</p>
                <p class="text-xs">${Math.round(movie.vote_average * 10)} %</p>
                <p class="text-xs">${movie.vote_count} votes</p>
            </div>
        </div>
    </div>
    `).join('')}
    </div>
    `;
}