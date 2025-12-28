/**
 * @name Instagram Unfollowers - Versão Profissional
 * @description Um script para identificar usuários do Instagram que não te seguem de volta, com interface moderna e código otimizado.
 * @version 2.0.0
 * @author klayverdev
 */

"use strict";

const config = {
  INSTAGRAM_HOSTNAME: "www.instagram.com",
  API_QUERY_HASH: "3dec7e2c57367ef3da3d987d89f9dbc8",
  SLEEP_TIME_MIN: 1000, // ms
  SLEEP_TIME_RANDOM: 400, // ms
  LONG_SLEEP_TIME: 10000, // ms (10 segundos)
  UNFOLLOW_SLEEP_MIN: 4000, //ms
  UNFOLLOW_SLEEP_RANDOM: 2000, //ms
  UNFOLLOW_LONG_SLEEP: 300000, // 5 minutos em ms
};

const state = {
  nonFollowersList: [],
  userIdsToUnfollow: [],
  isActiveProcess: false,
  includeVerified: true,
};

// UTILITIES
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// API URL GENERATORS
const getApiUrl = (after = null) => {
  const userId = getCookie("ds_user_id");
  let variables = { id: userId, include_reel: true, fetch_mutual: false, first: 24 };
  if (after) {
    variables.after = after;
  }
  return `https://www.instagram.com/graphql/query/?query_hash=${config.API_QUERY_HASH}&variables=${JSON.stringify(variables)}`;
};

const getUnfollowUrl = (userId) => `https://www.instagram.com/web/friendships/${userId}/unfollow/`;

// DOM MANIPULATION
const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`Elemento não encontrado: ${selector}`);
  return element;
};

// DATA HANDLING
const getUserById = (id) => state.nonFollowersList.find(user => user.id.toString() === id.toString());

const copyListToClipboard = async () => {
  const sortedList = [...state.nonFollowersList].sort((a, b) => a.username.localeCompare(b.username));
  const textToCopy = sortedList.map(user => user.username).join("\n");
  try {
    await navigator.clipboard.writeText(textToCopy);
    alert("Lista de não-seguidores copiada para a área de transferência!");
  } catch (err) {
    console.error('Falha ao copiar a lista: ', err);
    alert("Não foi possível copiar a lista.");
  }
};

// UI LOGIC
const onToggleUser = () => {
  getElement(".selected-user-count").innerHTML = `[${state.userIdsToUnfollow.length}]`;
};

const toggleUser = (userId) => {
  const id = parseInt(userId, 10);
  const index = state.userIdsToUnfollow.indexOf(id);
  if (index === -1) {
    state.userIdsToUnfollow.push(id);
  } else {
    state.userIdsToUnfollow.splice(index, 1);
  }
  onToggleUser();
};

const toggleAllUsers = (checked = false) => {
  document.querySelectorAll(".account-checkbox").forEach(checkbox => checkbox.checked = checked);
  state.userIdsToUnfollow = checked ? state.nonFollowersList.map(user => parseInt(user.id, 10)) : [];
  onToggleUser();
};

// RENDER FUNCTIONS
const renderResults = (users) => {
  const sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));
  getElement(".toggle-all-checkbox").disabled = false;
  const resultsContainer = getElement(".results-container");
  resultsContainer.innerHTML = "";
  let lastInitial = "";

  sortedUsers.forEach(user => {
    const userId = parseInt(user.id, 10);
    const isSelected = state.userIdsToUnfollow.includes(userId);
    const initial = user.username.substring(0, 1).toUpperCase();

    if (lastInitial !== initial) {
      lastInitial = initial;
      resultsContainer.innerHTML += `<div class='alphabet-character'>${lastInitial}</div>`;
    }

    resultsContainer.innerHTML += `
      <label class='result-item'>
        <div class='flex align-center grow'>
          <img class='avatar' src='${user.profile_pic_url}' alt='${user.username} avatar' />
          <div class='user-info'>
            <a class='username-link' target='_blank' href='/${user.username}'>${user.username}</a>
            <span class='full-name'>${user.full_name}</span>
          </div>
          ${user.is_verified ? "<div class='verified-badge' title='Conta Verificada'>✔</div>" : ""}
          ${user.is_private ? "<div class='private-indicator' title='Conta Privada'>Privado</div>" : ""}
        </div>
        <input class='account-checkbox' type='checkbox' onchange='toggleUser(${userId})' ${isSelected ? "checked" : ""} />
      </label>`;
  });
};

const renderOverlay = () => {
  document.body.innerHTML = `
    <div class='iu-app'>
      <header class='top-bar'>
        <div class='logo' onclick='location.reload()'>InstagramUnfollowers</div>
        <label>
          <input type='checkbox' class='include-verified-checkbox' ${state.includeVerified ? "checked" : ""} /> Incluir verificados
        </label>
        <button class='copy-list' onclick='copyListToClipboard()' disabled>Copiar Lista</button>
        <button class='unfollow-btn' onclick='unfollow()'>Deixar de Seguir <span class='selected-user-count'>[0]</span></button>
        <input type='checkbox' class='toggle-all-checkbox' onclick='toggleAllUsers(this.checked)' disabled />
      </header>

      <button class='run-scan'>INICIAR</button>
      <div class='results-container'></div>

      <footer class='bottom-bar'>
        <div>Não seguidores: <span class='nonfollower-count'>0</span></div>
        <div class='sleeping-text'></div>
        <div class='progressbar-container'>
          <div class='progressbar-bar'></div>
          <span class='progressbar-text'>0%</span>
        </div>
      </footer>
    </div>`;

  getElement(".run-scan").addEventListener("click", () => runScan());
  getElement(".include-verified-checkbox").addEventListener("change", (e) => state.includeVerified = e.target.checked);
};

// CORE LOGIC
const runScan = async () => {
  if (state.isActiveProcess) return;
  state.isActiveProcess = true;

  getElement(".run-scan").remove();
  getElement(".include-verified-checkbox").disabled = true;

  state.nonFollowersList = await fetchNonFollowers();
  getElement(".copy-list").disabled = false;
  state.isActiveProcess = false;
};

const fetchNonFollowers = async () => {
  let users = [];
  let hasNextPage = true;
  let requestCount = 0;
  let totalFollows = -1;
  let followsProcessed = 0;
  let nextUrl = getApiUrl();

  const progressBar = getElement(".progressbar-bar");
  const progressText = getElement(".progressbar-text");
  const nonFollowerCountEl = getElement(".nonfollower-count");
  const sleepingTextEl = getElement(".sleeping-text");

  while (hasNextPage) {
    let response;
    try {
      response = await fetch(nextUrl).then(res => res.json());
    } catch (error) {
      console.error("Falha na requisição:", error);
      // Tenta novamente após um pequeno atraso
      await sleep(2000);
      continue;
    }

    const { data } = response;
    if (!data || !data.user || !data.user.edge_follow) {
        console.error("Estrutura de resposta inesperada da API.");
        break;
    }

    if (totalFollows === -1) {
      totalFollows = data.user.edge_follow.count;
    }

    hasNextPage = data.user.edge_follow.page_info.has_next_page;
    nextUrl = getApiUrl(data.user.edge_follow.page_info.end_cursor);
    followsProcessed += data.user.edge_follow.edges.length;

    data.user.edge_follow.edges.forEach(edge => {
      // Verifica se o usuário não é verificado OU se a opção de incluir verificados está ativa
      // E se o usuário não segue o visualizador de volta
      if ((!state.includeVerified && edge.node.is_verified) || edge.node.follows_viewer) {
        return;
      }
      users.push(edge.node);
    });

    const percentage = `${Math.min(100, Math.ceil((followsProcessed / totalFollows) * 100))}%`;
    progressText.innerHTML = percentage;
    progressBar.style.width = percentage;
    nonFollowerCountEl.innerHTML = users.length.toString();
    renderResults(users);

    await sleep(config.SLEEP_TIME_MIN + Math.random() * config.SLEEP_TIME_RANDOM);
    requestCount++;

    if (requestCount > 6) {
      requestCount = 0;
      sleepingTextEl.style.display = "block";
      sleepingTextEl.innerHTML = `Pausando por 10s para evitar bloqueios...`;
      await sleep(config.LONG_SLEEP_TIME);
      sleepingTextEl.style.display = "none";
    }
  }

  progressBar.style.backgroundColor = "var(--success-color)";
  progressText.innerHTML = "CONCLUÍDO";
  return users;
};

const unfollow = async () => {
  if (state.isActiveProcess) return;
  if (state.userIdsToUnfollow.length === 0) {
    return alert("Selecione pelo menos um usuário para deixar de seguir.");
  }
  if (!confirm(`Você tem certeza que deseja deixar de seguir ${state.userIdsToUnfollow.length} usuários selecionados?`)) return;

  const csrfToken = getCookie("csrftoken");
  if (!csrfToken) {
    alert("Erro: Token CSRF não encontrado. Tente recarregar a página.");
    throw new Error("Token CSRF não encontrado.");
  }

  const sleepingTextEl = getElement(".sleeping-text");
  const progressBar = getElement(".progressbar-bar");
  const progressText = getElement(".progressbar-text");
  const resultsContainer = getElement(".results-container");

  getElement(".toggle-all-checkbox").disabled = true;
  resultsContainer.innerHTML = "";
  const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

  progressText.innerHTML = "0%";
  progressBar.style.width = "0%";
  state.isActiveProcess = true;
  let unfollowedCount = 0;

  for (const userId of state.userIdsToUnfollow) {
    const user = getUserById(userId);
    if (!user) {
        resultsContainer.innerHTML += `<div class='status-message failed'>Erro: Usuário com ID ${userId} não encontrado na lista.</div>`;
        unfollowedCount++;
        continue;
    }

    try {
      const response = await fetch(getUnfollowUrl(userId), {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "x-csrftoken": csrfToken,
        },
        mode: "cors",
        credentials: "include",
      });

      if (response.ok) {
        resultsContainer.innerHTML += `<div class='status-message unfollowed'>Deixou de seguir <a class='username-link clr-inherit' target='_blank' href='/${user.username}'>${user.username}</a> <span class='clr-primary'>[${unfollowedCount + 1}/${state.userIdsToUnfollow.length}]</span></div>`;
      } else {
        resultsContainer.innerHTML += `<div class='status-message failed'>Falha ao deixar de seguir ${user.username} (Status: ${response.status}) [${unfollowedCount + 1}/${state.userIdsToUnfollow.length}]</div>`;
      }
    } catch (error) {
      console.error(error);
      resultsContainer.innerHTML += `<div class='status-message failed'>Erro de rede ao deixar de seguir ${user.username} [${unfollowedCount + 1}/${state.userIdsToUnfollow.length}]</div>`;
    }

    unfollowedCount++;
    const percentage = `${Math.ceil((unfollowedCount / state.userIdsToUnfollow.length) * 100)}%`;
    progressText.innerHTML = percentage;
    progressBar.style.width = percentage;
    scrollToBottom();

    if (unfollowedCount === state.userIdsToUnfollow.length) break;

    await sleep(config.UNFOLLOW_SLEEP_MIN + Math.random() * config.UNFOLLOW_SLEEP_RANDOM);

    if (unfollowedCount % 5 === 0) {
      sleepingTextEl.style.display = "block";
      sleepingTextEl.innerHTML = "Pausando por 5 minutos para evitar bloqueios...";
      scrollToBottom();
      await sleep(config.UNFOLLOW_LONG_SLEEP);
      sleepingTextEl.style.display = "none";
    }
  }

  progressBar.style.backgroundColor = "var(--success-color)";
  progressText.innerHTML = "CONCLUÍDO";
  state.isActiveProcess = false;
  resultsContainer.innerHTML += "<div class='status-message done'>Processo finalizado!</div>";
  scrollToBottom();
};

// CSS INJECTION
const styleMarkup = `
/*
 * Estilos Modernos para InstagramUnfollowers
 * O objetivo é criar uma interface limpa, profissional e com boa usabilidade (UX).
 */

:root {
  --primary-color: #0095f6; /* Azul do Instagram */
  --secondary-color: #262626; /* Fundo escuro para contraste */
  --text-color: #ffffff;
  --text-secondary: #a8a8a8;
  --success-color: #51bb42;
  --error-color: #ed4956;
  --warning-color: #fbd04b;
  --border-color: #363636;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

html {
  background-color: var(--secondary-color) !important;
}

/* Container Principal da Interface */
.iu-app {
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--secondary-color);
  min-height: 100vh;
  padding-bottom: 10rem; /* Espaço para o footer fixo */
}

/* Barra Superior (Header) */
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  height: 3.5rem;
  background-color: #1c1c1c; /* Um pouco mais escuro que o fundo */
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.logo {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary-color);
  cursor: pointer;
  letter-spacing: 0.5px;
}

/* Botões e Checkboxes */
label {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

input[type='checkbox'] {
  margin-right: 0.5rem;
  height: 1.1rem;
  width: 1.1rem;
  accent-color: var(--primary-color);
}

button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.2s, opacity 0.2s;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.copy-list {
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.copy-list:hover:not(:disabled) {
  background-color: var(--border-color);
}

.unfollow-btn {
  background-color: var(--error-color);
  color: var(--text-color);
  font-size: 1rem;
  margin-left: 1rem;
}

.unfollow-btn:hover:not(:disabled) {
  background-color: #c93745;
}

.selected-user-count {
  font-weight: 700;
  margin-left: 0.25rem;
}

/* Botão RUN */
.run-scan {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  color: var(--text-color);
  background-color: var(--primary-color);
  height: 180px;
  width: 180px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 149, 246, 0.4);
}

.run-scan:hover {
  background-color: #007acc;
}

/* Área de Resultados */
.results-container {
  padding-top: 5.5rem; /* Espaço abaixo do header fixo */
  max-width: 800px;
  margin: 0 auto;
}

.alphabet-character {
  margin: 1.5rem 0 0.5rem;
  padding: 0.5rem 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.1s;
}

.result-item:hover {
  background-color: #2c2c2c;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username-link {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  text-decoration: none;
}

.full-name {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.verified-badge {
  margin-left: 0.5rem;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.private-indicator {
  margin-left: 1rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  border: 1px solid var(--text-secondary);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}

/* Barra Inferior (Footer) */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #1c1c1c;
  border-top: 1px solid var(--border-color);
  font-weight: 500;
  z-index: 1000;
}

.nonfollower-count {
  font-weight: 700;
  color: var(--error-color);
  margin-left: 0.5rem;
}

/* Barra de Progresso */
.progressbar-container {
  width: 150px;
  height: 20px;
  border-radius: 10px;
  position: relative;
  background-color: var(--border-color);
  overflow: hidden;
}

.progressbar-bar {
  width: 0;
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.3s ease-out;
}

.progressbar-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-color);
}

.sleeping-text {
  color: var(--warning-color);
  font-size: 0.9rem;
  margin-right: 1rem;
}

/* Estilos de Mensagens de Status */
.status-message {
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status-message.unfollowed {
  background-color: rgba(81, 187, 66, 0.1);
  color: var(--success-color);
}

.status-message.failed {
  background-color: rgba(237, 73, 86, 0.1);
  color: var(--error-color);
}

.status-message.done {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--success-color);
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-color);
  margin-top: 1rem;
}

/* Classes de Utilidade */
.flex { display: flex; }
.align-center { align-items: center; }
.justify-center { justify-content: center; }
.column { flex-direction: column; }
.grow { flex: 1; }
.w-100 { width: 100%; }
.p-medium { padding: 1rem; }
.clr-inherit { color: inherit; }
.clr-red { color: var(--error-color); }
.clr-green { color: var(--success-color); }
.clr-cyan { color: var(--primary-color); }
.fs-xlarge { font-size: 1.2rem; }
.fs-medium { font-size: 0.9rem; }
.fs-large { font-size: 1.1rem; }
.clr-primary { color: var(--primary-color); }
.clr-success { color: var(--success-color); }
.clr-error { color: var(--error-color); }
.clr-warning { color: var(--warning-color); }
.text-center { text-align: center; }
`;

// INITIALIZATION
const init = () => {
  if (location.hostname !== config.INSTAGRAM_HOSTNAME) {
    return alert("Este script só pode ser usado no site do Instagram.");
  }
  document.title = "Instagram Unfollowers";
  
  // Injetar CSS
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styleMarkup;
  document.head.appendChild(styleElement);
  
  renderOverlay();
};

window.addEventListener("beforeunload", (e) => {
  if (state.isActiveProcess) {
    const confirmationMessage = "Alterações que você fez podem não ser salvas.";
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  }
});

init();
