
/* =============================================
   BIRD CAM — script.js
   ============================================= */


/* =============================================
   YOUR DATA — Edit this section to add your
   own birds and videos!

   For images: replace the image URL with your
   own file path e.g. "assets/birds/robin.jpg"
   For videos: add your clips to assets/videos/
   ============================================= */

const BIRDS = [
  {
    id: 1,
    name: "Spotted Towhee",
    scientific: "Pipilo maculatus",
    // PLACEHOLDER — replace with: "assets/birds/spotted-towhee.jpg"
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
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
    // PLACEHOLDER — replace with: "assets/birds/says-phoebe.jpg"
    image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&q=80",
    videos: [],
  },
  {
    id: 3,
    name: "American Robin",
    scientific: "Turdus migratorius",
    // PLACEHOLDER — replace with: "assets/birds/american-robin.jpg"
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
    videos: [],
  },
  {
    id: 4,
    name: "Pigeon",
    scientific: "Columba livia",
    // PLACEHOLDER — replace with: "assets/birds/pigeon.jpg"
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    videos: [],
  },
  {
    id: 5,
    name: "House Finch",
    scientific: "Haemorhous mexicanus",
    // PLACEHOLDER — replace with: "assets/birds/house-finch.jpg"
    image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&q=80",
    videos: [],
  },
  {
    id: 6,
    name: "Black-headed Grosbeak",
    scientific: "Pheucticus melanocephalus",
    // PLACEHOLDER — replace with: "assets/birds/grosbeak.jpg"
    image: "https://images.unsplash.com/photo-1638378384673-0c1d5b5c879b?w=600&q=80",
    videos: [],
  },
  {
    id: 7,
    name: "Chipping Sparrow",
    scientific: "Spizella passerina",
    // PLACEHOLDER — replace with: "assets/birds/chipping-sparrow.jpg"
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
    videos: [],
  },
  {
    id: 8,
    name: "Mountain Bluebird",
    scientific: "Sialia currucoides",
    // PLACEHOLDER — replace with: "assets/birds/mountain-bluebird.jpg"
    image: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=600&q=80",
    videos: [],
  },
  {
    id: 9,
    name: "Mourning Dove",
    scientific: "Zenaida macroura",
    // PLACEHOLDER — replace with: "assets/birds/mourning-dove.jpg"
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    videos: [],
  },
  {
    id: 10,
    name: "American Goldfinch",
    scientific: "Spinus tristis",
    // PLACEHOLDER — replace with: "assets/birds/american-goldfinch.jpg"
    image: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=600&q=80",
    videos: [],
  },
  {
    id: 11,
    name: "Dark-eyed Junco",
    scientific: "Junco hyemalis",
    // PLACEHOLDER — replace with: "assets/birds/dark-eyed-junco.jpg"
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
    videos: [],
  },
  {
    id: 12,
    name: "Pine Siskin",
    scientific: "Spinus pinus",
    // PLACEHOLDER — replace with: "assets/birds/pine-siskin.jpg"
    image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&q=80",
    videos: [],
  },
  {
    id: 13,
    name: "Mouse",
    scientific: "Mus musculus",
    // PLACEHOLDER — replace with: "assets/birds/mouse.jpg"
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    videos: [],
  },
  {
    id: 14,
    name: "Midge",
    scientific: "Chironomidae",
    // PLACEHOLDER — replace with: "assets/birds/midge.jpg"
    image: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=600&q=80",
    videos: [],
  },
  {
    id: 15,
    name: "Common Raven",
    scientific: "Corvus corax",
    // PLACEHOLDER — replace with: "assets/birds/common-raven.jpg"
    image: "https://images.unsplash.com/photo-1638378384673-0c1d5b5c879b?w=600&q=80",
    videos: [],
  },
  {
    id: 16,
    name: "Black-billed Magpie",
    scientific: "Pica hudsonia",
    // PLACEHOLDER — replace with: "assets/birds/black-billed-magpie.jpg"
    image: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=600&q=80",
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
