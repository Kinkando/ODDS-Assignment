// Add letter (Odd or Even) depend on type of integer (EX: 12 => Odd1Even2)
function A(num) {
    let numText = num.toString(); // Cast to String in order to iteration with charAt
    let text = ""; // Keep result of this function
    for (let i = 0; i < numText.length; i++) {
        // Cast character to integer type and check even or odd number, then insert that text in front of number
        text += (parseInt(numText.charAt(i) - '0') % 2 == 0 ? "Even" : "Odd") + numText.charAt(i);
    }
    return text;
}

// Reverse letter and change alphabet to upper case (EX: Odd1Even2 => DDO1NEVE2)
function B(text) {
    let prev = 0; // Keep previous position (start index of text)
    let reverseText = ""; // Keep result that reverse text from parameter and change to upper case

    for (let i = 0; i < text.length; i++) {
        // Check index of integer in text
        if (isNumber(text.charAt(i))) {
            // reverse all letters and change all letters to upper case, then concat with digit
            reverseText += reverseOrder(text.slice(prev, i)).toUpperCase() + text.charAt(i);
            prev = i + 1; // Shift next start alphabet index
        }
    }
    return reverseText;
}

// Convert Character to ASCII Code (EX: DDO1NEVE2 => 6868791786986692)
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

// Convert ASCII code to Character (EX: 6868791786986692 => DDO1NEVE2)
function D(ascii) {
    let reverseText = ""; // Keep result of convert ASCII Code to reverse text 
    const numType = ["DDO", "NEVE"]; // Array for check converted text
    for (let i = 0; i < ascii.length;) {
        let type = ""; // Keep only alphabet such as DDO or NEVE
        while (!numType.includes(type)) {
            // Fixed 2 digits position of ASCII code and convert to Character
            type += String.fromCharCode(parseInt(ascii.slice(i++, ++i)));
        }
        reverseText += type + (ascii.charAt((i++)) - '0'); // Concat with type and digit, then shift iteration index
    }
    return reverseText;
}

// Reverse letter and change alphabet to Capital letter (EX: DDO1NEVE2 => Odd1Even2)
function E(reverseText) {
    let prev = 0;
    let text = ""; // Keep result of convert reverse text to traditional text
    for (let i = 0; i < reverseText.length; i++) {
        // Focus only integer and ignore all alphabets
        if (isNumber(reverseText.charAt(i))) {
            // reverse all letters and change all letters to lower case, then concat with digit
            let word = reverseOrder(reverseText.slice(prev, i)).toLowerCase() + reverseText.charAt(i);
            text += word.charAt(0).toUpperCase() + word.slice(1); // Change first alphabet to Capital letter
            prev = i + 1; // Shift next start alphabet index
        }
    }
    return text;
}

// Cut String Odd and Even (EX: Odd1Even2 => 12)
function F(text) {
    let numText = ""; // Cut all alphabets and keep only digits
    for (let i = 0; i < text.length; i++) {
        // Focus only integer and ignore all alphabets
        if (isNumber(text.charAt(i))) {
            numText += text.charAt(i); // keep only digit
        }
    }
    return parseInt(numText);
}

// iteration with reverse order to reverse all letters
function reverseOrder(text) {
    let reverseText = "";
    for (let i = text.length - 1; i >= 0; i--) {
        reverseText += text.charAt(i);
    }
    return reverseText;
}

// Check number format of Character
function isNumber(letter) {
    return Number.isInteger(parseInt(letter - '0'));
}

// Validate input number field before call execute functions
function validateInput() {
    let number = document.querySelector('#number');
    // Check decimal point and remove it (Accept only unsigned integer)
    if (number.value.includes('.')) {
        let dotIndex = number.value.indexOf('.');
        number.value = number.value.slice(0, dotIndex) + number.value.slice(dotIndex + 1);
    }
    // Minimum of number is 0. If delete typing to become empty input field, then autofill with 0 digit
    if (number.value.length == 0 || number.value < 0) {
        number.value = 0;
    }
    // Integer out of bounds, then set number with maximum of integer
    else if (number.value > Number.MAX_SAFE_INTEGER) {
        number.value = Number.MAX_SAFE_INTEGER;
    }
    number.value = parseInt(number.value); // Convert value to integer type (remove 0 in ahead)
    execute(number.value); // Call function to generate all child elements of result
}

// Execute all functions (A, B, ..., F) and generate all child elements of result
function execute(number) {
    let result = document.querySelector('#result');
    removeChildren(result); // Remove all child elements of result

    // Keep array of map that includes text and function in order to iteration
    const functionList = [{
            "text": "A: ",
            "function": A,
        },
        {
            "text": "B: ",
            "function": B,
        },
        {
            "text": "C: ",
            "function": C,
        },
        {
            "text": "D: ",
            "function": D,
        },
        {
            "text": "E: ",
            "function": E,
        },
        {
            "text": "F: ",
            "function": F,
        },
    ];

    // Generate new tooltiptext of input box container
    document.querySelector('.box-input').children[0].innerText = number;

    let text = parseInt(number); // Keep result of execute with each function
    let prev = text;
    for (let i = 0; i < functionList.length; i++) {
        text = functionList[i]["function"](text); // Execute each function
        let childElement = document.createElement('div'); // Create child element of result with div tag
        childElement.innerText = functionList[i]["text"] + text; // Put result description in innerText
        result.append(childElement); // Append child element into result parent element

        // Generate new tooltiptext input of each function
        document.querySelector(`.box-${functionList[i]['text'].charAt(0)}`).children[0].children[0].innerText = "Input: " + prev;

        // Generate new tooltiptext output of each function
        document.querySelector(`.box-${functionList[i]['text'].charAt(0)}`).children[0].children[2].innerText = "Output: " + text;
        prev = text; // previousText = currentText

        if (i == functionList.length / 2 - 1) {
            // Generate new tooltiptext of result box container
            document.querySelector('.box-result').children[0].innerText = text;
        }
    }
}

// Iteration remove firstChild until all child elements is empty
function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Create initialize function that run once time throughout program
function init() {
    // Add EventListener when typing anything in input number field ('keyup' event)
    document.querySelector('#number').addEventListener('keyup', validateInput);
    validateInput(); // Execute with default value (0) in input number field
}

init(); // Call init function in first and once time when starting program