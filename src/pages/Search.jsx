export default function Search() {

    const API_KEY = 'AIzaSyDutAXa_YESM8IfZhYWTJiKp019avOc0iw';
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

    function searchMovies() {
        const searchTerm = document.getElementById('searchTerm').value;

        if (searchTerm.trim() === '') {
            alert('Please enter a search term.');
            return;
        }

        const url = `${BASE_URL}?part=snippet&maxResults=10&q=${searchTerm}&type=video&key=${API_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data.items))
            .catch(error => console.error('Error:', error));
    }

    function displayResults(items) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        if (items.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `
            <h3>${title}</h3>
            <iframe width="600" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;

            resultsContainer.appendChild(resultItem);
        });
    }
    const btnStyle = { background: "gold", color: "black" }
    return (
        <div className="search">
            <h1>YouTube Movie Search</h1>
            <label for="searchTerm">Enter Movie Title:</label>
            <input type="text" id="searchTerm" placeholder="E.g., Inception"></input>
            <button onClick={searchMovies} style={btnStyle}>Search</button>
            <div id="results"></div>
        </div>
    )
}
