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



function each(ele){
    console.log(ele);
}

var cnt = 0
function getClassName(){

    return "powermark-"+ cnt
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