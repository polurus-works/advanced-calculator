/**
 * --------------------------------------------------------------------------
 * {
 *		@title: Calculator
 * 		@author: Subrahmanyam Poluru
 * 		@email: mail.spoluru@gmail.com
 * 		@filename: calculator.js
 * 		@description: Using JavaScript dynamic calculator
 * }
 * --------------------------------------------------------------------------
 */

"use strict";

//initializing object for calculator keys

let initObj = {
    numbersObj: [{
        value: 7,
        type: 'number'
    }, {
        value: 8,
        type: 'number'
    }, {
        value: 9,
        type: 'number'
    }, {
        value: 4,
        type: 'number'
    }, {
        value: 5,
        type: 'number'
    }, {
        value: 6,
        type: 'number'
    }, {
        value: 1,
        type: 'number'
    }, {
        value: 2,
        type: 'number'
    }, {
        value: 3,
        type: 'number'
    }, {
        value: '.',
        type: 'number'
    }],
    operationsObj: [{
        value: '+'
    }, {
        value: '-'
    }, {
        value: '&times;'
    }, {
        value: '&divide;'
    }],
    splObj : [{
        id: 'clear',
        value: 'C'
    }, {
        id: 'equal',
        value: '='
    }]
}

//constants

const SELECTORS = {
	DIGITS: '#digits',
	OPERATORS: '#operators',
	SPL: '#spl',
	DIV: 'div',
	UL: 'ul',
	LI: 'li',
	SPAN: 'span',
	RESULTS: 'results',
	CLICK: 'click'
};


//Assinging DOM elements, selectors

let ul = document.createElement(SELECTORS.UL),
    div = document.createElement(SELECTORS.DIV),
    digits = document.querySelector(SELECTORS.DIGITS),
    operators = document.querySelector(SELECTORS.OPERATORS),
    splUl = document.createElement(SELECTORS.UL),
    spl = document.querySelector(SELECTORS.SPL),
    results = document.getElementById(SELECTORS.RESULTS),
    isResults = false;

/* Calculator operations */
var calculations = {
	/**
	 * @param {0} add
	 * @param {["2", "6"]} number
	 * @param {["+"]} operator
	 */
    add: function(add, n, o) {
        while (add != -1) {
            n.splice(add, 2, parseFloat(n[add]) + parseFloat(n[add + 1]));
            o.splice(add, 1);
            add = o.indexOf("+");
        }
    },
    divide: function(divide, n, o) {
        while (divide != -1) {
            n.splice(divide, 2, n[divide] / n[divide + 1]);
            o.splice(divide, 1);
            divide = o.indexOf("÷");
        }
    },
    multiply: function(multiply, n, o) {
        while (multiply != -1) {
            n.splice(multiply, 2, n[multiply] * n[multiply + 1]);
            o.splice(multiply, 1);
            multiply = o.indexOf("×");
        }
    },
    subtract: function(subtract, n, o) {
        while (subtract != -1) {
            n.splice(subtract, 2, n[subtract] - n[subtract + 1]);
            o.splice(subtract, 1);
            subtract = o.indexOf("-");
        }
    },
    equal: function() {
        var keyValue = results.innerHTML,
            numbers = keyValue.split(/\+|\-|\×|\÷/g),
            operators = keyValue.replace(/[0-9]|\./g, "").split("");

        var divide = operators.indexOf("÷");
        this.divide(divide, numbers, operators);

        var multiply = operators.indexOf("×");
        this.multiply(multiply, numbers, operators);

        var subtract = operators.indexOf("-");
        this.subtract(subtract, numbers, operators);

        var add = operators.indexOf("+");
        this.add(add, numbers, operators);

        results.innerHTML = numbers[0];
        isResults = true;
    },
    clear: function() {
        results.innerHTML = "";
    }
}

//initializing calculator in DOM iterators

function init() {

	// iterates for number keys
    initObj.numbersObj.forEach(function(v, i) {
        var li = document.createElement(SELECTORS.LI);
        ul.appendChild(li);
        li.innerHTML += v.value;
        //attaching event to element
        li.addEventListener(SELECTORS.CLICK, function(e) {
            var activeStr = results.innerHTML;
            var lastChar = activeStr[activeStr.length - 1];
            if (isResults === false) {
                results.innerHTML += e.target.innerHTML;
            } else if (isResults === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                isResults = false;
                results.innerHTML += e.target.innerHTML;
            } else {
                isResults = false;
                results.innerHTML = "";
                results.innerHTML += e.target.innerHTML;
            }
        });

    });
    digits.appendChild(ul);

    // iterates for operation keys
    initObj.operationsObj.forEach(function(v, i) {
        var span = document.createElement(SELECTORS.SPAN);
        div.appendChild(span);
        span.innerHTML += v.value;
        //attaching event to element
        span.addEventListener(SELECTORS.CLICK, function(e) {
            var activeStr = results.innerHTML;
            var lastChar = activeStr[activeStr.length - 1];
            if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                var newString = activeStr.substring(0, activeStr.length - 1) + e.target.innerHTML;
                results.innerHTML = newString;
            } else if (activeStr.length == 0) {
                console.log("only numbers");
            } else {
                results.innerHTML += e.target.innerHTML;
            }

        });
    });
    operators.appendChild(div);

    // iterates for special keys
    initObj.splObj.forEach(function(v, i) {
        var li = document.createElement(SELECTORS.LI);
        splUl.appendChild(li);
        li.setAttribute('id', v.id)
        li.innerHTML += v.value;
        //attaching event to element
        li.addEventListener(SELECTORS.CLICK, function(e) {
            switch (this.innerHTML) {
                case "=":
                    calculations.equal()
                    break
                case "C":
                    calculations.clear()
                    break
            }
        });

    });
    spl.appendChild(splUl);
}