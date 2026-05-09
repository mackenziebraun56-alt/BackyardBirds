
/* =============================================
   BIRD CAM — script.js
   ============================================= */


/* =============================================
   YOUR DATA — Edit this section to add birds!

   To add a video for a bird, just upload a file
   to assets/videos/ using this naming format:

       bird-slug-1.mp4
       bird-slug-2.mp4
       bird-slug-3.mp4
       bird-slug-4.mp4

   The slug is the "slug" field on each bird below.
   For example, the American Robin's slug is
   "american-robin", so its videos would be:

       assets/videos/american-robin-1.mp4
       assets/videos/american-robin-2.mp4

   You can have up to 4 videos per bird.
   Missing files are automatically hidden —
   no need to edit this script at all!
   ============================================= */

const BIRDS = [
  {
    id: 1,
    name: "Spotted Towhee",
    scientific: "Pipilo maculatus",
    slug: "spotted-towhee",
    image: "assets/birds/spotted-towhee.jpg",
  },
  {
    id: 2,
    name: "Say's Phoebe",
    scientific: "Sayornis saya",
    slug: "says-phoebe",
    image: "assets/birds/says-phoebe.jpg",
  },
  {
    id: 3,
    name: "American Robin",
    scientific: "Turdus migratorius",
    slug: "american-robin",
    image: "assets/birds/american-robin.jpg",
  },
  {
    id: 4,
    name: "Pigeon",
    scientific: "Columba livia",
    slug: "pigeon",
    image: "assets/birds/pigeon.jpg",
  },
  {
    id: 5,
    name: "House Finch",
    scientific: "Haemorhous mexicanus",
    slug: "house-finch",
    image: "assets/birds/house-finch.jpg",
  },
  {
    id: 6,
    name: "Red-winged Blackbird",
    scientific: "Agelaius phoeniceus",
    slug: "red-winged-blackbird",
    image: "assets/birds/red-winged-blackbird.jpg",
  },
  {
    id: 7,
    name: "Chipping Sparrow",
    scientific: "Spizella passerina",
    slug: "chipping-sparrow",
    image: "assets/birds/chipping-sparrow.jpg",
  },
  {
    id: 8,
    name: "Mountain Bluebird",
    scientific: "Sialia currucoides",
    slug: "mountain-bluebird",
    image: "assets/birds/mountain-bluebird.jpg",
  },
  {
    id: 9,
    name: "Mourning Dove",
    scientific: "Zenaida macroura",
    slug: "mourning-dove",
    image: "assets/birds/mourning-dove.jpg",
  },
  {
    id: 10,
    name: "American Goldfinch",
    scientific: "Spinus tristis",
    slug: "american-goldfinch",
    image: "assets/birds/american-goldfinch.jpg",
  },
  {
    id: 11,
    name: "Dark-eyed Junco",
    scientific: "Junco hyemalis",
    slug: "dark-eyed-junco",
    image: "assets/birds/dark-eyed-junco.jpg",
  },
  {
    id: 12,
    name: "Pine Siskin",
    scientific: "Spinus pinus",
    slug: "pine-siskin",
    image: "assets/birds/pine-siskin.jpg",
  },
  {
    id: 13,
    name: "Mouse",
    scientific: "Mus musculus",
    slug: "mouse",
    image: "assets/birds/mouse.jpg",
  },
  {
    id: 14,
    name: "Midge",
    scientific: "Chironomidae",
    slug: "midge",
    image: "assets/birds/midge.jpg",
  },
  {
    id: 15,
    name: "Common Raven",
    scientific: "Corvus corax",
    slug: "common-raven",
    image: "assets/birds/common-raven.jpg",
  },
  {
    id: 16,
    name: "Black-billed Magpie",
    scientific: "Pica hudsonia",
    slug: "black-billed-magpie",
    image: "assets/birds/black-billed-magpie.jpg",
  },
];

/* =============================================
   APP LOGIC — No need to edit below this line
   ============================================= */

// How many video slots to check per bird (increase if you ever have more)
const MAX_VIDEOS = 4;

const birdGrid      = document.getElementById("birdGrid");
const videoPanel    = document.getElementById("videoPanel");
const videoGrid     = document.getElementById("videoGrid");
const closePanelBtn = document.getElementById("closePanelBtn");
const speciesCount  = document.getElementById("speciesCount");
const clipsCount    = document.getElementById("clipsCount");

let selectedCard   = null;
let selectedBirdId = null;

// Header stats — clip count updates dynamically as videos load
speciesCount.textContent = BIRDS.length;
clipsCount.textContent   = "…";

// Count confirmed videos across all birds (updates as videos resolve)
let confirmedClips = 0;
function updateClipCount(delta) {
  confirmedClips += delta;
  clipsCount.textContent = confirmedClips;
}

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
      <div class="bird-card-clips" id="clips-${bird.id}">&#9654; checking…</div>
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

  // Pre-check how many videos exist for this bird
  checkVideoCount(bird);
});

// Silently checks which of the 4 slots exist for a bird
// by attempting to fetch each file's headers
function checkVideoCount(bird) {
  let found = 0;
  let checked = 0;

  for (let i = 1; i <= MAX_VIDEOS; i++) {
    const url = `assets/videos/${bird.slug}-${i}.mp4`;
    fetch(url, { method: "HEAD" })
      .then(res => {
        if (res.ok) {
          found++;
          updateClipCount(1);
        }
      })
      .finally(() => {
        checked++;
        if (checked === MAX_VIDEOS) {
          // All slots checked — update the clip count on the card
          const label = document.getElementById(`clips-${bird.id}`);
          if (label) {
            label.textContent = found > 0
              ? `▶ ${found} clip${found !== 1 ? "s" : ""}`
              : "";
          }
        }
      });
  }
}

// Returns the last card in the same visual row as the clicked card
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

// Build the video panel for a bird, auto-detecting which slots exist
function openPanel(bird, card) {
  document.querySelectorAll("#videoGrid video").forEach(v => v.pause());

  if (selectedCard) selectedCard.classList.remove("selected");
  card.classList.add("selected");
  selectedCard   = card;
  selectedBirdId = bird.id;

  // Move panel to right after the last card in this row
  const rowLast = getRowLastCard(card);
  rowLast.after(videoPanel);

  // Show a loading state while we figure out which videos exist
  videoGrid.innerHTML = `<p class="no-clips-msg">Loading…</p>`;

  videoPanel.classList.remove("open");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      videoPanel.classList.add("open");
      setTimeout(() => {
        videoPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
    });
  });

  // Check all slots and build cards for ones that exist
  const checks = [];
  for (let i = 1; i <= MAX_VIDEOS; i++) {
    const url = `assets/videos/${bird.slug}-${i}.mp4`;
    checks.push(
      fetch(url, { method: "HEAD" })
        .then(res => ({ url, index: i, exists: res.ok }))
        .catch(() => ({ url, index: i, exists: false }))
    );
  }

  Promise.all(checks).then(results => {
    // Only render if this bird is still the selected one
    if (selectedBirdId !== bird.id) return;

    const existing = results.filter(r => r.exists);

    if (existing.length === 0) {
      videoGrid.innerHTML = `<p class="no-clips-msg">No clips yet — check back soon!</p>`;
      return;
    }

    videoGrid.innerHTML = "";
    existing.forEach(({ url, index }) => {
      const vc = document.createElement("div");
      vc.className = "video-card";
      vc.innerHTML = `
        <div class="video-wrapper">
          <video controls preload="metadata">
            <source src="${url}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="video-info">
          <div class="video-title">Clip ${index}</div>
        </div>
      `;
      videoGrid.appendChild(vc);
    });
  });
}

function closePanel() {
  document.querySelectorAll("#videoGrid video").forEach(v => v.pause());
  videoPanel.classList.remove("open");
  if (selectedCard) selectedCard.classList.remove("selected");
  selectedCard   = null;
  selectedBirdId = null;
}

closePanelBtn.addEventListener("click", closePanel);
