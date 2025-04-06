// Fetch Anime Data from API

document.addEventListener("DOMContentLoaded", () => {

async function fetchAnime() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/seasons/2023/summer?sfw");
        const data = await response.json();
        displayAnimeList(data.data);
    } catch (error) {
        console.error("Error fetching anime data:", error);
    }
}

// Display Anime List on Left Side
function displayAnimeList(animeList) {
    const animeImage = document.getElementById("anime-image");
    
    const animeContainer = document.getElementById("anime-list");
    animeContainer.innerHTML = "";

    animeList.forEach(anime => {
        let card = document.createElement("div");
        card.classList.add("anime-card");
        card.innerHTML = `
           
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <p>${anime.title}</p>

             
        `;

        // Click event to show details
        card.addEventListener("click", () => showAnimeDetails(anime));
        animeContainer.appendChild(card);
        
        
    });
    
       
    
}

// Show Anime Details on Right Side
function showAnimeDetails(anime) {
    const animeImage = document.getElementById("anime-image");
    animeImage.src = anime.images.jpg.image_url;
    const animeStudio = document.getElementById("std");
    const animeRating = document.getElementById("rat");
    const animeSynopsis = document.getElementById("syn");
    const animeWriter = document.getElementById("wri");
    const animeH2 = document.getElementById("att");
    const animeh1 = document.getElementById("ott");
    const animeGenre = document.getElementById("str");
    const animevideo = document.getElementById("vidi");
     document.getElementById("anime-studio").textContent = anime.studios.length > 0 ? anime.studios[0].name : "Unknown";
     document.getElementById("anime-writer").textContent = anime.producers.length > 0 ? anime.producers.map(p => p.name).join(", ") : "Unknown";
    document.getElementById("anime-rating").textContent = anime.score || "N/A";
    document.getElementById("anime-synopsis").textContent = anime.synopsis || "No synopsis available.";
    document.getElementById("anime-genre").textContent = anime.genres.length > 0 ? anime.genres.map(g => g.name).join(", ") : "Unknown";

    animeImage.style.visibility = "visible";
    animeStudio.style.visibility = "visible";
    animeRating.style.visibility = "visible";
    animeSynopsis.style.visibility = "visible";
    animeWriter.style.visibility = "visible";
    animeGenre.style.visibility = "visible";
    animeH2.style.visibility = "hidden";
    animeh1.textContent = "👥 Bring your crew here too!";
    

    fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/full`)
    .then(res => res.json())
    .then(data => {
        console.log("Trailer response:", data); // Debug trailer

        const trailerId = data.data.trailer?.youtube_id;
        if (trailerId) {
            animevideo.innerHTML = `
                <iframe width="100%" height="315" 
                        src="https://www.youtube.com/embed/${trailerId}" 
                        frameborder="0" allowfullscreen>
                </iframe>
            `;
        } else {
            animevideo.innerHTML = `<p>🎥 Trailer not available.</p>`;
        }
    })
    .catch(err => {
        console.error("Failed to load trailer:", err);
        animevideo.innerHTML = `<p>🎥 Trailer couldn't be loaded.</p>`;
    });



}

fetchAnime();


});