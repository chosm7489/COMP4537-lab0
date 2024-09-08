// Assistance provided by ChatGPT for code optimization.

class Button {
  constructor(order) {
    this.order = order;
    this.element = document.createElement("button");
    this.element.style.backgroundColor = this.getRandomColor();
    this.element.className = "button";
    this.element.innerHTML = order; // Initially show the number
    this.element.dataset.order = order;
    this.element.onclick = this.checkOrder.bind(this);
    this.element.disabled = true; // Disable clicks initially
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  checkOrder() {
    // Reveal the number when clicked
    if (!this.element.innerHTML) {
      this.element.innerHTML = this.element.dataset.order;
    }

    // Check if the clicked order matches the expected order
    if (parseInt(this.element.dataset.order) === game.currentOrder + 1) {
      game.currentOrder++;
      if (game.currentOrder === game.buttonContainer.buttons.length) {
        alert(userMessage.excellentMemory);
      }
    } else {
      game.resetButtons();
      alert(userMessage.wrongOrder);
      game.currentOrder = 0;
    }
  }
}

class ButtonContainer {
  constructor() {
    this.element = document.getElementById("buttonContainer");
    this.buttons = [];
  }

  add(button) {
    this.buttons.push(button);
    this.element.appendChild(button.element);
  }

  clear() {
    this.element.innerHTML = "";
    this.buttons = [];
  }
}

class Game {
  constructor() {
    this.currentOrder = 0;
    this.buttonContainer = new ButtonContainer();
    this.input = document.getElementById("number");
  }

  createButtons(num) {
    this.buttonContainer.clear();
    this.currentOrder = 0;

    // Hide the number input only once the game starts
    this.hideNumberInput();

    for (let i = 0; i < num; i++) {
      const btn = new Button(i + 1);
      this.buttonContainer.add(btn);
    }

    // Pause for `num` seconds before scrambling
    setTimeout(() => {
      this.scrambleButtons(num, num); // Pass the number of scrambles needed
    }, num * 1000);
  }

  scrambleButtons(times, remaining) {
    if (remaining === 0) {
      // After all scrambles, hide numbers and enable clicks
      this.hideNumbers();
      this.enableButtonClicks();
      this.showNumberInput(); // Show the number input again
      return; // Stop scrambling after the specified number of times
    }

    const buttons = this.buttonContainer.buttons;
    buttons.forEach((button) => {
      button.element.style.position = "absolute"; // Ensure absolute positioning
      const randomPosition = this.getRandomPosition(button.element);
      button.element.style.left = `${randomPosition[0]}px`;
      button.element.style.top = `${randomPosition[1]}px`;
    });

    // Scramble again after 2 seconds if remaining scrambles are left
    setTimeout(() => {
      this.scrambleButtons(times, remaining - 1);
    }, 2000);
  }

  getRandomPosition(element) {
    var buttonWidth = parseFloat(getComputedStyle(element).width);
    var buttonHeight = parseFloat(getComputedStyle(element).height);
    var x = window.innerWidth - buttonWidth;
    var y = window.innerHeight - buttonHeight;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
  }

  hideNumbers() {
    // Hide the numbers on the buttons
    this.buttonContainer.buttons.forEach((button) => {
      button.element.innerHTML = "";
    });
  }

  enableButtonClicks() {
    // Enable the buttons for user interaction
    this.buttonContainer.buttons.forEach((button) => {
      button.element.disabled = false;
    });
  }

  resetButtons() {
    const buttons = this.buttonContainer.buttons;
    buttons.forEach((button) => {
      button.element.innerHTML = button.element.dataset.order; // Reveal the numbers after wrong order
    });
  }

  hideNumberInput() {
    // Hide the number input only
    this.input.style.display = "none";
  }

  showNumberInput() {
    // Show the number input again after scrambling finishes
    this.input.style.display = "block";
  }
}

// Initialize the game and set up the button creation
const game = new Game();
document.getElementById("startButton").onclick = () => {
  const num = parseInt(document.getElementById("number").value);
  if (num < 3 || num > 7) {
    alert("Please enter a number between 3 and 7.");
    return;
  } else {
    game.createButtons(num);
  }
};
