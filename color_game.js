/*
 */

//====================================================================
// Helper functions
//====================================================================
const pickColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

const generateRandomColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(generateRandomColor());
    }
    return colors;
}

const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    })
}

const reset = () => {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    resetButton.textContent = "New Colors";
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.visibility = "visible";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.backgroundColor = "black";
            squares[i].style.visibility = "hidden";
        }
    }
    title.style.backgroundColor = "steelblue";
    message.textContent = "";
}

//====================================================================
// Init Variables
//====================================================================

// State
let numSquares = 6;
let colors = generateRandomColors(numSquares);
let pickedColor = pickColor();

// Select elements
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const title = document.querySelector("h1");
const resetButton = document.getElementById("resetButton");
const modeButtons = document.querySelectorAll(".mode");


//====================================================================
// Main
//====================================================================
function main() {
    // Update colorDisplay
    colorDisplay.textContent = pickedColor;

    // Reset Colors Button
    resetButton.addEventListener("click", reset);

    // Mode Buttons
    modeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        })
    })

    // Set up squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        // Add click listeners
        squares[i].addEventListener("click", function () {
            // Get the color of the clicked square
            const clickedColor = this.style.backgroundColor;
            // Compare that color to pickedColor
            if (clickedColor === pickedColor) {
                message.textContent = "Correct"
                changeColors(pickedColor);
                title.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play again?"
            } else {
                this.style.backgroundColor = "black";
                message.textContent = "Incorrect";
            }
        })
    }
}

main();