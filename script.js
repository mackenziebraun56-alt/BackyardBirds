
/* =============================================
   BIRD CAM — script.js
   ============================================= */


/* =============================================
   YOUR DATA — Edit this section to add your
   own birds and videos!

   For images: add your photos to assets/birds/
   For videos: add your clips to assets/videos/
   ============================================= */

const BIRDS = [
  {
    id: 1,
    name: "Spotted Towhee",
    scientific: "Pipilo maculatus",
    image: "assets/birds/spotted-towhee.jpg",
    videos: [
      // Add your videos like this:
      // {
      //   title: "Morning visit",
      //   date: "May 9, 2025",
      //   duration: "0:42",
      //   thumb: "assets/birds/spotted-towhee.jpg",
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
    name: "Black-headed Grosbeak",
    scientific: "Pheucticus melanocephalus",
    image: "assets/birds/grosbeak.jpg",
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
const galleryView    = document.getElementById("galleryView");
const detailView     = document.getElementById("detailView");
const birdGrid       = document.getElementById("birdGrid");
const videoGrid      = document.getElementById("videoGrid");
const backBtn        = document.getElementById("backBtn");
const logo           = document.getElementById("logo");
const headerStats    = document.getElementById("headerStats");
const headerBirdName = document.getElementById("headerBirdName");
const speciesCount   = document.getElementById("speciesCount");
const clipsCount     = document.getElementById("clipsCount");
const clipCount      = document.getElementById("clipCount");

// Fill in header stats
const totalClips = BIRDS.reduce((sum, bird) => sum + bird.videos.length, 0);
speciesCount.textContent = BIRDS.length;
clipsCount.textContent   = totalClips;

// Build the bird gallery
BIRDS.forEach(bird => {
  const card = document.createElement("div");
  card.className = "bird-card";
  card.innerHTML = `
    <img src="${bird.image}" alt="${bird.name}" loading="lazy" />
    <div class="bird-card-overlay"></div>
    <div class="bird-card-info">
      <div class="bird-card-name">${bird.name}</div>
      <div class="bird-card-scientific">${bird.scientific}</div>
      <div class="bird-card-clips">&#9654; ${bird.videos.length} clip${bird.videos.length !== 1 ? "s" : ""}</div>
    </div>
  `;
  card.addEventListener("click", () => showBird(bird));
  birdGrid.appendChild(card);
});

// Show a bird's video detail page
function showBird(bird) {
  // Swap views
  galleryView.classList.add("hidden");
  detailView.classList.remove("hidden");

  // Update header
  logo.classList.add("hidden");
  headerStats.classList.add("hidden");
  backBtn.classList.remove("hidden");
  headerBirdName.textContent = bird.name;
  headerBirdName.classList.remove("hidden");

  // Set clip count label
  if (bird.videos.length === 0) {
    clipCount.textContent = "No clips yet — check back soon!";
  } else {
    clipCount.textContent = `${bird.videos.length} clip${bird.videos.length !== 1 ? "s" : ""} captured`;
  }

  // Build video cards
  videoGrid.innerHTML = "";
  bird.videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <div class="video-thumbnail">
        <img src="${video.thumb}" alt="${video.title}" loading="lazy" />
        <div class="play-button">
          <div class="play-circle">
            <div class="play-icon"></div>
          </div>
        </div>
        <div class="video-duration">${video.duration}</div>
      </div>
      <div class="video-info">
        <div class="video-title">${video.title}</div>
        <div class="video-date">${video.date}</div>
      </div>
    `;

    // If there's a real video URL, open it when clicked
    if (video.videoUrl) {
      card.addEventListener("click", () => window.open(video.videoUrl, "_blank"));
    }

    videoGrid.appendChild(card);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Back button → return to gallery
backBtn.addEventListener("click", () => {
  detailView.classList.add("hidden");
  galleryView.classList.remove("hidden");

  backBtn.classList.add("hidden");
  headerBirdName.classList.add("hidden");
  logo.classList.remove("hidden");
  headerStats.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
});
