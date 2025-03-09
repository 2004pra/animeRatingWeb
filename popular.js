// Fetch Anime Data from API

document.addEventListener("DOMContentLoaded", () => {

async function fetchAnime() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/seasons/2024/fall?sfw");
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
     document.getElementById("anime-studio").textContent = anime.studios.length > 0 ? anime.studios[0].name : "Unknown";
    document.getElementById("anime-writer").textContent = anime.authors ? anime.authors.map(a => a.name).join(", ") : "Unknown";
    document.getElementById("anime-rating").textContent = anime.score || "N/A";
    document.getElementById("anime-synopsis").textContent = anime.synopsis || "No synopsis available.";
    animeImage.style.visibility = "visible";
    animeStudio.style.visibility = "visible";
    animeRating.style.visibility = "visible";
    animeSynopsis.style.visibility = "visible";
    animeWriter.style.visibility = "visible";
    animeH2.style.visibility = "hidden";
    animeh1.textContent = "Read Thouroughly";
    

}

fetchAnime();


});