class ObjectToFind {
    constructor(name, x, y, width, height) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.found = false;
    }

    isClicked(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        );
    }
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



canvas.width = 800;
canvas.height = 400;

const objectsToFind = [
    new ObjectToFind("Key", 300, 200, 50, 50), // Replace with your image-specific objects
    // Add more objects for other images here
];

let currentObjectIndex = 0; // Start with the first object to find
let clicks = 0;
const maxClicks = 10;

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //const sceneImage = new Image();
    sceneImage.src = "https://ibb.co/99Qc1Kh"; // Replace with your image URL
    ctx.drawImage(sceneImage, 0, 0, canvas.width, canvas.height);

    const currentObject = objectsToFind[currentObjectIndex];
    if (!currentObject.found) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(
            currentObject.x,
            currentObject.y,
            currentObject.width,
            currentObject.height
        );
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Clicks: ${clicks}/${maxClicks}`, 10, 30);
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const currentObject = objectsToFind[currentObjectIndex];

    if (!currentObject.found && currentObject.isClicked(mouseX, mouseY)) {
        currentObject.found = true;
        clicks++;
            alert("Congratulations! You found the object.");
            canvas.removeEventListener("click", handleClick);
        
    } else if (!currentObject.found) {
        clicks++;
    }

    if (clicks >= maxClicks) {
        alert("You've used all your clicks. Game over!");
        canvas.removeEventListener("click", handleClick);
    }

    drawScene();
}

canvas.addEventListener("click", handleClick);

drawScene();

