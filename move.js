const bird = document.getElementById('bird');
const body = document.getElementById('body');
const pillar = document.getElementById('pillar');

let villianCount = 0;
let score = document.getElementById('score');
// score.value = villianCount;
// onclick goes up
body.addEventListener("click", () => {
    bird.style.top = (bird.offsetTop - 65) + "px";
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.key === " ") {
        bird.style.top = (bird.offsetTop - 65) + "px";
    }
});

function moveBird() {
    // every sec moves down
    bird.style.top = (bird.offsetTop + 20) + "px";
    setTimeout(moveBird, 100);
}

function movePillar() {
    pillar.style.left = (pillar.offsetLeft - 20) + "px";
    setTimeout(movePillar, 100);
}

function collision() {
    // 1. UPDATE variables inside the loop so they are always fresh
    let birdX = bird.offsetLeft;
    let birdY = bird.offsetTop;
    let pillarX = pillar.offsetLeft;
    let pillarY = pillar.offsetTop;

    // Bird Size (from CSS)
    let birdW = 50;
    let birdH = 50;

    // Pillar Size (from CSS)
    let pillarW = 200;
    let pillarH = 200;

    // 2. CHECK if rectangles overlap OR if bird goes out of bounds
    if (
        (birdX < pillarX + pillarW && // Bird Left is to the left of Pillar Right
            birdX + birdW > pillarX && // Bird Right is to the right of Pillar Left
            birdY < pillarY + pillarH && // Bird Top is above Pillar Bottom
            birdY + birdH > pillarY) ||   // Bird Bottom is below Pillar Top
        birdY < 0 ||                 // Bird goes above the screen
        birdY + birdH > window.innerHeight // Bird goes below the screen
    ) {
        alert("Game Over");
        location.reload();
    }

    setTimeout(collision, 20); // Check very often
}

function newPillar() {
    // 1. UPDATE variables inside the loop so they are always fresh
    let birdX = bird.offsetLeft;
    let birdY = bird.offsetTop;
    let pillarX = pillar.offsetLeft;
    let pillarY = pillar.offsetTop;
    //new pilar come
    if (pillarX < -200) {
        pillar.style.left = 700 + "px";
        pillar.style.top = Math.floor(Math.random() * 360) + "px";
        console.log(pillarY);
        // movePillar();
        // setTimeout(movePillar, 100);
        if (villianCount % 5 == 1) {
            pillar.style.backgroundImage = "url('images/Itachi-2.png')";
        }
        else if (villianCount % 5 == 2) {
            pillar.style.backgroundImage = "url('images/Madara-2.png')";
        }
        else if (villianCount % 5 == 3) {
            pillar.style.backgroundImage = "url('images/Obito-2.png')";
        }
        else if (villianCount % 5 == 4) {
            pillar.style.backgroundImage = "url('images/Hidan.png')";
        }
        else {
            pillar.style.backgroundImage = "url('images/Orochimaru-2.png')";
        }
        villianCount++;
        // score.value = villianCount;
        score.innerText = "Score: " + villianCount;
    }

    setTimeout(newPillar, 100);
}

// to add bg music
const bgMusic = new Audio('naruto_konoha.mp3');
bgMusic.loop = true;

// Try to play immediately; if blocked, play on first interaction (click or keypress)
bgMusic.play().catch(() => {
    console.log("Autoplay blocked. Waiting for user interaction.");
    const startAudio = () => {
        bgMusic.play();
        // Remove listeners once played
        document.removeEventListener("click", startAudio);
        document.removeEventListener("keydown", startAudio);
    };
    document.addEventListener("click", startAudio);
    document.addEventListener("keydown", startAudio);
});

// Game Start Logic
function startGame() {
    movePillar();
    moveBird();
    collision();
    newPillar();
}

function startCountdown() {
    // 1st pillar, Pain, set him from a bit below
    pillar.style.top = "350px";

    let count = 3;
    const timerElem = document.getElementById('timer');
    timerElem.innerText = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            timerElem.innerText = count;
        } else {
            clearInterval(interval);
            timerElem.innerText = "";
            startGame();
        }
    }, 1000);
}

startCountdown();

