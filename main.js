const container = document.getElementById('container')
const cover = document.getElementById('cover')
const audio = document.getElementById('audio')
const title = document.getElementById('title')
const start = document.getElementById('start')
const end = document.getElementById('end')
const progressContainer = document.getElementById('progress-container')
const progressEl = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const repeatShuffleBtn = document.getElementById('repeat')
const volume = document.getElementById('volume')
const volumeIcon = document.getElementById('volume-icon')
const slideValue = document.getElementById('slide-value')
const accelerator = document.getElementById('accelerator')
const timeBackward = document.getElementById('time-backward')
const timeForward = document.getElementById('time-forward')
// icon prev next btn
const iconPrevNextBtn = document.querySelectorAll('.icon__prev-next')

const ulTagSongs = document.getElementById('song-container')
const musicNoteBtn = document.getElementById('music-note')

// music names
const songs = [
    {
        name: 'Ending - Isak Danielson',
        src: 'music-1'
    }, 
    {
        name: 'Heather - Conan Gray',
        src: 'music-2'
    },
    {
        name: 'Osmonlarda - Xamdam Sobirov',
        src: 'music-3'
    }, 
    {
        name: 'U okna - HammAli & Navai',
        src: 'music-4'
    },
    {
        name: 'Alan Walker - Faded',
        src: 'music-5'
    },
    {
        name: 'Alan Walker - Sing Me To Sleep',
        src: 'music-6'
    }
]

let indexSong = 0

function loadSong(song) {
    audio.src = `music/${songs[song].src}.mp3`
    cover.src = `image/${songs[song].src}.jpg`
    title.innerText = songs[song].name
}

// play music
function playSong() {
    container.classList.add('play')
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`
    audio.play()
}

// pause music
function pauseSong() {
    container.classList.remove('play')
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    audio.pause()
}

// nextMusic
function nextMusic() {
    indexSong++
    if(indexSong > songs.length - 1) {
        indexSong = 0
    }
    loadSong(indexSong)
    playSong()
    animationBtn(iconPrevNextBtn[1])
    playinNow()
}

// prevMusic
function prevMusic() {
    indexSong--
    if(indexSong < 0) {
        indexSong = songs.length - 1
    }
    loadSong(indexSong)
    playSong()
    animationBtn(iconPrevNextBtn[0])
    playinNow()
}

function isPressed() {
    const repeatPressed = repeatShuffleBtn.classList.contains('pressed')
    const shufflePressed = repeatShuffleBtn.getAttribute('id')
    const reset = repeatShuffleBtn.getAttribute('id')
    if(!repeatPressed) {
        repeatShuffleBtn.classList.add('pressed')
        container.classList.add('repeat-shuffle')
    } else if(!(shufflePressed == 'repeat')) {
        repeatShuffleBtn.setAttribute('id', 'repeat')
        repeatShuffleBtn.innerHTML = '<i class="fa-solid fa-repeat fas"></i>'
        repeatShuffleBtn.classList.remove('pressed')
        container.classList.remove('repeat-shuffle')
    } else if(reset == 'repeat') {
        repeatShuffleBtn.setAttribute('id', 'shuffle')
        repeatShuffleBtn.innerHTML = '<i class="fa-solid fa-shuffle fas"></i>'
    }
}

// repeat, shuffle function
function isRepeatShuffleFunc() {
    const isRepeatShuffle = container.classList.contains('repeat-shuffle')
    
    if(isRepeatShuffle) {
        const repeatSHuffle = repeatShuffleBtn.getAttribute('id')
        switch (repeatSHuffle) {
            case 'repeat': {
                audio.currentTime = 0
                audio.play()
                break
            }
            case 'shuffle': {
                const randomNum = Math.floor(Math.random() * songs.length)
                loadSong(randomNum)
                indexSong = randomNum
                playSong()
                break
            }
        }
    } else if(false) {
        prevMusic()
    } else {
        nextMusic()
    }
    playinNow()
}

// Progress
function progress(e) {
    const duration = e.srcElement.duration
    const curTime = e.srcElement.currentTime
    const presentageWidth = (curTime / duration) * 100
    progressEl.style.width = `${presentageWidth}%`
    
    // end time
    let endMinutes = Math.floor(duration / 60)
    let endSeconds = Math.floor(duration % 60)
    let endSec = endSeconds = endSeconds < 10 ? '0' + endSeconds : endSeconds
    end.textContent = `${endMinutes ? endMinutes : '0'}:${endSec ? endSec : '00'}`

    // start time
    let startMinutes = Math.floor(curTime / 60)
    let startSecondes = Math.floor(curTime % 60)
    start.textContent = `${startMinutes}:${startSecondes = startSecondes < 10 ? '0' + startSecondes : startSecondes}`
}

// setProgress
function setProgress(e) {
    const width = this.clientWidth
    const widthX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (widthX / width) * duration
}

// change volume
function changeVolume(e) {
    let volumeMusic = +volume.value / +volume.max
    audio.volume = volumeMusic
    if(volumeMusic == 0) {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-xmark" id="volume-icon"></i>'
    } else {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high" id="volume-icon"></i>'
    }
}
function slideVal() {
    let value = volume.value
    slideValue.textContent = value
    slideValue.style.left = (value) + '%'
    slideValue.classList.add('show')
}
window.addEventListener('keydown', (e)=> {
    audio.volume = volume.value / 100
    switch(e.code) {
        case 'ArrowUp':
            if(volume.value != 100) {
                try {
                    volume.value += 1
                }
                catch (err) {
                    volume.value = 100
                }
                slideVal()
                this.setTimeout(()=> {
                    slideValue.classList.remove('show')
                }, 800)
            }
            break
        case 'ArrowDown':
            if(volume.value != 0) {
                try {
                    volume.value -= 1
                }
                catch (err) {
                    volume.value = 0
                }
                slideVal()
                this.setTimeout(()=> {
                    slideValue.classList.remove('show')
                }, 800)
            }
            break
    }
    changeVolume()
})

// animation btn
function animationBtn(btn) {
    btn.classList.add('pressed')
    setTimeout(() => {
        btn.classList.remove('pressed')
    }, 200) 
}

// accelerator2X 
function accelerator2X() {
    accelerator.classList.toggle('pressed')
    const isAccelerator = accelerator.classList.contains('pressed')
    if (isAccelerator) {
        audio.playbackRate = 2
    } else {
        audio.playbackRate = 1
    }
}

// songs list
function songList() {
    musicNoteBtn.classList.toggle('pressed')
    const isPressed = musicNoteBtn.classList.contains('pressed')
    ulTagSongs.style.display = 'block'
    if(isPressed) {
        title.style.display = 'none'
        cover.parentElement.parentElement.style.display = 'none'
        ulTagSongs.classList.remove('repetition')
        ulTagSongs.classList.add('to-surface')
        for(i = 0; i < songs.length; i++) {
            const liTag = `
                <li li-index="${i}" class="song">
                    <i class="fa-solid fa-circle-play"></i>
                    <h4>${songs[i].name}</h4>
                    <audio class="${songs[i].src}" src = "music/${songs[i].src}.mp3"></audio>
                    <span id="${songs[i].src}">${audio.duration}</span>
                </li>
            `
            ulTagSongs.insertAdjacentHTML('beforeend', liTag)

            let liAudioTag = ulTagSongs.querySelector(`.${songs[i].src}`)
            let liAudioDuration = ulTagSongs.querySelector(`#${songs[i].src}`)

            liAudioTag.addEventListener('loadeddata', ()=> {
                let duration = liAudioTag.duration
                let endMinutes = Math.floor(duration / 60)
                let endSeconds = Math.floor(duration % 60)
                if(endSeconds < 10) {
                    endSeconds = `0${endSeconds}`
                }
                liAudioDuration.innerHTML = `${endMinutes}:${endSeconds}`
                liAudioDuration.setAttribute('t-duration', `${endMinutes}:${endSeconds}`)
            })
        }
    } else {
        ulTagSongs.classList.remove('to-surface')
        ulTagSongs.classList.add('repetition')
        setTimeout(() => {
            ulTagSongs.style.display = 'none'
            title.style.display = 'block'
            cover.parentElement.parentElement.style.display = 'flex'
            ulTagSongs.innerHTML = ''
        }, 1150) 
    }
    setTimeout(() => {
        playinNow()
    }, 100)
}
document.addEventListener('click', (e)=> {
    Array.from(ulTagSongs.children).forEach((child) => {
        if(e.target == child) {
            let getLiIndex = child.getAttribute('li-index')
            indexSong = getLiIndex
            loadSong(indexSong)
            playSong()
            playinNow()
        }
        allLiTags.push(child)
    })
})
const allLiTags = []
function playinNow() {
    for (j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector('span')
        if(allLiTags[j].classList.contains('playing')) {
            allLiTags[j].classList.remove('playing')
            let adDuration = audioTag.getAttribute('t-duration')
            audioTag.innerText = adDuration
        }
        if(allLiTags[j].getAttribute('li-index') == indexSong) {
            allLiTags[j].classList.add('playing')
            audioTag.innerText = 'Playing'
        }
    }
}


// events
playBtn.addEventListener('click', ()=> {
    const isPlaying = container.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
    playinNow()
})

nextBtn.addEventListener('click', isRepeatShuffleFunc)
prevBtn.addEventListener('click', prevMusic)
repeatShuffleBtn.addEventListener('click', isPressed)
musicNoteBtn.addEventListener('click', songList)
audio.addEventListener('timeupdate', progress)
audio.addEventListener('ended', isRepeatShuffleFunc)
progressContainer.addEventListener('click', setProgress)
accelerator.addEventListener('click', accelerator2X)
// volume
volume.addEventListener('input', changeVolume)
volume.addEventListener('input', slideVal)
volume.addEventListener('blur', ()=> {
    slideValue.classList.remove('show')
})

// events keys 
// play || pause - space key
document.addEventListener('keyup', (e)=> {
    if(e.code == 'Space') {
        const isPlaying = container.classList.contains('play')
        if (isPlaying) {
            pauseSong()
        } else {
            playSong()
        } 
    }
})

// next music - PageDown key
document.addEventListener('keyup', (e)=> {
    if(e.key == 'PageDown'){
        isRepeatShuffleFunc()
    }
})

// prev music - PageDown key
document.addEventListener('keyup', (e)=> {
    if(e.key == 'PageUp'){
        prevMusic()
    }
})

// timeForward - ArrowRight
window.addEventListener('keydown', (e)=> {
    if(e.code == 'ArrowRight') {
        audio.currentTime += 10
        timeForward.style.zIndex = '2'
        setTimeout(()=> {
            timeForward.style.zIndex = '-1'
        }, 500)
    }
})

// timeBackward - ArrowLeft
window.addEventListener('keydown', (e)=> {
    if(e.code == 'ArrowLeft') {
        audio.currentTime -= 10
        timeBackward.style.zIndex = '2'
        setTimeout(()=> {
            timeBackward.style.zIndex = '-1'
        }, 500)
    }
})