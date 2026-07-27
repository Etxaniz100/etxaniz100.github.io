import { keys } from "./utils/input.js";
import { drawRectangle, drawPlayer, drawSphere, drawText, drawTriangle } from "./render/renderer.js";
import { player } from "./entities/player.js";
import { camera } from "./entities/camera.js";
import { ctx, canvas } from "./render/canvas.js";





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




function render() {

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSphere(0, 0, 50, "grey");
    drawSphere(200, 150, 5, "white");
    drawSphere(500, 900, 5, "white");
    drawSphere(800, 700, 5, "white");
    drawSphere(700, 200, 5, "white");
    drawSphere(120, 100, 5, "white");

    player.render()

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
