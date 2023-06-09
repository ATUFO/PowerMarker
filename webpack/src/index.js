// ==UserScript==
// @name         PowerMarker 
// @version      0.5.6
// @namespace    https://top.taofu.com
// @description  PowerMarker 
// @author       Dov
// @match        https://**
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://code.jquery.com/ui/1.13.2/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/jquery.mark.min.js
// @grant        none
// ==/UserScript==


import { createApp } from 'vue' 


// 随机颜色
var color = generateRandomColor()
// mark记录
var markHistory = []

// 用来标记一次mark,便于后续操作
var cnt = 0


var render = (() => {
    var showing =  false

    return ()=>{
        if(showing){
            $("#pm-container").hide() 
        }else{
            $("#pm-container").show()
        }
        showing=~showing
    }
})()

var ui = ()=>{
    var pmui = require("./index.html").default
    $("body").append(pmui)

    var pvue = createApp( require("./index.vue").default )
    pvue.mount("#pm-container") 

    $(".pm-btn").click(() => mark())
    $( "#pm-container" ).draggable({cancel: "input,textarea,button,select,option,a"})
}


function each(ele) {
    ele.setAttribute('style', "background-color:#" + color);
}

function getClassName() {
    return "powermark-" + cnt++
}

function generateRandomColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function mark() {
    color = generateRandomColor()
    var keyword = $("#pm-kwinput").val()
    var className = getClassName()
    console.log(keyword);
    $("body").mark(keyword, {
        each,
        className
    })

    let li = $(`<li><a>${keyword}</a></li>`)[0]
    let a = $(`<a>  x</a>`)[0]
    li.appendChild(a)
    a.onclick=()=>{removeWord(keyword),li.remove()}

    $(".pm-hist").append(li)
    markHistory[keyword]=className
}

function removeWord(keyword){
    
    $("body").unmark({ className: markHistory[keyword] })
    markHistory[keyword]=null
}

(function () {
    window.onkeydown = (e)=>{
        if(e.ctrlKey &&e.key=='q'){  // ctrl q
            render()
        }
    }
    window.onload = ()=>{
        ui()
    }

    window.unmark = function () {
        $("body").unmark({ className: "powermark-0" })
    }
})();