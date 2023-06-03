// ==UserScript==
// @name         PowerMarker 
// @version      0.5.6
// @namespace    https://top.taofu.com
// @description  PowerMarker 
// @author       Dov
// @match        https://**
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/jquery.mark.min.js
// @grant        none
// ==/UserScript==


// 随机颜色
var color = generateRandomColor()
// mark记录
var markHistory = []

// 用来标记一次mark,便于后续操作
var cnt = 0


var render = (() => {
    var showing =  false
    var show=()=>{
        var pmui = `
        <div id="pm-container">
            <div style="position:absolute;left:0;top:100px;width: 200px;height:90px;background-color:#cbcb41;z-index:999">
            <div>
                <input id="pm-kwinput" placeholder="mark something..."></input><button class="pm-btn">Mark</button>
            </div>
                <ul class="pm-hist">
                </ul>
            </div>
        </div>
        `
        $("body").append(pmui)
        $(".pm-btn").click(() => mark())
    }
    var hide=()=>{
        $("#pm-container").remove()   
    }

    return ()=>{
        if(showing){
            hide()
        }else{
            show()
        }
        showing=~showing
    }
})()


function each(ele) {
    ele.setAttribute('style', "background-color:#" + color);
}

function getClassName() {
    return "powermark-" + cnt
}

function generateRandomColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function mark() {
    color = generateRandomColor()
    var keyword = $("#pm-kwinput").val()
    console.log(keyword);
    $("body").mark(keyword, {
        each,
        className: getClassName()
    })
    $(".pm-hist").append(`<li>${keyword}</li>`)
}

(function () {
    window.onkeydown = (e)=>{
        if(e.ctrlKey &&e.key=='q'){  // ctrl q
            render()
        }
    }

    window.unmark = function () {
        $("body").unmark({ className: "powermark-0" })
    }
})();