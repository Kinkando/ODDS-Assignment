function A(num) {
    // Check only positive integer format and must not integer out of bound
    console.log(num);
    if (parseInt(num) > Number.MAX_SAFE_INTEGER || parseInt(num) < 0) {
        return "invalid input";
    }
    let numText = num.toString(); // Cast to String in order to iteration with charAt
    let text = ""; // Keep result of this function
    for (let i = 0; i < numText.length; i++) {
        // Check even or odd number and insert that text in front of number
        text += (parseInt(numText.charAt(i) - '0') % 2 == 0 ? "Even" : "Odd") + numText.charAt(i);
    }
    return text;
}

function B(text) {
    let prev = 0; // Keep previous position (start index of text)
    let reverseText = ""; // Keep result that reverse text from parameter and change to upper case

    for (let i = 0; i < text.length; i++) {
        // Check index of integer in text
        if (isNumber(text.charAt(i))) {

            /* Substring only alphabets, split string to array, reverse all elements, 
             * join all elements to String and change letter to upper case, concat with digit
             */
            reverseText += text.slice(prev, i).split('').reverse().join('').toUpperCase() + text.charAt(i);

            prev = i + 1; // Shift next start text index
        }
    }
    return reverseText;
    // return text.replaceAll("Odd", "DDO").repalceAll("Even", "NEVE");
}

function C(reverseText) {
    let ascii = ""; // Keep result of convert each character to ASCII Code
    for (let i = 0; i < reverseText.length; i++) {
        if (isNumber(reverseText.charAt(i))) {
            ascii += reverseText.charAt(i); // Keep digit
        } else {
            ascii += reverseText.charCodeAt(i); // Convert character to ASCII Code
        }
    }
    return ascii;
}

function D(ascii) {
    // ascii = ascii.toString();
    let reverseText = ""; // Keep result of convert ASCII Code to reverse text 
    const numType = ["DDO", "NEVE"]; // Array for check converted text
    for (let i = 0; i < ascii.length;) {
        let type = ""; // Keep only text such as DDO or NEVE
        while (!numType.includes(type)) {
            // Fixed 2 digits position of ASCII code and convert to Character
            type += String.fromCharCode(parseInt(ascii.slice(i++, ++i)));
        }
        reverseText += type + (ascii.charAt((i++)) - '0'); // Concat with type and digit, then shift iteration index
    }
    return reverseText;
}

function E(reverseText) {
    let prev = 0;
    let text = ""; // Keep result of convert reverse text to traditional text
    for (let i = 0; i < reverseText.length; i++) {
        // Focus only integer and ignore all alphabets
        if (isNumber(reverseText.charAt(i))) {
            /* Substring only alphabets, split string to array, reverse all elements, 
             * join all elements to String and change letter to lower case, concat with digit
             */
            let word = reverseText.slice(prev, i).split('').reverse().join('').toLowerCase() + reverseText.charAt(i);

            text += word.charAt(0).toUpperCase() + word.slice(1); // Change to first letter to Capitalize letter
            prev = i + 1; // Shift next start text index
        }
    }
    return text;
}

function F(text) {
    let numText = ""; // Cut all alphabets and keep only digits
    for (let i = 0; i < text.length; i++) {
        // Focus only integer and ignore all alphabets
        if (isNumber(text.charAt(i))) {
            numText += text.charAt(i); // keep only digit
        }
    }
    return numText;
}

// Check number format of Character
function isNumber(letter) {
    return Number.isInteger(parseInt(letter - '0'));
}

function convertNumber() {
    let number = document.querySelector('#number').value;
    // Check format must be positive integer (include 0) only and not empty
    if (number.length == 0 || number < 0 || number > Number.MAX_SAFE_INTEGER) {
        alert('invalid input');
        return;
    }
    alert(number);
}

function execute() {
    let number = document.querySelector('#number');
    if (number.value.length == 0 || number.value < 0 || number.value.toString() == '-0') {
        number.value = 0;
    }
    // integer out of bounds
    else if (number.value > Number.MAX_SAFE_INTEGER) {
        number.value = Number.MAX_SAFE_INTEGER;
    }
    // when start with 0 and follow with another, then remove 0
    number.value = parseInt(number.value);
    displayResult(number.value);
}

function displayResult(number) {
    let result = document.querySelector('#result');
    removeChildren(result);

    let text = A(number);
    let resultA = document.createElement('div');
    resultA.innerText = "A: " + text;

    text = B(text);
    let resultB = document.createElement('div');
    resultB.innerText = "B: " + text;

    text = C(text);
    let resultC = document.createElement('div');
    resultC.innerText = "C: " + text;

    text = D(text);
    let resultD = document.createElement('div');
    resultD.innerText = "D: " + text;

    text = E(text);
    let resultE = document.createElement('div');
    resultE.innerText = "E: " + text;

    text = F(text);
    let resultF = document.createElement('div');
    resultF.innerText = "F: " + text;

    result.appendChild(resultA);
    result.appendChild(resultB);
    result.appendChild(resultC);
    result.appendChild(resultD);
    result.appendChild(resultE);
    result.appendChild(resultF);
}

// iteration remove firstChild
function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.querySelector('#number').addEventListener('keyup', execute);

// let number = 123;
// console.log("Input: " + number);

// let text = A(number);
// console.log("A: " + text);

// text = B(text);
// console.log("B: " + text);

// text = C(text);
// console.log("C: " + text);

// text = D(text);
// console.log("D: " + text);

// text = E(text);
// console.log("E: " + text);

// text = F(text);
// console.log("F: " + text);

// console.log("Output: " + text);