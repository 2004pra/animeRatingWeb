
document.addEventListener('DOMContentLoaded', function() {
    async function fetchTopAnime() {
        console.log("Fetching top anime...");
        try {
            let response = await fetch("https://api.jikan.moe/v4/top/anime?limit=20");
            let data = await response.json();
            
            const animeList = document.querySelector(".scroll-container"); // Use class instead of ID
            if (!animeList) {
                console.error("Error: .scroll-container not found!");
                return;
            }

            animeList.innerHTML = ""; // Clear previous data
            
            data.data.forEach((anime, index) => {
                console.log("Adding anime:", anime.title, anime.images.jpg.image_url);

                const animeCard = document.createElement("div");
                animeCard.classList.add("anime-card");
                animeCard.innerHTML = `
                    <div class="rank-badge">#${index + 1}</div>
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                    <p class="anime-title">${anime.title}</p>
                `;

                animeList.appendChild(animeCard);
            });

            duplicateScrollContent();
            startAutoScroll();
        } catch (error) {
            console.error("Error fetching anime data:", error);
        }
    }

    function duplicateScrollContent() {
        const animeList = document.querySelector(".scroll-container");
        if (!animeList) return;
        animeList.innerHTML += animeList.innerHTML; // Duplicate content for infinite scrolling
    }

    function startAutoScroll() {
        const animeList = document.querySelector(".scroll-container");
        if (!animeList) return;

        let scrollAmount = 0;

        function scroll() {
            if (scrollAmount >= animeList.scrollWidth / 2) {
                animeList.scrollLeft = 0; // Reset to start when reaching half
                scrollAmount = 0;
            } else {
                animeList.scrollLeft += 5; // Adjust speed if needed
                scrollAmount++;
            }
            requestAnimationFrame(scroll);
        }
        requestAnimationFrame(scroll);
    }
    
    fetchTopAnime();
    document.querySelector(".scroll-link").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior
    
        let targetElement = document.querySelector(".second");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });

    document.getElementById("searchBtn").addEventListener("click", () => {
        const input = document.getElementById("animeInput").value.trim();
        if (input) {
          window.location.href = `search.html?query=${encodeURIComponent(input)}`;
        }
      });
      
      // Optional: allow "Enter" key press
      document.getElementById("animeInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          document.getElementById("searchBtn").click();
        }
      });
      

});

