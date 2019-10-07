playstop.addEventListener('click', playStop);
tempo.addEventListener('change', changeTempo);

var tempoVal = 120;
var playVal = false;
var position = 0;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);
gainNode.gain.value = 0.1;

function changeTempo() {
    tempoVal = tempo.value;
}

function playStop() {
    if (playVal === false) {
        playVal = true;
        metronome.children[0].focus();
        playNote();
        position = 1;
        theTempo = 1000 - (tempoVal - 60) * 8;
        interVal = setInterval(doPlay, theTempo);
    } else {
        playVal = false;
        clearInterval(interVal);
        position = 0;
    }
}

function playNote() {
    var sounded_note = audioCtx.createOscillator();
    sounded_note.type = 'sawtooth';

    if (position === 0) {
        sounded_note.frequency.value = 660;
    } else {
        if (position % 4 === 0) {
            sounded_note.frequency.value = 660;
        } else {
            sounded_note.frequency.value = 440;
        }
    }

    sounded_note.connect(gainNode);
    sounded_note.start(0);
    setTimeout(function() {
        sounded_note.stop();
    }, 20);
}

function doPlay() {
    var newposition = position +1;
    var oldposition = position -1;

    playNote();

    if (position === 0) {
        oldposition = metronome.childElementCount - 1;
    }
    if (position === metronome.childElementCount - 1) {
        newposition = 0;
    }
    metronome.children[position].focus();
    position = newposition;
}