function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomPosition(element) {
  var x = window.innerWidth - element.clientWidth;
  var y = window.innerHeight - element.clientHeight;
  var randomX = Math.floor(Math.random() * x);
  var randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}

function createButtons() {
  var num = document.getElementById("number").value;
  var container = document.getElementById("buttonContainer");
  container.innerHTML = "";
  for (var i = 0; i < num; i++) {
    var btn = document.createElement("button");
    btn.style.backgroundColor = getRandomColor();
    btn.className = "button";
    btn.innerHTML = i + 1;
    btn.onclick = function () {
      alert("This is button " + this.innerHTML);
    };
    container.appendChild(btn);
  }
  setTimeout(function () {
    scrambleButtons(num);
    for (var i = 0; i < num; i++) {
      container.children[i].style.position = "absolute";
    }
  }, num * 1000);
}

function scrambleButtons(num) {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    var randomPosition = getRandomPosition(buttons[i]);
    buttons[i].style.left = randomPosition[0] + "px";
    buttons[i].style.top = randomPosition[1] + "px";
  }
  if (num > 1) {
    setTimeout(scrambleButtons, 2000, num - 1);
  } else {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = "";
    }
  }
}
