/**
 * --------------------------------------------------------------------------
 * @title: Calculator App Web Component
 * @author: Subrahmanyam Poluru
 * @email: mail.spoluru@gmail.com
 * @filename: webcomponent.js (Originally - calculator.app.min.js)
 * @description: HTML5 Web Component API for Calculator App
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const MODEL = {
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
    splObj: [{
        id: 'clear',
        value: 'C'
    }, {
        id: 'equal',
        value: '='
    }]
}

const Util = {
    COMPONENT_NAME: 'calculator-app',
    STYLE: 'style'
};

const EVENT = {
    CLICK: 'click'
}

const CLASSNAMES = {
    NUMS: 'nums',
    OPS: 'ops',
    SPL: 'spl'
}

const SELECTOR = {
    TPL_CLASS: '.calculator-app',
    SHADOW_NUMS: '.nums',
    SHADOW_OPS: '.ops',
    SHADOW_SPL: '.spl',
    DIGITS: 'digits',
	OPERATORS: 'operators',
	SPL: 'spl',
	RESULTS: 'results',
	CONTENT: 'content',
	BODY: 'calculator-body'
}



let isResultsShow = false;

/**
 * ------------------------------------------------------------------------
 * Calculator standard operations
 * ------------------------------------------------------------------------
 */

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
    }

}


/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */


class Calculator extends HTMLElement {
    constructor() {
        super();
        const template = document.querySelector(SELECTOR.TPL_CLASS);
        const templateContent = template.content;
        const style = document.createElement(Util.STYLE);
        style.textContent = this.cascadeStyles;
        template.innerHTML = this.tpl;
        //initialize shadow object
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        })
        this._shadowRoot.appendChild(templateContent.cloneNode(true));
        this._shadowRoot.appendChild(style);
        const items = this._shadowRoot.querySelectorAll(SELECTOR.SHADOW_NUMS);
        const ops = this._shadowRoot.querySelectorAll(SELECTOR.SHADOW_OPS);
        const spl = this._shadowRoot.querySelectorAll(SELECTOR.SHADOW_SPL);
        let results = this._shadowRoot.querySelector('#results');
        console.log("result", spl);
        for (const item of items) {
            item.addEventListener(EVENT.CLICK, function(e) {

                var activeStr = results.innerHTML;
                var lastChar = activeStr[activeStr.length - 1];
                if (isResultsShow === false) {
                    results.innerHTML += e.target.innerHTML;
                } else if (isResultsShow === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                    isResultsShow = false;
                    results.innerHTML += e.target.innerHTML;
                } else {
                    isResultsShow = false;
                    results.innerHTML = "";
                    results.innerHTML += e.target.innerHTML;
                }


            });
        }

        for (const op of ops) {
            op.addEventListener(EVENT.CLICK, function(e) {
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
        }

        let equal = function() {
            console.log("IN");
            var keyValue = results.innerHTML,
                numbers = keyValue.split(/\+|\-|\×|\÷/g),
                operators = keyValue.replace(/[0-9]|\./g, "").split("");

            var divide = operators.indexOf("÷");
            calculations.divide(divide, numbers, operators);

            var multiply = operators.indexOf("×");
            calculations.multiply(multiply, numbers, operators);

            var subtract = operators.indexOf("-");
            calculations.subtract(subtract, numbers, operators);

            var add = operators.indexOf("+");
            calculations.add(add, numbers, operators);


            results.innerHTML = numbers[0];
            isResultsShow = true;
        }


        let clear = function() {
            results.innerHTML = "";
        }

        for (const sp of spl) {
            sp.addEventListener(EVENT.CLICK, function(e) {


                switch (this.innerHTML) {
                    case "=":
                        equal();
                        break
                    case "C":
                        clear();
                        break
                }

            });
        }
    }



    /**
     * ------------------------------------------------------------------------
     * Template Binding
     * ------------------------------------------------------------------------
     */

    get tpl() {
        return `
 		
	    	<header id="${SELECTOR.RESULTS}"></header>
		      <section id="${SELECTOR.BODY}">
		          <section id="${SELECTOR.CONTENT}">
		            <div id="${SELECTOR.DIGITS}"><ul>${this.fetchDigits}</ul></div>
		            <div id="${SELECTOR.SPL}"><ul>${this.fetchSplKeys}</ul></div>
		          </section>
		          <aside id="${SELECTOR.OPERATORS}"><div>${this.fetchOperators}</div></aside>
		      </section>
		
      `
    }

    /**
     * ------------------------------------------------------------------------
     * Iterate Lists - Calculator Keys
     * ------------------------------------------------------------------------
     */

    get fetchDigits() {
        return MODEL.numbersObj.map(item => `
            <li class="${CLASSNAMES.NUMS}">${item.value}</li>
        `).join('')
    }

    get fetchOperators() {
        return MODEL.operationsObj.map(item => `
            <span class="${CLASSNAMES.OPS}">${item.value}</span>
        `).join('')
    }

    get fetchSplKeys() {
        return MODEL.splObj.map(item => `
            <li class="${CLASSNAMES.SPL}">${item.value}</li>
        `).join('')
    }


    /**
     * ------------------------------------------------------------------------
     * CSS Styles
     * ------------------------------------------------------------------------
     */

    get cascadeStyles() {
        return `
		header {
		     background: #a90329; /* rgba */
		     background: -moz-linear-gradient(top, #a90329 0%, #9b0324 44%, #7a003d 100%);
		     background: -webkit-linear-gradient(top, #a90329 0%,#9b0324 44%,#7a003d 100%);
		     background: linear-gradient(to bottom, #a90329 0%,#9b0324 44%,#7a003d 100%);
		     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a90329', endColorstr='#7a003d',GradientType=0 );
		     padding: 90px 10px 15px 10px;
		     text-align: right;
		     vertical-align: middle;
		     color: #fff;
		     font-size: 40px;
		     width: 100%;
		     box-sizing: border-box;
		     -webkit-box-sizing: border-box;
		     -moz-box-sizing: border-box;
		     border: 0;
		     border-bottom: 6px solid #c1b3b3;
		     height: 140px;

		}
		#calculator-body {
		     box-sizing: border-box;
		     -webkit-box-sizing: border-box;
		     -moz-box-sizing: border-box;
		    
		}
		#content {
		     float: left;
		     width: 80%;
		     background: #fff;
		     overflow: hidden;
		}
		#operators {
		     float: left;
		     width: 20%;
		}

		#digits ul, #spl ul {
		     list-style: none;
		     margin: 0;
		     padding: 0;
		}
		#digits ul li, #spl ul li{
		     float: left;
		     width: 33.33%; /* vh */
		     padding: 25px 10px;/* em */
		     box-sizing: border-box;
		     -webkit-box-sizing: border-box;
		     -moz-box-sizing: border-box;
		     text-align: center;
		     font-size: 30px;
		     cursor: pointer;
		     border: 1px solid #ccc;
		}
		#operators span {
		     display: block;
		     width: 100%; /* vh */
		     padding: 25px 10px;/* em */
		     box-sizing: border-box;
		     -webkit-box-sizing: border-box;
		     -moz-box-sizing: border-box;
		     text-align: center;
		     font-size: 30px;
		     cursor: pointer;
		     border: 1px solid #2b2423;
		     background: #2b2423;
		     color: #fff;
		}
		#digits ul li:hover {
		     background: #ccc;
		     color: #fff;
		}

		#spl ul li:hover {
		     background: #4caf50;
		     color: #fff;
		}

      `;
    }
}



/**
 * ------------------------------------------------------------------------
 * Define Web Component Name - Loading
 * ------------------------------------------------------------------------
 */

customElements.define(Util.COMPONENT_NAME, Calculator);