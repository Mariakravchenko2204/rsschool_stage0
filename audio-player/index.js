const data = JSON.parse(songs);

let currentSong = 0;
let numberOfSongs = data.length;
const artist = document.querySelector(".artist");
const song = document.querySelector(".song");
const playPauseButton = document.querySelector(".play");
const currenTime = document.querySelector(".current__time");
const songDuration = document.querySelector(".song__duration");
const audio = document.getElementById("audio");
const picture = document.querySelector(".song__picture");
let isPlay = false;
const progressBar = document.querySelector(".progress__bar");
const background = document.getElementById("bg")
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev"); ']'


function loadSong(index) {
    const music = data[index]
    artist.innerHTML = music.artist;
    song.innerHTML = music.song;
    playPauseButton.src = './assets/svg/play.png';
    currenTime.innerHTML = '00:00';
    audio.src = `./assets/audio/${music.audio}`;
    audio.currentTime = 0;
    picture.src = `./assets/img/${music.label}`;
    background.src = `./assets/img/${music.label}`;
    audio.onloadedmetadata = function () {
        const duration = audio.duration;
        setProgressBar(duration)
    }
}

function setProgressBar(duration) {
    const mins = Math.floor(duration / 60);
    const seconds = Math.floor(duration - (mins * 60));
    songDuration.innerHTML = mins + ':' + seconds;
    progressBar.max = duration;
}

function playSong() {
    audio.play();
    playPauseButton.src = './assets/svg/pause.png';
    audio.onloadedmetadata = function () {
        const duration = audio.duration;
        setProgressBar(duration)
    }
    isPlay = true;
}

function playSongByClick() {
    audio.play();
    playPauseButton.src = './assets/svg/pause.png';
    const duration = audio.duration;
    setProgressBar(duration)
    isPlay = true;
}

function playNextSong() {
    songDuration.innerHTML = '';
    if (currentSong === (numberOfSongs - 1)) {
        console.log("last song")
        currentSong = 0;
    } else {
        currentSong += 1;
    }
    loadSong(currentSong);
    playSong();
}

loadSong(currentSong);

playPauseButton.addEventListener('click', () => {
    if (!isPlay) {
        playSongByClick()
    } else {
        audio.pause();
        playPauseButton.src = './assets/svg/play.png';
        isPlay = !isPlay;
    }
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    progressBar.value = currentTime;
    const currentMins = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const secondsFormatter = (currentSeconds < 10 ? '0' : '') + currentSeconds;
    currenTime.innerHTML = `${currentMins}:${secondsFormatter}`;
});

nextButton.addEventListener('click', () => {
    playNextSong();
})

prevButton.addEventListener('click', () => {

    songDuration.innerHTML = '';
    if (currentSong === 0) {
        currentSong = numberOfSongs - 1;
    } else {
        currentSong -= 1;
    }

    loadSong(currentSong)
    playSong();
})

progressBar.addEventListener('input', (event) => {
    audio.currentTime = event.target.value;
})

audio.addEventListener('ended', () => {
    playNextSong();
})
