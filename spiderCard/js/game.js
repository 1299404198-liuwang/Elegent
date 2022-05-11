// 存储翻牌次数
let fpcount = 0;
// 存储翻牌的span标签
let fpspan;
// 存储倒计时的开始
let timeval = 20;
// 存储倒计时span标签
let timespan;
//存储单张卡牌
let cardCheck;
// 创建本地存储
localStorage.setItem("sum", 100)
localStorage.setItem("time", 100)
//
let cishuArr = []
let timeArr = []
$(() => {


    const imgArr = ['Bat.png', 'Bones.png', 'Cauldron.png', 'Dracula.png', 'Eye.png', 'Ghost.png', 'Pumpkin.png', 'Skull.png']
    let kphtmls = imgArr.map(img => `<div class="card">
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
</div>`);
    // 迭代两遍kphtmls(es6语法)
    let fp = [...kphtmls, ...kphtmls]
    //将数组打乱,实现随机
    // fp.sort(function(a, b){return 0.5 - Math.random()}); 
    $("#kp").append(fp);
    $(".card").click(function () {
        console.log("hello...")
        filpCard(this)
    });

    fpspan = $("#flips");
    timespan = $("#timeval");
    // 点击开始文字事件
    $(".game-text").click(function () {
        $(this).removeClass("visible")
        startgame()
        // startCountdown();
    })
})
// 游戏开始方法

let startgame = () => {
    // 游戏开始将翻牌次数重置
    fpspan.html("0")
    // 将卡牌翻转回来
    // 将为数组变成真数组
    let cards = Array.from($(".card"))
    cards.forEach(card => {
        $(card).removeClass("visible")
    })
    // for(c of cards){
    //     $(c).removeClass("visible")
    // }
    startCountdown()
    //实例化音乐对象

    gm.startBGMmusic()
}

class gameMusic {
    //属性

    //函数
    constructor() {
        // 开始音乐方法
        this.bgmmusic = new Audio("mp3/zhiwu.mp3");
        this.bgmmusic.loop = true;
        // 游戏结束音乐
        this.gameoutMusic = new Audio("mp3/gameout.mp3")
        // 游戏翻牌音效
        this.filpMusic = new Audio("sound/flip.wav")
        //匹配成功音效
        this.chokBGM = new Audio("mp3/peidui.mp3")
        //通关音效
        this.victoryMusic = new Audio("sound/victory.wav")
        this.victoryMusic.loop = true;
    }
    // 开始音乐方法
    startBGMmusic = () => {
        this.bgmmusic.play()
        if (this.gameoutMusic.play) {
            this.gameoutMusic.pause()
            //将结束音乐归0，以便重新开始使用
            this.gameoutMusic.currentTime = 0;
        }
        if (this.victoryMusic.play) {
            console.log("播放胜利")
            this.victoryMusic.pause()
            //将结束音乐归0，以便重新开始使用
            this.victoryMusic.pause()
        }

    }
    // 游戏结束音乐
    startgameoutMusic = () => {
        this.gameoutMusic.play()
        if (this.bgmmusic.play) {
            this.bgmmusic.pause()
            //将背景音乐归0，以便重新开始使用
            this.bgmmusic.currentTime = 0;
        }
    }
    // 游戏翻牌音效
    startfilpMusic = () => {
        this.filpMusic.play()
    }
    //匹配成功音效
    cardmatchokBGM = () => {
        this.chokBGM.play()
    }
    //通关音效
    gameVictory = () => {
        this.bgmmusic.pause()
        //将背景音乐归0，以便重新开始使用
        this.bgmmusic.currentTime = 0;
        this.gameoutMusic.pause()
        //将结束音乐归0，以便重新开始使用
        this.gameoutMusic.currentTime = 0;
        this.victoryMusic.play()
    }
}
let gm = new gameMusic();
// 翻牌方法
let filpCard = card => {
    gm.startfilpMusic()
    // 根据点击对象是否有visible类名来判断是否翻牌次数需要加一
    if (!card.classList.contains("visible")) {
        fpcount++;
        fpspan.html(fpcount)
        $(card).addClass("visible")
        if (cardCheck) {
            console.log("有牌...")
            checkForCardMatch(card)
        } else {
            console.log("空...")
            cardCheck = card
        }
    }

}
// 判断牌是否一样
let checkForCardMatch = card => {
    // 取第二张牌的路径
    let src2 = $(card).find("img.card-value").attr("src")
    console.log("第二张牌的路劲" + src2)
    // 取第一张牌的路径
    let src1 = $(cardCheck).find("img.card-value").attr("src")
    console.log("第一张牌的路劲" + src1)
    if (src1 == src2) {
        console.log("匹配成功")
        cardMatchok(card, cardCheck)
    } else {
        console.log("匹配失败")
        cardMatchmis(card, cardCheck)
    }
    cardCheck = null
}
//匹配失败的方法
let cardMatchmis = (c1, c2) => {
    setTimeout(() => {
        $(c1).removeClass("visible")
        $(c2).removeClass("visible")
    }, 1000);
}
//匹配成功的方法
let cardMatchok = (c1, c2) => {
    // console.log(c1)
    //获取到两张卡牌中的动物图案对象，使其抖动
    let imgvalue1 = $(c1).find("img.card-value")
    let imgvalue2 = $(c2).find("img.card-value")
    $(imgvalue1).addClass("cardmatchok")
    $(imgvalue2).addClass("cardmatchok")
    //匹配成功音效
    gm.cardmatchokBGM()
    //获取有多少张匹配成功了
    let cardList = $(".visible")
    console.log(cardList.length)
    if (cardList.length == 16) {
        $(".fpnum").html(fpcount)
        $(".gametime").html(20 - timeval)
        upPaiHangData(fpcount, (20 - timeval))
        $("#gameVictory").addClass("visible")
        timeval = 21
        fpcount = 0;
        gm.gameVictory()
        //通关后将倒计时停止
        clearInterval(timesetinter)
    }
}
// 倒计时方法
let timesetinter;
let startCountdown = () => {
    console.log("开始倒计时...")
    timesetinter = setInterval(() => {
        timeval--;
        timespan.html(timeval)
        if (timeval == 0) {
            clearInterval(timesetinter)
            // alert("时间到")
            $("#gameOver").addClass("visible")
            gm.startgameoutMusic()
            //游戏失败将游戏时间重置（设置为6因为点击开始计时器已经走了一秒）
            timeval = 21
            //游戏失败将游戏次数重置（设置为6因为点击开始计时器已经走了一秒）
            fpcount = 0
            timespan.html("0")

        }
    }, 1000);
    return timesetinter
}

let upPaiHangData = (chishu, time) => {
    // 将时间和次数存在相应的数组里
    cishuArr.push(chishu)
    timeArr.push(time)
    //将数组冒泡排序
    dataPaixu()
    console.log(cishuArr[0])
    console.log(timeArr[0])
    // 本地存储游戏用时和次数
    console.log(localStorage.getItem("time"))
    console.log(localStorage.getItem("sum"))

    // if (time < localStorage.getItem("time")) {
    //     $(".timeData").html(time)

    //     localStorage.setItem("time", time)
    // } else {
    //     $(".timeData").html(localStorage.getItem("time"))
    // }
    // if (chishu < localStorage.getItem("sum")) {
    //     $(".numData").html(chishu)
    //     localStorage.setItem("sum", chishu)
    // } else {
    //     $(".numData").html(localStorage.getItem("sum"))
    // }
    // console.log(localStorage.getItem("time"))
}

//冒泡方法
let dataPaixu = () => {
    // for(var i=0;i<cishuArr.length;i++){
    //     for(var j=1;j<cishuArr.length-1;j++){
    //         if(cishuArr[i]<cishuArr[j]){
    //             let t=cishuArr[i]
    //             cishuArr[i]=cishuArr[j]
    //             cishuArr[j]=t
    //         }
    //     }
    // }
    //对数组进行升序排列
    cishuArr.sort()
    for (var k = 0; k < cishuArr.length; k++) {
        console.log("数组长度：" + cishuArr.length)
        console.log(cishuArr[k])
    }
    shuxing()
}
//渲染排行版
let shuxing = () => {
    // console.log("现在的次数" + cishuArr)
    if(cishuArr.length==4){
        cishuArr.splice(3,1)
    }
    $(".paihangdata").html("")
    let paihangHtml
    for (var i = 0; i < cishuArr.length; i++) {
        paihangHtml = "NO."+(i+1)+".  <span class='numData'>" + cishuArr[i] + "</span>次<br/>"
        console.log(paihangHtml)
        $(".paihangdata").append(paihangHtml)
    }
}
//暂停
let a=2;
let zanting=()=>{
   if(a%2==0){
       a++
    gm.bgmmusic.pause()
    clearInterval(timesetinter)

    $(".mengban").addClass("nomengban")
   }else {
       a--
    gm.bgmmusic.play()
    startCountdown()
    $(".mengban").removeClass("nomengban")
   }
}