export const Input = () => {
    return `
    <div class="flex items-center justify-between p-4 bg-gray-800">
        <input type="text" id="input-send" class="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-lg bg-gray-700 text-white border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600" placeholder="Type a message...">
        <button id="send" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer text-blue-500 hover:bg-gray-600">
            <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
            <span class="sr-only">Send message</span>
        </button>
    </div>
    `;
}