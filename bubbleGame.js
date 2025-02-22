function makeBubble(state) {
    let clutter = "";
    if(state){
        for(let i=0; i<152; i++){
            let random = Math.ceil(Math.random()*20);
            clutter += `<div class="bubble">${random}</div>`;
        }
        document.querySelector(".bottom").innerHTML = clutter;
        document.querySelector(".hit").textContent = Math.ceil(Math.random()*20);
    }
    else document.querySelector(".bottom").innerHTML = `<div style="width: 300px; height: 80px; font-size: 3rem; background-color:#DC143C; position:absolute;top:50%; text-align:center; border-radius: 8px;">Game Over</div> <div class="redo" style="width: 100px; height: 40px; font-size: 1.5rem; background-color:#DD6A00; position:absolute;top:85%;left:85%; text-align:center; border-radius: 8px; cursor: pointer">Reset</div>`;
}
let timer = document.querySelector(".timer");
setInterval(() => {
    let score = document.querySelector(".score").textContent;
    if(timer.textContent>0 && score>=0) timer.textContent--;
    if(timer.textContent==0){
        makeBubble(0);
        document.querySelector(".redo").addEventListener("click", reset);
    }
}, 1000);
document.querySelector(".bottom").addEventListener("click", (e) => {
    let hit = document.querySelector(".hit").textContent;
    if (e.target.classList.contains("bubble")){
        if(e.target.textContent == hit){
            document.querySelector(".score").textContent++;
            makeBubble(1);
        }
        else document.querySelector(".score").textContent--;
        if(document.querySelector(".score").textContent<0){
            makeBubble(0);
            document.querySelector(".redo").addEventListener("click", reset);
        }
    }
});

function reset(){
document.querySelector(".score").textContent = 0;
document.querySelector(".timer").textContent = 60;
makeBubble(1);
}

reset();