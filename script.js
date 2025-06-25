console.log("Lesss Go");
let currentSong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    let a = await fetch("songs/")
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith("mp3")) {
            songs.push(element.href.split("songs/")[1].split(".mp3")[0])
        }
    }
    return songs;

}

currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = `${(currentSong.currentTime) / (currentSong.duration) * 100}%`



    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = e.offsetX / e.target.getBoundingClientRect().width * 100
        document.querySelector(".circle").style.left = `${e.offsetX / e.target.getBoundingClientRect().width * 100
            }%`
        currentSong.currentTime = percent * currentSong.duration / 100
    })


})

const PlayMusic = (track) => {
    console.log(track)
    currentSong.src = "/songs/" + track + ".mp3"
    let audio = new Audio("/songs/" + track + ".mp3")
    currentSong.play()
    document.querySelector(".songname").innerHTML = `${track.replaceAll("%20", " ")}`

}

async function main() {


    songs = await getSongs();
    console.log(songs);

    PlayMusic(songs[0].replace("%20", " "), true)

    let songL = document.querySelector(".songL").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songL.innerHTML = songL.innerHTML + `<li>
                            <div class="flex">
                            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg class="invert musicsvg" width="10px" height="10px" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 1H4V9H3C1.34315 9 0 10.3431 0 12C0 13.6569 1.34315 15 3 15C4.65685 15 6 13.6569 6 12V5H13V9H12C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V1Z"
                                    fill="#000000" />
                            </svg>
                            
                            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg class="invert playsvg" width="10px" height="10px" viewBox="-3 0 28 28" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">

                                <title>play</title>
                                <desc>Created with Sketch Beta.</desc>
                                <defs>

                                </defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                    sketch:type="MSPage">
                                    <g id="Icon-Set-Filled" sketch:type="MSLayerGroup"
                                        transform="translate(-419.000000, -571.000000)" fill="#000000">
                                        <path
                                            d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554"
                                            id="play" sketch:type="MSShapeGroup">

                                        </path>
                                    </g>
                                </g>
                            </svg>
                            </div>
                            <div class="SAname">
                                <span>${song.replaceAll("%20", " ")}</span>
                                <div>Olakh</div>
                            </div>
                        </li>`;
    }


    // var audio = new Audio(songs[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     // console.log(audio.duration, audio.currentSrc, audio.currentTime);
    // })

    Array.from(document.querySelector(".songL").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            const playButton = document.getElementById('playbtn');
            playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
            console.log(e.querySelector(".SAname").firstElementChild.innerHTML);
            PlayMusic(e.querySelector(".SAname").firstElementChild.innerHTML.trim())
        })
    })

    const playButton = document.getElementById('playbtn');
    const playButtonSVG = document.getElementById('playbtnsvg');
    playButton.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        }
        else {
            currentSong.pause()
            playButton.innerHTML = `<svg id="playbtnsvg1" width="60" height="60" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="24" fill="#fff" />
                        <path d="M34 24L16 14V34L34 24Z" fill="#000" />
                    </svg>`
        }
    })


    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("songs/")[1].split(".mp3")[0])
        let length = songs.length

        if (index == 0) {
            PlayMusic(songs[length - 1])
        }
        else { PlayMusic(songs[index - 1]) }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("songs/")[1].split(".mp3")[0])
        let length = songs.length

        if (index + 1 >= length) {
            PlayMusic(songs[0])
        }
        else { PlayMusic(songs[index + 1]) }
    })

    s1.addEventListener("click", () => {
        const playButton = document.getElementById('playbtn');
playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        PlayMusic(songs[0])
    })
    s2.addEventListener("click", () => {
        const playButton = document.getElementById('playbtn');
playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        PlayMusic(songs[1])
    })
    s3.addEventListener("click", () => {
        const playButton = document.getElementById('playbtn');
playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        PlayMusic(songs[2])
    })
    s4.addEventListener("click", () => {
        const playButton = document.getElementById('playbtn');
playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        PlayMusic(songs[3])
    })
    s5.addEventListener("click", () => {
        const playButton = document.getElementById('playbtn');
playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        PlayMusic(songs[4])
    })
    s6.addEventListener("click", () => {
        const playButton = document.getElementById('playbtn');
playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        PlayMusic(songs[5])
    })
    s7.addEventListener("click", () => {
        const playButton = document.getElementById('playbtn');
playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        PlayMusic(songs[6])
    })
    s8.addEventListener("click", () => {
        const playButton = document.getElementById('playbtn');
playButton.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg id="playbtnsvg2" width="60px" height="60px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#000000"/>
<path d="M14 1H9V15H14V1Z" fill="#000000"/>
</svg>`
        PlayMusic(songs[7])
    })


}

main()



