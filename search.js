async function getQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("query");
  }
  
  async function fetchAnime(query) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        return data.data[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error fetching anime:", err);
      return null;
    }
  }
  
  async function renderResult() {
    const container = document.getElementById("resultContainer");
    const query = await getQueryParam();
  
    if (!query) {
      container.innerHTML = `<div class="not-found">No anime searched.</div>`;
      return;
    }
  
    const anime = await fetchAnime(query);
  
    if (anime) {
      container.innerHTML = `
        <div class="anime-card">
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
          <div class="anime-details">
            <div class="anime-title">${anime.title}</div>
            <p><strong>Type:</strong> ${anime.type}</p>
            <p><strong>Genres:</strong> ${anime.genres.map(g => g.name).join(", ")}</p>
            <p><strong>Episodes:</strong> ${anime.episodes ?? "N/A"}</p>
            <p><strong>Aired:</strong> ${anime.aired.string}</p>
            <p><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
            <p style="margin-top: 10px;">${anime.synopsis}</p>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `<div class="not-found">Anime Not Found 😔</div>`;
    }
  }
  
  renderResult();
  