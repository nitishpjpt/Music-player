let currentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener("click" , () => {
    if (playBtn.className.includes('pause')) {
        music.play();
    }
    else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
});

//---------Setup--Music-----------------//

const setMusic = (i) => { 
    seekBar.value = 0; // set range slide value to 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formateTime(music.duration);
    }, 300);

}

setMusic(0);

// formating time in min and seconds formats //
const formateTime = (time) => {
    
    let min = Math.floor(time / 60);
     if (min <10) {
        min = `0${min}`;
     }

     let sec = Math.floor(time % 60);
     if (sec < 10) {
        sec = `0${sec}`;
     }
     return `${min} : ${sec}` ;

} 

//-------------Seekbar----------//

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formateTime(music.currentTime);
}, 500);

seekBar.addEventListener('change' , () => {
    music.currentTime = seekBar.value;
});

//jab--song--change--ho--tab---turant--play--hoga-----//
const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}



//--------forward----button----------//
forwardBtn.addEventListener('click' , () => {
    if(currentMusic >= songs.lenght -1) {
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});

//--------Backward----button----------//

backwardBtn.addEventListener('click' , () => {
    if(currentMusic <= 0) {
        currentMusic = songs.lenght -1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
   playMusic();
})






