import { keys } from "./utils/input.js";
import { player } from "./entities/player.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


// --------------------
// Camera
// --------------------

const camera = 
{
    position: {x:0, y:0},
    interpolationSpeed: 3,

    getPosition(x, y) 
    {
        return {
            x: x - this.position.x + canvas.width / 2,
            y: y - this.position.y + canvas.height / 2
        };
    }
}

// --------------------
// Information Cards
// --------------------

class WorldCard {
    constructor(x, y, html) 
    {
        this.x = x;
        this.y = y;

        this.element = document.createElement("div");
        this.element.className = "world-card";
        this.element.innerHTML = html;

        document.body.appendChild(this.element);
    }

    update() 
    {
        const dx = this.x - player.x;
        const dy = this.y - player.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 2500) {
            this.element.style.display = "none";
            return;
        }

        this.element.style.display = "block";

        const screen = camera.getPosition(this.x, this.y);

        this.element.style.transform =
            `translate(${screen.x}px, ${screen.y - 1000}px)`;
    }
}

// --------------------
// Math
// --------------------

function interpTo(current, target, speed, dt) 
{
    return current + (target - current) * speed * dt;
}

// --------------------
// Game State
// --------------------



// --------------------
// Update
// --------------------

function update(dt) 
{
   player.update(dt)

    camera.position.x = interpTo(camera.position.x, player.x, camera.interpolationSpeed, dt);
    camera.position.y = interpTo(camera.position.y, player.y, camera.interpolationSpeed, dt);

    console.log(camera.position.y);
}

// --------------------
// Render
// --------------------

function drawRectangle(x, y, width, height, rotation, color)
{
    ({ x, y } = camera.getPosition(x, y));

    if(rotation != 0)
    {
        ctx.save();

        // Move origin to the center
        ctx.translate(
            x + width / 2,
            y + height / 2
        );

        // Rotate around the new origin
        ctx.rotate(rotation);

        // Draw centered on the origin
        ctx.fillStyle = color;
        ctx.fillRect(
            -width / 2,
            -height / 2,
            width,
            height
        );

        ctx.restore();
    }
    else
    {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}

function drawTriangle(x, y, width, height, rotation, color)
{
    ({ x, y } = camera.getPosition(x, y));

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.moveTo(25, 0);      // Tip
    ctx.lineTo(-15, -15);   // Back left
    ctx.lineTo(-15, 15);    // Back right
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();  
}

function drawPlayer(x, y, rotation, color)
{
    ({ x, y } = camera.getPosition(x, y));

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.moveTo(25, 0);      // Tip
    ctx.lineTo(-15, -15);   // Back left
    ctx.lineTo(-10, 0);   // Back left
    ctx.lineTo(-15, 15);    // Back right
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();  
}

function drawSphere(x, y, radius, color)
{
    ({ x, y } = camera.getPosition(x, y));

    ctx.beginPath();

    ctx.arc(
        x, 
        y, 
        radius,  
        0,
        Math.PI * 2
    );

    ctx.fillStyle = color;
    ctx.fill();
}

function drawText(x, y, text, color, font)
{
    ({ x, y } = camera.getPosition(x, y));

    ctx.fillStyle = color;
    ctx.font = font;
    
    ctx.fillText(text, x, y);
}


function render() {

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSphere(0, 0, 50, "grey");
    drawSphere(200, 150, 5, "white");
    drawSphere(500, 900, 5, "white");
    drawSphere(800, 700, 5, "white");
    drawSphere(700, 200, 5, "white");
    drawSphere(120, 100, 5, "white");

    //drawRectangle(player.x, player.y, player.width, player.height, 2, "red")
    drawPlayer(player.x, player.y, player.rotation, "red")

}

// --------------------
// Game Loop
// --------------------

const cards = 
    [
        new WorldCard(
            0,
            0,
            `
            <h2>Eneko Etxaniz</h2>
            <p>Game Programmer and Computer Engineer</p>
            `
        ),

        new WorldCard(
            100,
            300,
            `
            <h2>Lead Programmer</h2>
            <p>Black Hat Studio</p>
            `
        ),

        new WorldCard(
            100,
            500,
            `
            <h2>C# and .NET desktop application developer intern</h2>
            <p>SealPath</p>
            `
        ),

        new WorldCard(
            100,
            700,
            `
            <h2>Ikasiker Collaboration Grant</h2>
            <p>HiTZ Zentroa</p>
            `
        ),
    ];

let lastTime = 0;

function gameLoop(timestamp) {

    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    update(dt);
    render();

    cards.forEach(card => card.update());

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
