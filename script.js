const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const timeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// music
const songs = [
  {
    name: "Madeon - The City",
    displayName: "The City",
    artist: "Madeon",
  },
  {
    name: "Calvin Harris - Thinking About You",
    displayName: "Thinking About You",
    artist: "Calvin Harris",
  },
  {
    name: "James Woods & Talamanca - Arrival",
    displayName: "Arrival",
    artist: "James Woods & Talamanca",
  },
  {
    name: "Matt Fax - Orion",
    displayName: "Orion",
    artist: "Matt Fax",
  },
];

// check id play
let isPlay = false;

// play
function playSong() {
  isPlay = true;
  play.classList.replace("fa-play-circle", "fa-pause-circle");
  play.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlay = false;
  play.classList.replace("fa-pause-circle", "fa-play-circle");
  play.setAttribute("title", "Play");
  music.pause();
}

// play or pause event listener

play.addEventListener("click", () => {
  isPlay ? pauseSong() : playSong();
});

// update dom

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong() {
  songIndex++;
  console.log(songIndex);
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
  console.log(songIndex);
}
// on load
loadSong(songs[songIndex]);

// update progress bar function

function updateProgress(e) {
  if (isPlay) {
    const { duration, currentTime } = e.srcElement;
    const progressPer = (currentTime / duration) * 100;
    progress.style.width = `${progressPer}%`;
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }
    if (durationSec) {
      durationEl.textContent = `${durationMin}:${durationSec}`;
    }
    // calc display
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    timeEl.textContent = `${currentMin}:${currentSec}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickx = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickx / width) * duration;
}

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
