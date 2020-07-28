function playSound(event){
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if (!audio) return;
    key.classList.add("playing")
    audio.currentTime = 0;
    audio.play()
}
function transitionOver(event){
    event.target.classList.remove("playing")
}

window.addEventListener("transitionend", transitionOver)

window.addEventListener("keydown", playSound);
