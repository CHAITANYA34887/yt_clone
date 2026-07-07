// ---- Sample video data (placeholder content, no real branding) ----
const CHANNEL_COLORS = ['#FF3B3B', '#1a73e8', '#0f9d58', '#f4b400', '#8e24aa', '#00acc1', '#e67c00', '#5c6bc0'];

function randomColor(seed) {
  return CHANNEL_COLORS[seed % CHANNEL_COLORS.length];
}

const videos = [
  { title: "Building a Full Stack App From Scratch — Complete Tutorial", channel: "CodeCraft", views: "482K views", time: "2 days ago", duration: "18:24" },
  { title: "10 Minute Morning Workout for Beginners", channel: "FitZone", views: "1.2M views", time: "1 week ago", duration: "10:03" },
  { title: "Exploring the Streets of Kyoto at Night 🌆", channel: "WanderLens", views: "302K views", time: "3 days ago", duration: "14:52" },
  { title: "Lo-Fi Beats to Study and Relax", channel: "LoFi Beats", views: "5.6M views", time: "6 months ago", duration: "1:02:11" },
  { title: "How Black Holes Actually Work", channel: "SciSimple", views: "890K views", time: "4 days ago", duration: "12:40" },
  { title: "Easy Homemade Pasta Recipe", channel: "CookWithMe", views: "231K views", time: "5 days ago", duration: "8:17" },
  { title: "Top 5 Plot Twists in Modern Gaming", channel: "GameZone", views: "654K views", time: "1 day ago", duration: "16:05" },
  { title: "Guitar Lesson: Learn Your First 3 Chords", channel: "StringTheory", views: "120K views", time: "2 weeks ago", duration: "9:44" },
  { title: "The Truth About Productivity Apps", channel: "MindsetShift", views: "410K views", time: "3 weeks ago", duration: "11:29" },
  { title: "Live Coding: Building a Chat App in Real Time", channel: "CodeCraft", views: "78K views", time: "Streamed 2 days ago", duration: "LIVE" },
  { title: "Mount Fuji Hiking Vlog — Full Journey", channel: "WanderLens", views: "540K views", time: "1 month ago", duration: "22:18" },
  { title: "Quick Desk Setup Tour 2026", channel: "TechDaily", views: "95K views", time: "6 days ago", duration: "6:52" },
];

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function renderVideos() {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = videos.map((v, i) => `
    <div class="video-card">
      <div class="thumb-wrap">
        <img src="https://picsum.photos/seed/streamhub${i}/400/225" alt="${v.title}" loading="lazy">
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

// ---- Sidebar toggle ----
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

// ---- Chip filter (visual only) ----
function initChips() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelector('.chip.active')?.classList.remove('active');
      chip.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderVideos();
  initSidebarToggle();
  initChips();
});
