// state is game state, whether playing(1) or game over(0), num is number of bubbles
function makeBubble(state, num) {
    let clutter = "";
    let arr = [];
    if(state){
        for(let i=0; i<num; i++){
            let random = Math.ceil(Math.random()*20);
            arr.push(random); // store the random numbers in array
            clutter += `<div class="bubble">${random}</div>`;
        }
        document.querySelector(".bottom").innerHTML = clutter;
        // the number to click is selected randomly from one of the bubbles, rather than generating a new random number which might or might not be in the bubbles
        document.querySelector(".hit").textContent = arr[Math.floor(Math.random() * num)];
    }
    else document.querySelector(".bottom").innerHTML = `<div id="over">Game Over</div><div id="replay">Reset</div>`;
}

// Timer logic and game over after time is up
let timer = document.querySelector(".timer");
setInterval(() => {
    let score = document.querySelector(".score").textContent;
    if(timer.textContent>0 && score>=0) timer.textContent--;
    if(timer.textContent==0){
        makeBubble(0, bubbles);
        document.querySelector("#replay").addEventListener("click", () => {reset(bubbles)});
    }
}, 1000);

// Check for valid bubble click and update the score
document.querySelector(".bottom").addEventListener("click", (e) => {
    let hit = document.querySelector(".hit").textContent;
    if (e.target.classList.contains("bubble")){
        if(e.target.textContent == hit){
            document.querySelector(".score").textContent++;
            makeBubble(1, bubbles);
        }
        else document.querySelector(".score").textContent--;
        if(document.querySelector(".score").textContent<0){
            makeBubble(0, bubbles);
            document.querySelector("#replay").addEventListener("click", () => {reset(bubbles)});
        }
    }
});

// Start/restart the game
function reset(num){
    document.querySelector(".score").textContent = 0;
    document.querySelector(".timer").textContent = 60;
    makeBubble(1, num);
}

// Calculating number of bubbles required according to window size

let padd = parseFloat(getComputedStyle(document.querySelector(".bottom")).padding);
let marg = parseFloat(getComputedStyle(document.querySelector(".bubble")).margin);

let bottomWidth = parseFloat(getComputedStyle(document.querySelector(".bottom")).width);
let bottomHeight = parseFloat(getComputedStyle(document.querySelector(".bottom")).height);

let bubbleWidth = parseFloat(getComputedStyle(document.querySelector(".bubble")).width);
let bubbleHeight = parseFloat(getComputedStyle(document.querySelector(".bubble")).height);

let colno = Math.floor((bottomWidth - (2*padd))/(bubbleWidth + (2*marg)));
let rowno = Math.floor((bottomHeight - (2*padd))/(bubbleHeight + (2*marg)));
bubbles = colno*rowno;

reset(bubbles);

// Reload the page on 0.3 sec after user stops resizing
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {location.reload()} , 300); // Adjust delay as needed
});
