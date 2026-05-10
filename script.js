
/* =============================================
   BIRD CAM — script.js
   ============================================= */

/* =============================================
   YOUR DATA

   To add a video, just paste the Google Drive
   file ID into the driveIds array for that bird.
   ============================================= */

const BIRDS = [
  {
    id: 1,
    name: "Spotted Towhee",
    scientific: "Pipilo maculatus",
    image: "assets/birds/spotted-towhee.jpg",
    driveIds: [
      "1gIywb72dQETJsPoEUl--g5PuNEiQwJRA",
    ],
  },
  {
    id: 2,
    name: "Say's Phoebe",
    scientific: "Sayornis saya",
    image: "assets/birds/says-phoebe.jpg",
    driveIds: [
      "1Ym3K5XtpI6AoxUypxgHoG5AwlxDphafB",
    ],
  },
  {
    id: 3,
    name: "American Robin",
    scientific: "Turdus migratorius",
    image: "assets/birds/american-robin.jpg",
    driveIds: [
      "15IrrwSTEz7gQ29ThUsdiwGLsX6O7OUr9",
    ],
  },
  {
    id: 4,
    name: "Pigeon",
    scientific: "Columba livia",
    image: "assets/birds/pigeon.jpg",
    driveIds: [
      "1sUo9ZdctfbQPwZMiLZr-JPvsdK91y1qt",
      "18NkT9zFmXMR6RXdQYvr9C-qH81PtYP8N",
      "16C08MMlvjJo3tju9rC3UNVMXePnqrM5Z",
    ],
  },
  {
    id: 5,
    name: "House Finch",
    scientific: "Haemorhous mexicanus",
    image: "assets/birds/house-finch.jpg",
    driveIds: [
      "1bCuSCDtr0aHcsrF6n_Hp0nROVrgXCpMv",
      "1Sa7406rSvm4Le6OmshAg_e2R4rmZLOiy",
    ],
  },
  {
    id: 6,
    name: "Red-winged Blackbird",
    scientific: "Agelaius phoeniceus",
    image: "assets/birds/red-winged-blackbird.jpg",
    driveIds: [
      "1nBePAHNbxt0DHImviRcpubJJ9HyIPAEP",
    ],
  },
  {
    id: 7,
    name: "Chipping Sparrow",
    scientific: "Spizella passerina",
    image: "assets/birds/chipping-sparrow.jpg",
    driveIds: [
      "1P7ZrEG66izy02HSr091n5CompHHisTmF",
      "1aXKFEbhAMteqYizRFQKyuZfmtwFxjtm5",
      "11KRghLLbCPYaafBcBJlKxMeteu-fPV-Q",
      "1qPjugK0jOcVVCF5zjyQKn9pORB1YEZQX",
    ],
  },
  {
    id: 8,
    name: "Mountain Bluebird",
    scientific: "Sialia currucoides",
    image: "assets/birds/mountain-bluebird.jpg",
    driveIds: [
      "1eFajlDqUZ9yGakr1FXOMyIQRRY0sSIEV",
    ],
  },
  {
    id: 9,
    name: "Mourning Dove",
    scientific: "Zenaida macroura",
    image: "assets/birds/mourning-dove.jpg",
    driveIds: [
      "1c8ILzvKQfFDTrVRl2dwHuFrYDqBdh8NW",
    ],
  },
  {
    id: 10,
    name: "American Goldfinch",
    scientific: "Spinus tristis",
    image: "assets/birds/american-goldfinch.jpg",
    driveIds: [
      "1pI7W7AhXgNjQLrPxz1BcaEFleCC35Uq9",
    ],
  },
  {
    id: 11,
    name: "Dark-eyed Junco",
    scientific: "Junco hyemalis",
    image: "assets/birds/dark-eyed-junco.jpg",
    driveIds: [
      "1IWcw4cDfRjEJdvZOZ8F5UvOux2fdy8_s",
      "1X3P9PvD-TJ4yACyXcp3piEUx7U98147C",
      "1tbLg3NZM-X8dRaYdjrHQ8UWrebvcM_Bb",
    ],
  },
  {
    id: 12,
    name: "Pine Siskin",
    scientific: "Spinus pinus",
    image: "assets/birds/pine-siskin.jpg",
    driveIds: [
      "16Ok3OMV_em5Kf2eoOxOYnx4qrn4Akz5n",
      "14j6_zUJiVwoVHJsgevnx3wCufCtt3ZVN",
    ],
  },
  {
    id: 13,
    name: "Mouse",
    scientific: "Mus musculus",
    image: "assets/birds/mouse.jpg",
    driveIds: [
      "19AKI1miEUrTAHZziC4dVm6pqVFqFIwbi",
    ],
  },
  {
    id: 14,
    name: "Midge",
    scientific: "Chironomidae",
    image: "assets/birds/midge.jpg",
    driveIds: [
      "14pB3DABJJZ9rlVVUOVoV_TPTWVIL-5la",
    ],
  },
  {
    id: 15,
    name: "Common Raven",
    scientific: "Corvus corax",
    image: "assets/birds/common-raven.jpg",
    driveIds: [
      "1mLQH8PY8myg8Cmv781CoVX0ifZJpz9Fb",
    ],
  },
  {
    id: 16,
    name: "Black-billed Magpie",
    scientific: "Pica hudsonia",
    image: "assets/birds/black-billed-magpie.jpg",
    driveIds: [],
  },
];

/* =============================================
   APP LOGIC — No need to edit below this line
   ============================================= */

function driveEmbedUrl(id) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

const birdGrid      = document.getElementById("birdGrid");
const videoPanel    = document.getElementById("videoPanel");
const tabStrip      = document.getElementById("tabStrip");
const videoStage    = document.getElementById("videoStage");
const closePanelBtn = document.getElementById("closePanelBtn");
const speciesCount  = document.getElementById("speciesCount");
const clipsCount    = document.getElementById("clipsCount");

let selectedCard   = null;
let selectedBirdId = null;

// Header stats
const totalClips = BIRDS.reduce((sum, b) => sum + b.driveIds.length, 0);
speciesCount.textContent = BIRDS.length;
clipsCount.textContent   = totalClips;

// Build bird cards
BIRDS.forEach(bird => {
  const card = document.createElement("div");
  card.className = "bird-card";
  card.dataset.id = bird.id;
  card.innerHTML = `
    <img src="${bird.image}" alt="${bird.name}" loading="lazy" />
    <div class="bird-card-overlay"></div>
    <div class="bird-card-info">
      <div class="bird-card-name">${bird.name}</div>
      <div class="bird-card-scientific">${bird.scientific}</div>
      <div class="bird-card-clips">${bird.driveIds.length > 0 ? `&#9654; ${bird.driveIds.length} clip${bird.driveIds.length !== 1 ? "s" : ""}` : ""}</div>
    </div>
  `;
  card.addEventListener("click", () => {
    if (selectedBirdId === bird.id) {
      closePanel();
    } else {
      openPanel(bird, card);
    }
  });
  birdGrid.appendChild(card);
});

// Find the last card in the same visual row as the clicked card
function getRowLastCard(clickedCard) {
  const cards = Array.from(birdGrid.querySelectorAll(".bird-card"));
  const clickedTop = clickedCard.getBoundingClientRect().top;
  let lastInRow = clickedCard;
  cards.forEach(c => {
    if (Math.abs(c.getBoundingClientRect().top - clickedTop) < 5) {
      lastInRow = c;
    }
  });
  return lastInRow;
}

// Load a specific clip into the video stage
function loadClip(driveId, tabs, index) {
  // Update active tab
  tabs.forEach((t, i) => t.classList.toggle("active", i === index));

  // Swap the iframe
  videoStage.innerHTML = `
    <iframe
      src="${driveEmbedUrl(driveId)}"
      frameborder="0"
      allow="fullscreen; autoplay"
      allowfullscreen>
    </iframe>
  `;
}

function openPanel(bird, card) {
  // Clear stage to stop any playing video
  videoStage.innerHTML = "";

  // Deselect old card
  if (selectedCard) selectedCard.classList.remove("selected");

  card.classList.add("selected");
  selectedCard   = card;
  selectedBirdId = bird.id;

  // Move panel to after the last card in this row
  const rowLast = getRowLastCard(card);
  rowLast.after(videoPanel);

  // Build tab strip — clear existing tabs (keep close button)
  Array.from(tabStrip.querySelectorAll(".clip-tab")).forEach(t => t.remove());

  if (bird.driveIds.length === 0) {
    videoStage.innerHTML = `<p class="no-clips-msg">No clips yet — check back soon!</p>`;
  } else {
    const tabs = bird.driveIds.map((id, i) => {
      const tab = document.createElement("button");
      tab.className = "clip-tab";
      tab.textContent = `Clip ${i + 1}`;
      tab.addEventListener("click", () => loadClip(id, tabs, i));
      tabStrip.insertBefore(tab, closePanelBtn);
      return tab;
    });

    // Load first clip by default
    loadClip(bird.driveIds[0], tabs, 0);
  }

  // Animate open
  videoPanel.classList.remove("open");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      videoPanel.classList.add("open");
      setTimeout(() => {
        videoPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
    });
  });
}

function closePanel() {
  videoStage.innerHTML = "";
  videoPanel.classList.remove("open");
  if (selectedCard) selectedCard.classList.remove("selected");
  selectedCard   = null;
  selectedBirdId = null;
}

closePanelBtn.addEventListener("click", closePanel);
