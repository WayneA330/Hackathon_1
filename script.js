// START PAGE

// Audio Button - music
function audio_button() {
    let audio_button_change = document.getElementById('audio');
    let audio_control = document.getElementById('audio_tag')

    if (audio_button_change.className == 'bi bi-volume-mute-fill fa-2x') {
        audio_button_change.setAttribute('class', 'bi bi-volume-up-fill fa-2x');
        audio_control.play();
    }
    else {
        audio_button_change.setAttribute('class', 'bi bi-volume-mute-fill fa-2x');
        audio_control.pause();
    }
}