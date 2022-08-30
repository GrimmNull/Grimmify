console.log("Hello from JavaScript!");
const songList = [
    {
        imageLink: "./assets/Led Zeppelin.jpeg",
        title: "Dazed and Confused",
        album: "Led Zeppelin",
        duration: "6:24"
    },
    {
        imageLink: "./assets/Creatures of habits.jpeg",
        title: "The Drunk",
        album: "Creatures of Habit",
        duration: "3:54"
    },
];

window.onload = function() {
    const songsWrapper = document.getElementById("songs-wrapper");
    songsWrapper.innerHTML="";
    for (let i =0; i < songList.length; i++) {
        songsWrapper.innerHTML += melodyComponent(i + 1, songList[i]);
    }
}

const melodyComponent = function (index, songInfo) {
    return `<div class="melody">
    <span class="song-nr">
        ${index}
    </span>
    <img src="${songInfo.imageLink}" class="song-cover">
    </img>
    <span class="song-title">
        ${songInfo.title}
    </span>
    <span class="song-album">
        ${songInfo.album}
    </span>
    <span class="song-duration">
        ${songInfo.duration}
    </span>
</div>`
}