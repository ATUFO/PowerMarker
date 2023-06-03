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

function each(ele){
    ele.setAttribute('style', "background-color:#"+color);
}

function getClassName(){
    return "powermark-"+ cnt
}

function generateRandomColor(){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

(function(){
    window.onload=function(){
        $("body").mark("Us",{
                each,
                className: getClassName()
        })
    }
    window.unmark=function(){
        $("body") .unmark({className:"powermark-0"})
    }
})();