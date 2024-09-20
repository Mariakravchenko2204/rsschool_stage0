const data = JSON.parse(songs);


const artist = document.querySelector(".artist");
const song = document.querySelector(".song");
const playPauseButton = document.querySelector(".play");

const currenTime = document.querySelector(".current__time");
const songDuration = document.querySelector(".song__duration");
const audio = document.getElementById("audio");
let isPlay = false;
const progressBar = document.querySelector(".progress__bar");

function initialLoad() {
    artist.innerHTML = data[0].artist;
    song.innerHTML = data[0].song;
    playPauseButton.src = './assets/svg/play.png';
    currenTime.innerHTML = '00:00';
    audio.src = `./assets/audio/${data[0].audio}`;
    audio.currentTime = 0;
    console.log("hello", audio.duration);
}

initialLoad();

playPauseButton.addEventListener('click', () => {
    if (!isPlay) {
        audio.play();
        playPauseButton.src = './assets/svg/pause.png';

        progressBar.max = audio.duration;
        console.log(audio.duration);
        const duration = audio.duration;
        const mins = Math.floor(duration / 60);
        const seconds = Math.floor(duration - (mins * 60));
        console.log(mins + ':' + seconds)
        progressBar.style.width = 100;
        songDuration.innerHTML = mins + ':' + seconds;
    } else {
        audio.pause();
        playPauseButton.src = './assets/svg/play.png';
    }
    isPlay = !isPlay;

});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    progressBar.value = currentTime;
    const currentMins = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const secondsFormatter = (currentSeconds < 10 ? '0' : '') + currentSeconds
    currenTime.innerHTML = `${currentMins}:${secondsFormatter}`


})