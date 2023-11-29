
function calculateResult() {
    const inputField = document.getElementById("calculatorInput");
    const inputValue = inputField.value;

    // Use regular expressions to find and separate the numbers and operator
    const match = inputValue.match(/(-?\d+)\s*([-+])\s*(-?\d+)/);

    if (match) {
        const num1 = parseInt(match[1]);
        const operator = match[2];
        const num2 = parseInt(match[3]);

        let result;
        if (operator === '+') {
            result = num1 + num2;
        } else if (operator === '-') {
            result = num1 - num2;
        }

        inputField.value = result;
    }
}




/* function calculateResult() {
    const inputField = document.getElementById("calculatorInput");
    const inputValue = inputField.value;

    // Use regular expressions to find and separate the numbers and operator
    const match = inputValue.match(/(-?\d+)\s*([-+])\s*(-?\d+)/);

    if (match) {
        const num1 = parseFloat(match[1]);
        const operator = match[2];
        const num2 = parseFloat(match[3]);

        let result;
        if (operator === '+') {
            result = num1 + num2;
        } else if (operator === '-') {
            result = num1 - num2;
        }

        // Set the result as a number
        inputField.value = result;
        inputField.type = "number"; // Change input type to number
    } else {
        inputField.type = "text"; // If no match, revert to text input type
    }
}
 */