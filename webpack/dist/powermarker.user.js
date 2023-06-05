/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 766:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div id=\"pm-container\" style=\"z-index:10000;position:fixed;left:90%;top:100px;background-color:#cbcb41;display:none\"> <div> <input id=\"pm-kwinput\" placeholder=\"mark something...\"><button class=\"pm-btn\">Mark</button> </div> <ul class=\"pm-hist\" style=\"overflow:auto\"> </ul> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
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
    var pmui = __webpack_require__(766)
    $("body").append(pmui.default)
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
})();

/******/ })()
;