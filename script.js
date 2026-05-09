/* =============================================
   BIRD CAM — script.js
   ============================================= */


/* =============================================
   YOUR DATA — Edit this section to add your
   own birds and videos!
   ============================================= */

const BIRDS = [
  {
    id: 1,
    name: "American Robin",
    scientific: "Turdus migratorius",
    // Image shown on the bird card. Use a URL or a local file path like "images/robin.jpg"
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
    videos: [
      {
        title: "Morning visit",
        date: "May 7, 2025",
        duration: "0:42",
        // Thumbnail image for the video card
        thumb: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=70",
        // Link to the actual video file, e.g. "videos/robin-morning.mp4"
        // Leave as "" if you don't have a video yet
        videoUrl: "",
      },
      {
        title: "Feeding at dusk",
        date: "May 6, 2025",
        duration: "1:15",
        thumb: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=70",
        videoUrl: "",
      },
      {
        title: "Pair spotted",
        date: "May 4, 2025",
        duration: "0:28",
        thumb: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=70",
        videoUrl: "",
      },
    ],
  },
  {
    id: 2,
    name: "Blue Jay",
    scientific: "Cyanocitta cristata",
    image: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=600&q=80",
    videos: [
      {
        title: "Acorn collection",
        date: "May 8, 2025",
        duration: "2:03",
        thumb: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400&q=70",
        videoUrl: "",
      },
      {
        title: "Chasing sparrow",
        date: "May 5, 2025",
        duration: "0:55",
        thumb: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400&q=70",
        videoUrl: "",
      },
    ],
  },
  {
    id: 3,
    name: "Northern Cardinal",
    scientific: "Cardinalis cardinalis",
    image: "https://images.unsplash.com/photo-1638378384673-0c1d5b5c879b?w=600&q=80",
    videos: [
      {
        title: "Male at feeder",
        date: "May 9, 2025",
        duration: "1:30",
        thumb: "https://images.unsplash.com/photo-1638378384673-0c1d5b5c879b?w=400&q=70",
        videoUrl: "",
      },
      {
        title: "Female spotted",
        date: "May 8, 2025",
        duration: "0:47",
        thumb: "https://images.unsplash.com/photo-1638378384673-0c1d5b5c879b?w=400&q=70",
        videoUrl: "",
      },
      {
        title: "Pair singing",
        date: "May 7, 2025",
        duration: "3:12",
        thumb: "https://images.unsplash.com/photo-1638378384673-0c1d5b5c879b?w=400&q=70",
        videoUrl: "",
      },
      {
        title: "Dawn arrival",
        date: "May 6, 2025",
        duration: "0:22",
        thumb: "https://images.unsplash.com/photo-1638378384673-0c1d5b5c879b?w=400&q=70",
        videoUrl: "",
      },
    ],
  },
  {
    id: 4,
    name: "Black-capped Chickadee",
    scientific: "Poecile atricapillus",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    videos: [
      {
        title: "Sunflower seed grab",
        date: "May 9, 2025",
        duration: "0:18",
        thumb: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=70",
        videoUrl: "",
      },
      {
        title: "Three at once",
        date: "May 7, 2025",
        duration: "1:04",
        thumb: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=70",
        videoUrl: "",
      },
    ],
  },
  {
    id: 5,
    name: "Downy Woodpecker",
    scientific: "Dryobates pubescens",
    image: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=600&q=80",
    videos: [
      {
        title: "Suet feeder visit",
        date: "May 5, 2025",
        duration: "1:48",
        thumb: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=400&q=70",
        videoUrl: "",
      },
    ],
  },
  {
    id: 6,
    name: "House Finch",
    scientific: "Haemorhous mexicanus",
    image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&q=80",
    videos: [
      {
        title: "Morning chorus",
        date: "May 9, 2025",
        duration: "2:34",
        thumb: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&q=70",
        videoUrl: "",
      },
      {
        title: "Nest material",
        date: "May 6, 2025",
        duration: "0:51",
        thumb: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&q=70",
        videoUrl: "",
      },
      {
        title: "Group feeding",
        date: "May 4, 2025",
        duration: "1:22",
        thumb: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&q=70",
        videoUrl: "",
      },
    ],
  },
];

/* =============================================
   APP LOGIC — No need to edit below this line
   ============================================= */

// Grab elements
const galleryView   = document.getElementById("galleryView");
const detailView    = document.getElementById("detailView");
const birdGrid      = document.getElementById("birdGrid");
const videoGrid     = document.getElementById("videoGrid");
const backBtn       = document.getElementById("backBtn");
const logo          = document.getElementById("logo");
const headerStats   = document.getElementById("headerStats");
const headerBirdName = document.getElementById("headerBirdName");
const speciesCount  = document.getElementById("speciesCount");
const clipsCount    = document.getElementById("clipsCount");
const clipCount     = document.getElementById("clipCount");

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
  clipCount.textContent = `${bird.videos.length} clip${bird.videos.length !== 1 ? "s" : ""} captured`;

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
