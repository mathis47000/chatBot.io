export const cardsMovieDB = (movies) => {
    return `
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    ${movies.map(movie => `
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
            <img class="p-8 rounded-t-lg" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.poster_path}" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${movie.title}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">${movie.popularity}</span>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">${Math.round(movie.vote_average * 10)} %</span>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">${movie.vote_count} votes</span>
            </div>
        </div>
    </div>
    `).join('')}
    </div>
    `;
}