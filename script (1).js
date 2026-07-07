// ---- Sample video data (placeholder content, no real branding) ----
const CHANNEL_COLORS = ['#FF3B3B', '#1a73e8', '#0f9d58', '#f4b400', '#8e24aa', '#00acc1', '#e67c00', '#5c6bc0'];

function randomColor(seed) {
  return CHANNEL_COLORS[seed % CHANNEL_COLORS.length];
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// Every video has a category (for chip filtering) and a channel
// (used by subscription/channel pages).
const ALL_VIDEOS = [
  { title: "Building a Full Stack App From Scratch — Complete Tutorial", channel: "CodeCraft", views: "482K views", time: "2 days ago", duration: "18:24", category: "coding", trending: true },
  { title: "10 Minute Morning Workout for Beginners", channel: "FitZone", views: "1.2M views", time: "1 week ago", duration: "10:03", category: "fitness" },
  { title: "Exploring the Streets of Kyoto at Night 🌆", channel: "WanderLens", views: "302K views", time: "3 days ago", duration: "14:52", category: "travel" },
  { title: "Lo-Fi Beats to Study and Relax", channel: "LoFi Beats", views: "5.6M views", time: "6 months ago", duration: "1:02:11", category: "music" },
  { title: "How Black Holes Actually Work", channel: "SciSimple", views: "890K views", time: "4 days ago", duration: "12:40", category: "news", trending: true },
  { title: "Easy Homemade Pasta Recipe", channel: "CookWithMe", views: "231K views", time: "5 days ago", duration: "8:17", category: "cooking" },
  { title: "Top 5 Plot Twists in Modern Gaming", channel: "GameZone", views: "654K views", time: "1 day ago", duration: "16:05", category: "gaming", trending: true },
  { title: "Guitar Lesson: Learn Your First 3 Chords", channel: "StringTheory", views: "120K views", time: "2 weeks ago", duration: "9:44", category: "music" },
  { title: "The Truth About Productivity Apps", channel: "MindsetShift", views: "410K views", time: "3 weeks ago", duration: "11:29", category: "podcasts" },
  { title: "Live Coding: Building a Chat App in Real Time", channel: "CodeCraft", views: "78K views", time: "Streamed 2 days ago", duration: "LIVE", category: "live" },
  { title: "Mount Fuji Hiking Vlog — Full Journey", channel: "WanderLens", views: "540K views", time: "1 month ago", duration: "22:18", category: "travel" },
  { title: "Quick Desk Setup Tour 2026", channel: "TechDaily", views: "95K views", time: "6 days ago", duration: "6:52", category: "coding" },
  { title: "Ranked Match Highlights — Insane Comeback", channel: "GameZone", views: "1.8M views", time: "5 hours ago", duration: "13:37", category: "gaming", trending: true },
  { title: "5-Ingredient Dinners for Busy Weeknights", channel: "CookWithMe", views: "310K views", time: "2 days ago", duration: "9:58", category: "cooking" },
  { title: "Deep Focus Lo-Fi — 3 Hour Mix", channel: "LoFi Beats", views: "2.1M views", time: "1 year ago", duration: "3:00:00", category: "music" },
  { title: "Breaking Down This Week's Biggest Headlines", channel: "NewsDesk", views: "150K views", time: "6 hours ago", duration: "20:11", category: "news", trending: true },
  { title: "Full Body Stretch Routine — 15 Minutes", channel: "FitZone", views: "88K views", time: "1 week ago", duration: "15:00", category: "fitness" },
  { title: "🔴 LIVE: Late Night Chill Stream", channel: "LoFi Beats", views: "12K watching", time: "Live now", duration: "LIVE", category: "live" },
];

// ---- Page definitions: title + how to select videos for that page ----
const PAGES = {
  home:      { title: "Home",          videos: () => ALL_VIDEOS },
  trending:  { title: "Trending",      videos: () => ALL_VIDEOS.filter(v => v.trending) },
  subscriptions: { title: "Subscriptions", videos: () => ALL_VIDEOS.filter(v => ['GameZone', 'CookWithMe', 'LoFi Beats'].includes(v.channel)) },
  library:   { title: "Library",       videos: () => [] },
  history:   { title: "History",       videos: () => ALL_VIDEOS.slice(0, 5) },
  "your-videos": { title: "Your videos", videos: () => [] },
  "watch-later": { title: "Watch later", videos: () => [] },
  "channel-gamezone":   { title: "GameZone",   videos: () => ALL_VIDEOS.filter(v => v.channel === "GameZone") },
  "channel-cookwithme": { title: "CookWithMe", videos: () => ALL_VIDEOS.filter(v => v.channel === "CookWithMe") },
  "channel-lofibeats":  { title: "LoFi Beats", videos: () => ALL_VIDEOS.filter(v => v.channel === "LoFi Beats") },
};

let currentCategory = 'all';

function renderVideoCards(list) {
  const grid = document.getElementById('videoGrid');
  const emptyState = document.getElementById('emptyState');

  if (list.length === 0) {
    grid.innerHTML = '';
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  grid.innerHTML = list.map((v, i) => `
    <div class="video-card">
      <div class="thumb-wrap">
        <img src="https://picsum.photos/seed/streamhub-${v.channel}-${i}/400/225" alt="${v.title}" loading="lazy">
        <span class="duration">${v.duration}</span>
      </div>
      <div class="video-info">
        <div class="channel-avatar" style="background:${randomColor(i)}">${initials(v.channel)}</div>
        <div class="video-text">
          <div class="video-title">${v.title}</div>
          <div class="video-meta">${v.channel}</div>
          <div class="video-meta">${v.views} • ${v.time}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function applyFilters(pageKey) {
  const page = PAGES[pageKey] || PAGES.home;
  let list = page.videos();
  if (currentCategory !== 'all') {
    list = list.filter(v => v.category === currentCategory);
  }
  renderVideoCards(list);
}

function setActiveSidebarLink(pageKey) {
  document.querySelectorAll('.side-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageKey);
  });
}

function navigateTo(pageKey) {
  if (!PAGES[pageKey]) pageKey = 'home';
  document.getElementById('pageTitle').textContent = PAGES[pageKey].title;
  setActiveSidebarLink(pageKey);

  // Chips only make sense on feeds with mixed categories; hide them on
  // pages that are empty by design (library, history, watch later etc.)
  const chips = document.getElementById('chips');
  const showChips = ['home', 'trending', 'subscriptions', 'channel-gamezone', 'channel-cookwithme', 'channel-lofibeats'].includes(pageKey);
  chips.style.display = showChips ? 'flex' : 'none';

  applyFilters(pageKey);

  // Close mobile sidebar after navigating
  if (window.innerWidth <= 900) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function currentPageFromHash() {
  return (location.hash || '#home').replace('#', '');
}

function initRouting() {
  window.addEventListener('hashchange', () => navigateTo(currentPageFromHash()));
  navigateTo(currentPageFromHash());
}

// ---- Sidebar toggle (collapse on desktop, slide-in on mobile) ----
function initSidebarToggle() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('.main');

  menuBtn.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.toggle('open');
    } else {
      sidebar.classList.toggle('collapsed');
      main.classList.toggle('expanded');
    }
  });
}

// ---- Chip filter ----
function initChips() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelector('.chip.active')?.classList.remove('active');
      chip.classList.add('active');
      currentCategory = chip.dataset.category;
      applyFilters(currentPageFromHash());
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  initChips();
  initRouting();
});
