const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const backwardButton = document.getElementById('backward');
const forwardButton = document.getElementById('forward');
const progressBar = document.getElementById('progress-fill');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const volumeIcon = document.getElementById('volume-icon');
const audioPlayer = document.getElementById('audio-player');

let isPlaying = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playButton.innerHTML = '&#9654;';
    } else {
        audioPlayer.play().catch(err => {
            console.error('Error trying to play audio:', err);
        });
        playButton.innerHTML = '&#10074;&#10074;';
    }
    isPlaying = !isPlaying;
}

audioPlayer.addEventListener('canplay', () => {
    totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

prevButton.addEventListener('click', () => {
    audioPlayer.currentTime = 0;
});

nextButton.addEventListener('click', () => {
    audioPlayer.currentTime = audioPlayer.duration;
});

backwardButton.addEventListener('click', () => {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
});

forwardButton.addEventListener('click', () => {
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
});

volumeIcon.addEventListener('click', () => {
    audioPlayer.muted = !audioPlayer.muted;
    volumeIcon.textContent = audioPlayer.muted ? '🔇' : '🔊';
});

playButton.addEventListener('click', togglePlay);
