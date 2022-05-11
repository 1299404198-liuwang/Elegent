$(()=>{
    const imgArr=['Bat.png', 'Bones.png', 'Cauldron.png', 'Dracula.png', 'Eye.png', 'Ghost.png', 'Pumpkin.png', 'Skull.png']
    let kphtmls=imgArr.map(img=>`<div class="card">
    <div class="card-back card-item">
        <img class="kpicon icon-top-left" src="img/Cobweb.png" alt="">
        <img class="kpicon icon-top-right" src="img/Cobweb.png" alt="">
        <img class="kpicon icon-bottom-left" src="img/Cobweb.png" alt="">
        <img class="kpicon icon-bottom-right" src="img/Cobweb.png" alt="">
        <img class="spider" src="img/Spider.png" alt="">
    </div>
    <div class="card-face card-item">
        <img class="kpicon icon-top-left" src="img/CobwebGrey.png" alt="">
        <img class="kpicon icon-top-right" src="img/CobwebGrey.png" alt="">
        <img class="kpicon icon-bottom-left" src="img/CobwebGrey.png" alt="">
        <img class="kpicon icon-bottom-right" src="img/CobwebGrey.png" alt="">
        <img class="card-value" src="img/${img}" alt="">
    </div>
</div>`)
let fp=[...kphtmls,...kphtmls]
$("#kp").append(fp);
$(".card").click(function(){
    filpCard(this)
})
})
let filpCard =card=>{
    $(card).addClass("visible")
}