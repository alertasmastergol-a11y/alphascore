const API_KEY = "f23b74e641msh140cebc05180438p19a0b2jsn66...";
const API_HOST = "api-football-v1.p.rapidapi.com";

async function carregarJogos() {
  const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST
      }
    });

    const data = await response.json();

    const container = document.getElementById("jogos");
    container.innerHTML = "";

    if (!data.response || data.response.length === 0) {
      container.innerHTML = "Nenhum jogo ao vivo agora.";
      return;
    }

    data.response.forEach(jogo => {
      const home = jogo.teams.home.name;
      const away = jogo.teams.away.name;
      const score = `${jogo.goals.home} x ${jogo.goals.away}`;

      const div = document.createElement("div");
      div.innerHTML = `<p>${home} vs ${away} - ${score}</p>`;
      container.appendChild(div);
    });

  } catch (error) {
    document.getElementById("jogos").innerText =
      "Erro ao carregar jogos. Verifique sua API Key.";
  }
}
