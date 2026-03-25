JS
 const API_KEY = "f23b74e641msh140cebc05180438p19a0b2jsn66...";

async function loadMatches() {
  const container = document.getElementById("matches");
  container.innerHTML = "Carregando...";

  try {
    const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    });

    const data = await response.json();
    container.innerHTML = "";

    if (!data.response || data.response.length === 0) {
      container.innerHTML = "Nenhum jogo ao vivo agora.";
      return;
    }

    data.response.forEach((game, index) => {
      const home = game.teams.home.name;
      const away = game.teams.away.name;
      const homeLogo = game.teams.home.logo;
      const awayLogo = game.teams.away.logo;
      const scoreHome = game.goals.home ?? 0;
      const scoreAway = game.goals.away ?? 0;
      const status = game.fixture.status.short;

      const div = document.createElement("div");
      div.className = "match";

      div.innerHTML = `
        <div class="topbar">
          <span class="badge">${index < 3 ? "TOP" : "AO VIVO"}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="${homeLogo}" alt="${home}" width="24" height="24">
            <span>${home}</span>
          </div>
          <strong>vs</strong>
          <div style="display:flex; align-items:center; gap:8px;">
            <span>${away}</span>
            <img src="${awayLogo}" alt="${away}" width="24" height="24">
          </div>
        </div>
        <div class="score">${scoreHome} - ${scoreAway}</div>
        <div class="status">${status}</div>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    container.innerHTML = "Erro ao carregar jogos. Verifique sua API Key.";
  }
}

loadMatches();
setInterval(loadMatches, 30000);
