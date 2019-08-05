describe("Calculator Operations", function() {
    var calc = calculations;
    it("Should be able initialize calculator object", function() {
        expect(calc).toEqual(jasmine.any(Object));
    });


    it("Add +: Numbers", function() {
        var inputString = '2+6';
        var numbers = inputString.split(/\+|\-|\×|\÷/g);
        var operators = inputString.replace(/[0-9]|\./g, "").split("");
        var add = operators.indexOf("+");
        calc.add(0,  numbers, operators);
        expect(numbers[0]).toEqual(8);
    });

    it("Divide /: Numbers", function() {
        var inputString = "6÷2";
        var numbers = inputString.split(/\+|\-|\×|\÷/g);
        var operators = inputString.replace(/[0-9]|\./g, "").split("");
        var divide = operators.indexOf("÷");
        calc.divide(divide,  numbers, operators);
        expect(numbers[0]).toEqual(3);
    });

    it("Multiply x: Numbers", function() {
        var inputString = "3×3";
        var numbers = inputString.split(/\+|\-|\×|\÷/g);
        var operators = inputString.replace(/[0-9]|\./g, "").split("");
        var multiply = operators.indexOf("×");
        calc.multiply(multiply,  numbers, operators);
        expect(numbers[0]).toEqual(9);
    });

    it("Subtract -: Numbers", function() {
        var inputString = "6-2";
        var numbers = inputString.split(/\+|\-|\×|\÷/g);
        var operators = inputString.replace(/[0-9]|\./g, "").split("");
        var subtract = operators.indexOf("-");
        calc.subtract(subtract,  numbers, operators);
        expect(numbers[0]).toEqual(4);
    });

});


describe("Calculator Keyboard", function() {

    let numbersObj = [{
        value: 7,
        type: 'number'
    }, {
        value: 8,
        type: 'number'
    }];

    let numbersPair = {
        value: 7,
        type: 'number'
    }

    let operationsObj = [{
        value: '+'
    }, {
        value: '-'
    }, ];

    let operationsPair = {
        value: '+'
    }

    let splObj = [{
        id: 'clear',
        value: 'C'
    }, {
        id: 'equal',
        value: '='
    }];

    let splObjPair = {
        id: 'clear',
        value: 'C'
    };

    it('Number keys = numbers object is defined', function() {
        expect(numbersObj).toBeDefined();
        expect(numbersObj.length).not.toBe(0);
    });

    it("Number keys = numbers object has key/value pairs", function() {
        expect(numbersObj).toContain(numbersPair);
    });

    it("Number keys = should be able fetch numbers in rows", function() {
        for (var i = 0; i < numbersObj.length; i++) {
            expect(numbersObj[i].value).toBeDefined();
            expect(numbersObj[i].value.length).not.toBe(0);
        }
    });

    it('Operations keys = numbers object is defined', function() {
        expect(operationsObj).toBeDefined();
        expect(operationsObj.length).not.toBe(0);
    });

    it('Operations keys = numbers object has key/value pairs', function() {
        expect(operationsObj).toContain(operationsPair);
    });

    it('Operations keys = should be able fetch numbers in rows', function() {
        for (var i = 0; i < operationsObj.length; i++) {
            expect(operationsObj[i].value).toBeDefined();
            expect(operationsObj[i].value.length).not.toBe(0);
        }
    });

    it('Special Keys  [c, =] special object is defined', function() {
        expect(splObj).toBeDefined();
        expect(splObj.length).not.toBe(0);
    });

    it('Special Keys  [c, =] special object has key/value pairs', function() {
        expect(splObj).toContain(splObjPair);
    });

    it('Special Keys  [c, =] should be able fetch special in rows', function() {
        for (var i = 0; i < splObj.length; i++) {
            expect(splObj[i].value).toBeDefined();
            expect(splObj[i].value.length).not.toBe(0);
        }
    });
});

describe("Calculator DOM Manipulation", function() {

    let numbersObj = [{
        value: 7,
        type: 'number'
    }, {
        value: 8,
        type: 'number'
    }, {
        value: 9,
        type: 'number'
    }];

    it('header tag should has "results" id to store results', function() {
        var div = document.createElement('div');
        div.setAttribute('id', 'results');
        expect(div.getAttribute('id')).toBe('results');
    });

    it('numbers keys  should has "digits" id to fetch numbers', function() {
        var div = document.createElement('div');
        div.setAttribute('id', 'digits');
        expect(div.getAttribute('id')).toBe('digits');
    });

    it('special keys  should has "spl" id to fetch special keys', function() {
        var div = document.createElement('div');
        div.setAttribute('id', 'spl');
        expect(div.getAttribute('id')).toBe('spl');
    });

    it('operators keys  should has "operators" id to fetch operators keys', function() {
        var div = document.createElement('div');
        div.setAttribute('id', 'operators');
        expect(div.getAttribute('id')).toBe('operators');
    });

    it('should contains ul li tags and append numbers data', function() {
        var div = document.createElement('div');
        div.setAttribute('id', 'digits');
        var ul = document.createElement('ul');
        numbersObj.forEach(function(v, i) {
            var li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += v.value;
        });
        div.appendChild(ul);
        console.log(div);
        expect(div.innerHTML.length).not.toBe(0);
    });
});