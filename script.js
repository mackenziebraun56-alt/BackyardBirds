/* =============================================
   BIRD CAM — script.js
   ============================================= */


/* =============================================
   YOUR DATA — Edit this section to add birds
   and videos as you go!

   Video naming convention:
   assets/videos/bird-name-description.mp4
   e.g. assets/videos/american-robin-morning-visit.mp4
   ============================================= */

const BIRDS = [
  {
    id: 1,
    name: "Spotted Towhee",
    scientific: "Pipilo maculatus",
    image: "assets/birds/spotted-towhee.jpg",
    videos: [
      // Add your clips like this:
      // {
      //   title: "Morning visit",
      //   date: "May 9, 2025",
      //   videoUrl: "assets/videos/spotted-towhee-morning-visit.mp4",
      // },
    ],
  },
  {
    id: 2,
    name: "Say's Phoebe",
    scientific: "Sayornis saya",
    image: "assets/birds/says-phoebe.jpg",
    videos: [],
  },
  {
    id: 3,
    name: "American Robin",
    scientific: "Turdus migratorius",
    image: "assets/birds/american-robin.jpg",
    videos: [],
  },
  {
    id: 4,
    name: "Pigeon",
    scientific: "Columba livia",
    image: "assets/birds/pigeon.jpg",
    videos: [],
  },
  {
    id: 5,
    name: "House Finch",
    scientific: "Haemorhous mexicanus",
    image: "assets/birds/house-finch.jpg",
    videos: [],
  },
  {
    id: 6,
    name: "Red-winged Blackbird",
    scientific: "Agelaius phoeniceus",
    image: "assets/birds/red-winged-blackbird.jpg",
    videos: [],
  },
  {
    id: 7,
    name: "Chipping Sparrow",
    scientific: "Spizella passerina",
    image: "assets/birds/chipping-sparrow.jpg",
    videos: [],
  },
  {
    id: 8,
    name: "Mountain Bluebird",
    scientific: "Sialia currucoides",
    image: "assets/birds/mountain-bluebird.jpg",
    videos: [],
  },
  {
    id: 9,
    name: "Mourning Dove",
    scientific: "Zenaida macroura",
    image: "assets/birds/mourning-dove.jpg",
    videos: [],
  },
  {
    id: 10,
    name: "American Goldfinch",
    scientific: "Spinus tristis",
    image: "assets/birds/american-goldfinch.jpg",
    videos: [],
  },
  {
    id: 11,
    name: "Dark-eyed Junco",
    scientific: "Junco hyemalis",
    image: "assets/birds/dark-eyed-junco.jpg",
    videos: [],
  },
  {
    id: 12,
    name: "Pine Siskin",
    scientific: "Spinus pinus",
    image: "assets/birds/pine-siskin.jpg",
    videos: [],
  },
  {
    id: 13,
    name: "Mouse",
    scientific: "Mus musculus",
    image: "assets/birds/mouse.jpg",
    videos: [],
  },
  {
    id: 14,
    name: "Midge",
    scientific: "Chironomidae",
    image: "assets/birds/midge.jpg",
    videos: [],
  },
  {
    id: 15,
    name: "Common Raven",
    scientific: "Corvus corax",
    image: "assets/birds/common-raven.jpg",
    videos: [],
  },
  {
    id: 16,
    name: "Black-billed Magpie",
    scientific: "Pica hudsonia",
    image: "assets/birds/black-billed-magpie.jpg",
    videos: [],
  },
];

/* =============================================
   APP LOGIC — No need to edit below this line
   ============================================= */

// Grab elements
const birdGrid       = document.getElementById("birdGrid");
const videoPanel     = document.getElementById("videoPanel");
const videoGrid      = document.getElementById("videoGrid");
const panelBirdName  = document.getElementById("panelBirdName");
const panelClipCount = document.getElementById("panelClipCount");
const closePanelBtn  = document.getElementById("closePanelBtn");
const speciesCount   = document.getElementById("speciesCount");
const clipsCount     = document.getElementById("clipsCount");

// Track which card is currently selected
let selectedCard = null;
let selectedBirdId = null;

// Fill in header stats
const totalClips = BIRDS.reduce((sum, bird) => sum + bird.videos.length, 0);
speciesCount.textContent = BIRDS.length;
clipsCount.textContent   = totalClips;

// Build the bird gallery
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
      <div class="bird-card-clips">&#9654; ${bird.videos.length} clip${bird.videos.length !== 1 ? "s" : ""}</div>
    </div>
  `;

  card.addEventListener("click", () => {
    // Clicking the same bird again closes the panel
    if (selectedBirdId === bird.id) {
      closePanel();
      return;
    }
    openPanel(bird, card);
  });

  birdGrid.appendChild(card);
});

// Open the video panel for a bird
function openPanel(bird, card) {
  // Deselect previous card
  if (selectedCard) selectedCard.classList.remove("selected");

  // Select new card
  card.classList.add("selected");
  selectedCard = card;
  selectedBirdId = bird.id;

  // Update panel header
  panelBirdName.textContent = bird.name;

  if (bird.videos.length === 0) {
    panelClipCount.textContent = "";
    videoGrid.innerHTML = `<p class="no-clips-msg">No clips yet — check back soon!</p>`;
  } else {
    panelClipCount.textContent = `${bird.videos.length} clip${bird.videos.length !== 1 ? "s" : ""}`;

    // Build video cards with native <video> player, no autoplay
    videoGrid.innerHTML = "";
    bird.videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `
        <div class="video-wrapper">
          <video controls preload="metadata">
            <source src="${video.videoUrl}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="video-info">
          <div class="video-title">${video.title}</div>
          <div class="video-date">${video.date}</div>
        </div>
      `;
      videoGrid.appendChild(card);
    });
  }

  // Open the panel
  videoPanel.classList.add("open");

  // Scroll panel into view smoothly
  setTimeout(() => {
    videoPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 50);
}

// Close the video panel
function closePanel() {
  videoPanel.classList.remove("open");
  if (selectedCard) selectedCard.classList.remove("selected");
  selectedCard = null;
  selectedBirdId = null;

  // Pause any playing videos when panel closes
  document.querySelectorAll("#videoGrid video").forEach(v => v.pause());
}

// Close button
closePanelBtn.addEventListener("click", closePanel);
