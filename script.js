const STORAGE_KEY = "israel-clicker-save";
const RANDOM_EVENT_INTERVAL = {
  min: 5 * 60 * 1000,
  max: 10 * 60 * 1000
};
const MAX_CLICKS_PER_SECOND = 25;

/*
  Add new upgrades here.

  Copy one object, give it a unique id, then change:
  - name: the shop title
  - description: the shop text
  - baseCost: the starting price
  - costMultiplier: how fast the price grows after each buy
  - clickBonus: extra shekels per click per level
  - perSecondBonus: extra shekels per second per level
*/
const UPGRADE_DEFINITIONS = [
  {
    id: "TelAviv",
    name: "Recruit Somebody From Tel Aviv",
    description: "Recruit one person off of the streets of Tel Aviv.",
    baseCost: 25,
    costMultiplier: 1.42,
    clickBonus: 1,
    perSecondBonus: 0
  },
  {
    id: "Jerusalem",
    name: "Recurit Somebody From Jerusalem",
    description: "Recruit one person from Jerusalem to help.",
    baseCost: 75,
    costMultiplier: 1.46,
    clickBonus: 0,
    perSecondBonus: 2
  },
  {
    id: "TwitterSpamBot",
    name: "Twitter Spam Bots",
    description: "Get bots to spam pro-Israeli propaganda.",
    baseCost: 600,
    costMultiplier: 1.55,
    clickBonus: 0,
    perSecondBonus: 10
  },
  {
    id: "SocialMediaSpamBot",
    name: "Spam Bots Across Social Media",
    description: "Bots spread across all of social media.",
    baseCost: 900,
    costMultiplier: 1.56,
    clickBonus: 5,
    perSecondBonus: 0
  },
  {
    id: "idfSoldier",
    name: "Recruit One IDF Soldier",
    description: "Recruit one IDF Soldier off of the streets of Israel.",
    baseCost: 5000,
    costMultiplier: 1.62,
    clickBonus: 15,
    perSecondBonus: 50
  },
  {
    id: "BankHacker",
    name: "Recruit A Tel Aviv Bank Hacker",
    description: "Hack all oppositions bank account via recruited hackers in Tel Aviv. ",
    baseCost: 18000,
    costMultiplier: 1.67,
    clickBonus: 0,
    perSecondBonus: 150
  },
  {
    id: "BankHackers",
    name: "Recruit A Group Tel Aviv Bank Hackers",
    description: "Hack all oppositions bank account via recruited groups of hackers in Tel Aviv. ",
    baseCost: 50000,
    costMultiplier: 1.72,
    clickBonus: 0,
    perSecondBonus: 850
  },
  {
    id: "WarPalestine",
    name: "Bombs For Palestine",
    description: "Bomb Palestine for absolutely no reason just to test out some weapons.",
    baseCost: 80000,
    costMultiplier: 1.75,
    clickBonus: 150,
    perSecondBonus: 0
  },
  {
    id: "WarLebanon",
    name: "Bomb Hezbollah",
    description: "Bomb Hezbollah for the random missile attacks they always do on Israel.",
    baseCost: 125000,
    costMultiplier: 1.78,
    clickBonus: 300,
    perSecondBonus: 0
  },
  {
    id: "AIPAC",
    name: "Have AIPAC Buy US Congressional Seats",
    description: "AIPAC will buy Israel is the US Congress. Ensures Israel gets whatever they want.",
    baseCost: 220000,
    costMultiplier: 1.82,
    clickBonus: 500,
    perSecondBonus: 2500
  },
  {
    id: "DonTrump",
    name: "Have Trump Fight A War For You",
    description: "Trump will willingly fight a war for you in Iran, no questions asked. Must stop them from using enriched uranium that doesn't exist.",
    baseCost: 480000,
    costMultiplier: 1.86,
    clickBonus: 850,
    perSecondBonus: 5000
  },
  {
    id: "UnitedStatesOfIsrael",
    name: "Make the United States Israel's Puppet",
    description: "You now have power of the strongest military on Earth.",
    baseCost: 900000,
    costMultiplier: 1.90,
    clickBonus: 1000,
    perSecondBonus: 10000
  },
  {
    id: "Yahu",
    name: "Blessing By Benjamin Netenyahu",
    description: "You have gotten the most powerful, most uplifting, most inspiring blessing from Benjamin Netanyahu.",
    baseCost: 1250000,
    costMultiplier: 1.99,
    clickBonus: 5000,
    perSecondBonus: 50000
  },
  {
    id: "Yahu2",
    name: "Benjamin Netanyahu Endorsement",
    description: "You have gotten the official endoresment from the one and only Benjamin Netanyahu.",
    baseCost: 1500000,
    costMultiplier: 1.99,
    clickBonus: 7000,
    perSecondBonus: 75000
  },
];

/*
  Add or change random events here.

  effect can be:
  - "instantPercent": immediately adds/removes a percent of current shekels
  - "temporaryMultiplier": changes all income for durationSeconds

  Positive shekelPercent gives money. Negative shekelPercent removes money.
  incomeMultiplier above 1 boosts income. Below 1 lowers income.
*/
const RANDOM_EVENT_DEFINITIONS = [
  {
    id: "HackingGold",
    type: "positive",
    name: "Hacked Billionare",
    description: "Your hackers have successfully hacked a billionare's bank account. Your amount of Shekels has increased by 18%.",
    effect: "instantPercent",
    shekelPercent: 0.18
  },
  {
    id: "BotSuccess",
    type: "positive",
    name: "Bots Spread More Pro-Israeli Propaganda Than Usual",
    description: "Your spam bots have been incredibly effective and have spread more propaganda than ever. Income is doubled for 90 seconds.",
    effect: "temporaryMultiplier",
    incomeMultiplier: 2,
    durationSeconds: 90
  },
  {
    id: "IDFfinding",
    type: "positive",
    name: "IDF and MOSSAD finds enemy secerets.",
    description: "The IDF and MOSSAD finds enemy secerets. Instant 25% Shekel boost.",
    effect: "instantPercent",
    shekelPercent: 0.25
  },
  {
    id: "HackingSpree",
    type: "positive",
    name: "Hacking Spree",
    description: "Your hackers keep on hitting the jackpot. Income is boosted by 60% for 2 minutes.",
    effect: "temporaryMultiplier",
    incomeMultiplier: 1.6,
    durationSeconds: 120
  },
  {
    id: "ScamAThon",
    type: "positive",
    name: "Scam-A-Thon Success",
    description: "You scam many people into giving Israel money. Gain 12% more Shekels than you currently have.",
    effect: "instantPercent",
    shekelPercent: 0.12
  },
  {
    id: "HezbollahMissile",
    type: "negative",
    name: "Hezbollah Missile gets through Iron Dome",
    description: "Iron Dome doesn't stop a Hezbollan missile. You lose 15% of your current Shekels.",
    effect: "instantPercent",
    shekelPercent: -0.15
  },
  {
    id: "BotBan",
    type: "negative",
    name: "Bots Get Banned",
    description: "All of your spam bots get banned by moderation. Income drops by 15% for 90 seconds.",
    effect: "temporaryMultiplier",
    incomeMultiplier: 0.75,
    durationSeconds: 90
  },
  {
    id: "AIPAC Loss",
    type: "negative",
    name: "AIPAC Canidate Loses Election",
    description: "Your AIPAC Canidate loses the primary election. You lose 20% of your current Shekels.",
    effect: "instantPercent",
    shekelPercent: -0.2
  },
  {
    id: "DroneAttacks",
    type: "negative",
    name: "Constant Iranian Drone Attacks",
    description: "Constant Iranian drone attacks wastes money on defending against them. Income is cut by 30% for 2 minutes.",
    effect: "temporaryMultiplier",
    incomeMultiplier: 0.7,
    durationSeconds: 120
  },
  {
    id: "Corruption",
    type: "negative",
    name: "Corruption Allegation Come Up",
    description: "Corruption allegations come up against you, and there is no evidence to defend yourself with. You lose 65% of your current Shekels.",
    effect: "instantPercent",
    shekelPercent: -0.65
  }
];

const baseState = {
  shekels: 0,
  upgradeLevels: createEmptyUpgradeLevels(),
  activeRandomEvents: [],
  lastRandomEvent: null,
  pendingRandomEvent: null,
  rebirths: 0,
  totalEarned: 0,
  darkMode: false
};

const elements = {
  shekelCount: document.querySelector("#shekelCount"),
  perClickValue: document.querySelector("#perClickValue"),
  perSecondValue: document.querySelector("#perSecondValue"),
  rebirthCount: document.querySelector("#rebirthCount"),
  multiplierValue: document.querySelector("#multiplierValue"),
  eventPanel: document.querySelector("#eventPanel"),
  eventName: document.querySelector("#eventName"),
  eventDescription: document.querySelector("#eventDescription"),
  activeEvents: document.querySelector("#activeEvents"),
  upgradeList: document.querySelector("#upgradeList"),
  shopButton: document.querySelector("#shopButton"),
  closeShopButton: document.querySelector("#closeShopButton"),
  shopOverlay: document.querySelector("#shopOverlay"),
  shopShekelCount: document.querySelector("#shopShekelCount"),
  shopClickCap: document.querySelector("#shopClickCap"),
  shopPerSecondValue: document.querySelector("#shopPerSecondValue"),
  eventOverlay: document.querySelector("#eventOverlay"),
  eventAlertTitle: document.querySelector("#eventAlertTitle"),
  eventAlertName: document.querySelector("#eventAlertName"),
  eventAlertDescription: document.querySelector("#eventAlertDescription"),
  acknowledgeEventButton: document.querySelector("#acknowledgeEventButton"),
  currentRebirthMultiplier: document.querySelector("#currentRebirthMultiplier"),
  nextRebirthMultiplier: document.querySelector("#nextRebirthMultiplier"),
  rebirthCost: document.querySelector("#rebirthCost"),
  rebirthButton: document.querySelector("#rebirthButton"),
  resetButton: document.querySelector("#resetButton"),
  darkModeButton: document.querySelector("#darkModeButton"),
  flagButton: document.querySelector("#flagButton"),
  floatLayer: document.querySelector("#floatLayer")
};

const upgradeElements = {};
let state = loadGame();
let randomEventTimer = null;
let lastManualClickAt = 0;
let shopCloseTimer = null;

renderUpgradeShop();
applyTheme();
updateScreen();
syncPendingEventOverlay();

if (!state.pendingRandomEvent) {
  scheduleRandomEvent();
}

function createEmptyUpgradeLevels() {
  return UPGRADE_DEFINITIONS.reduce((levels, upgrade) => {
    levels[upgrade.id] = 0;
    return levels;
  }, {});
}

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const loaded = { ...baseState, ...saved };
    const savedLevels = saved?.upgradeLevels || {};
    const legacyUpgradeIds = ["strongerClicks", "shekelStand", "idfSoldiers", "lobbyUsGovernment"];
    const legacyLevelKeys = ["clickLevel", "autoLevel", "soldierLevel", "lobbyLevel"];

    loaded.upgradeLevels = {
      ...createEmptyUpgradeLevels(),
      ...savedLevels,
      strongerClicks: savedLevels.strongerClicks ?? saved?.clickLevel ?? 0,
      shekelStand: savedLevels.shekelStand ?? saved?.autoLevel ?? 0,
      idfSoldiers: savedLevels.idfSoldiers ?? saved?.soldierLevel ?? 0,
      lobbyUsGovernment: savedLevels.lobbyUsGovernment ?? saved?.lobbyLevel ?? 0
    };

    UPGRADE_DEFINITIONS.forEach((upgrade, index) => {
      const legacyLevel = savedLevels[legacyUpgradeIds[index]] ?? saved?.[legacyLevelKeys[index]];

      if (savedLevels[upgrade.id] === undefined && legacyLevel > 0) {
        loaded.upgradeLevels[upgrade.id] = legacyLevel;
      }
    });

    loaded.activeRandomEvents = Array.isArray(saved?.activeRandomEvents) ? saved.activeRandomEvents : [];
    loaded.lastRandomEvent = saved?.lastRandomEvent || null;
    loaded.pendingRandomEvent = saved?.pendingRandomEvent || null;

    if (loaded.pendingRandomEvent) {
      pauseActiveEventTimersSinceLastSave(loaded);
    } else {
      loaded.activeRandomEvents = loaded.activeRandomEvents.filter((event) => event.expiresAt > Date.now());
    }

    return loaded;
  } catch {
    return {
      ...baseState,
      upgradeLevels: createEmptyUpgradeLevels(),
      activeRandomEvents: [],
      lastRandomEvent: null,
      pendingRandomEvent: null
    };
  }
}

function saveGame() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function multiplier() {
  return 1 + state.rebirths * 0.5;
}

function incomeMultiplier() {
  const randomEventMultiplier = state.activeRandomEvents.reduce((total, event) => {
    return total * event.incomeMultiplier;
  }, 1);

  return multiplier() * randomEventMultiplier;
}

function getUpgradeLevel(upgradeId) {
  return state.upgradeLevels[upgradeId] || 0;
}

function perClick() {
  const baseClick = 1;
  const upgradeBonus = UPGRADE_DEFINITIONS.reduce((total, upgrade) => {
    return total + getUpgradeLevel(upgrade.id) * upgrade.clickBonus;
  }, 0);

  return Math.max(1, Math.floor((baseClick + upgradeBonus) * incomeMultiplier()));
}

function perSecond() {
  const upgradeBonus = UPGRADE_DEFINITIONS.reduce((total, upgrade) => {
    return total + getUpgradeLevel(upgrade.id) * upgrade.perSecondBonus;
  }, 0);

  return Math.floor(upgradeBonus * incomeMultiplier());
}

function upgradeCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, getUpgradeLevel(upgrade.id)));
}

function firstRebirthCost() {
  if (UPGRADE_DEFINITIONS.length === 0) {
    return 10000;
  }

  const highestUpgradeCost = Math.max(...UPGRADE_DEFINITIONS.map((upgrade) => upgrade.baseCost));
  return Math.max(10000, Math.floor(highestUpgradeCost * 1.5));
}

function rebirthCost() {
  return Math.floor(firstRebirthCost() * Math.pow(2.15, state.rebirths));
}

function formatNumber(value) {
  if (value < 1000000) {
    return Math.floor(value).toLocaleString();
  }

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2
  }).format(value);
}

function renderUpgradeShop() {
  elements.upgradeList.innerHTML = "";

  UPGRADE_DEFINITIONS.forEach((upgrade) => {
    const card = document.createElement("article");
    const info = document.createElement("div");
    const name = document.createElement("h3");
    const description = document.createElement("p");
    const effect = document.createElement("span");
    const owned = document.createElement("span");
    const button = document.createElement("button");
    const cost = document.createElement("span");

    card.className = "upgrade-card";
    effect.className = "upgrade-effect";
    owned.className = "owned";
    button.className = "buy-button";
    button.type = "button";

    name.textContent = upgrade.name;
    description.textContent = upgrade.description;
    effect.textContent = effectText(upgrade);
    button.append("Buy ", cost);

    info.append(name, description, effect, owned);
    card.append(info, button);
    elements.upgradeList.appendChild(card);

    button.addEventListener("click", () => buyUpgrade(upgrade.id));
    card.addEventListener("animationend", () => card.classList.remove("upgrade-bought"));
    upgradeElements[upgrade.id] = { card, owned, button, cost };
  });
}

function effectText(upgrade) {
  const effects = [];

  if (upgrade.clickBonus > 0) {
    effects.push(`+${formatNumber(upgrade.clickBonus)} per click`);
  }

  if (upgrade.perSecondBonus > 0) {
    effects.push(`+${formatNumber(upgrade.perSecondBonus)} per second`);
  }

  return effects.join(" and ");
}

function addShekels(amount) {
  state.shekels += amount;
  state.totalEarned += amount;
  updateScreen();
  animateScoreChange();
  saveGame();
}

function canRegisterManualClick() {
  const now = Date.now();

  if (now - lastManualClickAt < 1000 / MAX_CLICKS_PER_SECOND) {
    return false;
  }

  lastManualClickAt = now;
  return true;
}

function registerManualClick(event) {
  if (state.pendingRandomEvent || !canRegisterManualClick()) {
    return;
  }

  const amount = perClick();
  addShekels(amount);
  showFloatText(amount, event);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scheduleRandomEvent() {
  window.clearTimeout(randomEventTimer);
  randomEventTimer = window.setTimeout(() => {
    triggerRandomEvent();
  }, randomBetween(RANDOM_EVENT_INTERVAL.min, RANDOM_EVENT_INTERVAL.max));
}

function triggerRandomEvent() {
  if (RANDOM_EVENT_DEFINITIONS.length === 0 || state.pendingRandomEvent) {
    return;
  }

  const event = RANDOM_EVENT_DEFINITIONS[randomBetween(0, RANDOM_EVENT_DEFINITIONS.length - 1)];
  state.pendingRandomEvent = {
    id: event.id,
    type: event.type,
    name: event.name,
    description: event.description,
    effect: event.effect,
    shekelPercent: event.shekelPercent,
    incomeMultiplier: event.incomeMultiplier,
    durationSeconds: event.durationSeconds,
    startedAt: Date.now(),
    lastPausedAt: Date.now()
  };

  syncPendingEventOverlay();
  updateScreen();
  saveGame();
}

function applyRandomEvent(event) {
  if (event.effect === "instantPercent") {
    const amount = Math.floor(state.shekels * event.shekelPercent);
    state.shekels = Math.max(0, state.shekels + amount);

    if (amount > 0) {
      state.totalEarned += amount;
    }

    return `${event.description} (${amount >= 0 ? "+" : ""}${formatNumber(amount)} shekels)`;
  }

  if (event.effect === "temporaryMultiplier") {
    const durationSeconds = event.durationSeconds || 60;

    state.activeRandomEvents.push({
      id: `${event.id}-${Date.now()}`,
      type: event.type,
      name: event.name,
      description: event.description,
      incomeMultiplier: event.incomeMultiplier,
      expiresAt: Date.now() + durationSeconds * 1000
    });

    return `${event.description} (${durationSeconds}s)`;
  }

  return event.description;
}

function removeExpiredRandomEvents() {
  const activeEvents = state.activeRandomEvents.filter((event) => event.expiresAt > Date.now());
  const removedAnyEvents = activeEvents.length !== state.activeRandomEvents.length;
  state.activeRandomEvents = activeEvents;
  return removedAnyEvents;
}

function pauseActiveEventTimersSinceLastSave(targetState = state) {
  if (!targetState.pendingRandomEvent) {
    return;
  }

  const now = Date.now();
  const lastPausedAt = targetState.pendingRandomEvent.lastPausedAt || targetState.pendingRandomEvent.startedAt || now;
  const pausedMilliseconds = Math.max(0, now - lastPausedAt);

  targetState.activeRandomEvents.forEach((event) => {
    event.expiresAt += pausedMilliseconds;
  });

  targetState.pendingRandomEvent.lastPausedAt = now;
}

function buyUpgrade(upgradeId) {
  const upgrade = UPGRADE_DEFINITIONS.find((item) => item.id === upgradeId);

  if (!upgrade) {
    return;
  }

  const cost = upgradeCost(upgrade);

  if (state.shekels < cost) {
    return;
  }

  state.shekels -= cost;
  state.upgradeLevels[upgrade.id] = getUpgradeLevel(upgrade.id) + 1;
  upgradeElements[upgrade.id]?.card.classList.add("upgrade-bought");

  updateScreen();
  saveGame();
}

function rebirth() {
  const cost = rebirthCost();
  if (state.shekels < cost) {
    return;
  }

  const darkMode = state.darkMode;

  state = {
    ...baseState,
    upgradeLevels: createEmptyUpgradeLevels(),
    activeRandomEvents: [],
    lastRandomEvent: null,
    rebirths: state.rebirths + 1,
    totalEarned: state.totalEarned,
    darkMode
  };

  applyTheme();
  updateScreen();
  saveGame();
}

function resetGame() {
  const darkMode = state.darkMode;

  state = {
    ...baseState,
    upgradeLevels: createEmptyUpgradeLevels(),
    activeRandomEvents: [],
    lastRandomEvent: null,
    darkMode
  };
  applyTheme();
  updateScreen();
  saveGame();
}

function openShop() {
  window.clearTimeout(shopCloseTimer);
  elements.shopOverlay.hidden = false;
  elements.shopOverlay.setAttribute("aria-hidden", "false");
  elements.shopOverlay.classList.remove("is-closing");
  document.body.classList.add("shop-open");
  elements.closeShopButton.focus();
}

function closeShop() {
  if (elements.shopOverlay.hidden || elements.shopOverlay.classList.contains("is-closing")) {
    return;
  }

  elements.shopOverlay.setAttribute("aria-hidden", "true");
  elements.shopOverlay.classList.add("is-closing");
  document.body.classList.remove("shop-open");

  shopCloseTimer = window.setTimeout(() => {
    elements.shopOverlay.hidden = true;
    elements.shopOverlay.classList.remove("is-closing");
    elements.shopButton.focus();
  }, 220);
}

function syncPendingEventOverlay() {
  const pendingEvent = state.pendingRandomEvent;

  if (!pendingEvent) {
    elements.eventOverlay.hidden = true;
    elements.eventOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("event-open");
    return;
  }

  elements.eventAlertTitle.textContent = "BREAKING NEWS";
  elements.eventAlertName.textContent = pendingEvent.name;
  elements.eventAlertDescription.textContent = pendingEvent.description;
  elements.eventOverlay.hidden = false;
  elements.eventOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("event-open");
  elements.acknowledgeEventButton.focus();
}

function acknowledgePendingEvent() {
  const pendingEvent = state.pendingRandomEvent;

  if (!pendingEvent) {
    return;
  }

  pauseActiveEventTimersSinceLastSave();
  applyRandomEvent(pendingEvent);
  state.pendingRandomEvent = null;
  syncPendingEventOverlay();
  updateScreen();
  saveGame();
  scheduleRandomEvent();
}

function showFloatText(amount, event) {
  const bounds = elements.floatLayer.getBoundingClientRect();
  const floating = document.createElement("span");
  const x = event?.clientX ?? bounds.width / 2;
  const y = event?.clientY ?? bounds.height / 2;

  floating.className = "float-text";
  floating.textContent = `+${formatNumber(amount)}`;
  floating.style.left = `${x - bounds.left}px`;
  floating.style.top = `${y - bounds.top}px`;
  elements.floatLayer.appendChild(floating);
  floating.addEventListener("animationend", () => floating.remove());
}

function animateScoreChange() {
  elements.shekelCount.classList.remove("score-bump");
  void elements.shekelCount.offsetWidth;
  elements.shekelCount.classList.add("score-bump");
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", state.darkMode);
  elements.darkModeButton.textContent = state.darkMode ? "Light" : "Dark";
  elements.darkModeButton.setAttribute("aria-pressed", String(state.darkMode));
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  applyTheme();
  saveGame();
}

function updateScreen() {
  if (!state.pendingRandomEvent) {
    removeExpiredRandomEvents();
  }

  const nextRebirthCost = rebirthCost();
  const currentShekels = formatNumber(state.shekels);
  const currentPerSecond = formatNumber(perSecond());

  elements.shekelCount.textContent = currentShekels;
  elements.perClickValue.textContent = formatNumber(perClick());
  elements.perSecondValue.textContent = currentPerSecond;
  elements.shopShekelCount.textContent = currentShekels;
  elements.shopClickCap.textContent = formatNumber(MAX_CLICKS_PER_SECOND);
  elements.shopPerSecondValue.textContent = currentPerSecond;
  elements.rebirthCount.textContent = formatNumber(state.rebirths);
  elements.multiplierValue.textContent = `${incomeMultiplier().toFixed(2)}x`;
  elements.currentRebirthMultiplier.textContent = `${multiplier().toFixed(1)}x`;
  elements.nextRebirthMultiplier.textContent = `${(multiplier() + 0.5).toFixed(1)}x`;
  elements.rebirthCost.textContent = formatNumber(nextRebirthCost);
  elements.rebirthButton.disabled = state.shekels < nextRebirthCost;
  const activeEventType = state.activeRandomEvents.some((event) => event.type === "negative") ? "negative" : state.activeRandomEvents[0]?.type || "";
  elements.eventPanel.className = `event-panel ${activeEventType}`;

  if (state.activeRandomEvents.length > 0) {
    elements.eventName.textContent = "Active News";
    elements.eventDescription.textContent = "Timed event effects are currently changing your income.";
  } else {
    elements.eventName.textContent = "Quiet for now";
    elements.eventDescription.textContent = "A random event will happen every 5-10 minutes.";
  }

  renderActiveEvents();

  UPGRADE_DEFINITIONS.forEach((upgrade) => {
    const cost = upgradeCost(upgrade);
    const refs = upgradeElements[upgrade.id];

    refs.owned.textContent = `Owned: ${getUpgradeLevel(upgrade.id)}`;
    refs.cost.textContent = formatNumber(cost);
    refs.button.disabled = state.shekels < cost;
  });
}

function renderActiveEvents() {
  elements.activeEvents.innerHTML = "";

  state.activeRandomEvents.forEach((event) => {
    const remainingSeconds = Math.max(0, Math.ceil((event.expiresAt - Date.now()) / 1000));
    const item = document.createElement("div");
    const name = document.createElement("strong");
    const timer = document.createElement("span");

    item.className = `active-event ${event.type}`;
    name.textContent = `${event.name} (${event.incomeMultiplier}x)`;
    timer.textContent = `${remainingSeconds}s left`;

    item.append(name, timer);
    elements.activeEvents.appendChild(item);
  });
}

elements.flagButton.addEventListener("click", registerManualClick);

elements.shopButton.addEventListener("click", openShop);
elements.closeShopButton.addEventListener("click", closeShop);
elements.darkModeButton.addEventListener("click", toggleDarkMode);
elements.shopOverlay.addEventListener("click", (event) => {
  if (event.target === elements.shopOverlay) {
    closeShop();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.shopOverlay.hidden) {
    closeShop();
  }

  if (event.code === "Space" && !event.repeat && elements.shopOverlay.hidden && elements.eventOverlay.hidden) {
    event.preventDefault();
    registerManualClick();
  }
});

elements.rebirthButton.addEventListener("click", rebirth);
elements.resetButton.addEventListener("click", resetGame);
elements.acknowledgeEventButton.addEventListener("click", acknowledgePendingEvent);

setInterval(() => {
  if (state.pendingRandomEvent) {
    pauseActiveEventTimersSinceLastSave();
    updateScreen();
    saveGame();
    return;
  }

  const removedExpiredEvents = removeExpiredRandomEvents();
  const earned = perSecond();

  if (earned > 0) {
    state.shekels += earned;
    state.totalEarned += earned;
  }

  updateScreen();

  if (earned > 0) {
    animateScoreChange();
  }

  if (earned > 0 || removedExpiredEvents) {
    saveGame();
  }
}, 1000);
