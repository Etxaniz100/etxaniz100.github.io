import { camera } from "../entities/camera.js";
import { player } from "../entities/player.js";
import { ctx, canvas } from "./canvas.js";

export function drawRectangle(x, y, width, height, rotation, color)
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

export function drawTriangle(x, y, width, height, rotation, color)
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

export function drawArrowPlayer(x, y, rotation)
{
    ({ x, y } = camera.getPosition(x, y));

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Base
    ctx.beginPath();
    ctx.moveTo(25, 0);      // Tip
    ctx.lineTo(-15, -15);   // Back left
    ctx.lineTo(-10, 0);   // Back left
    ctx.lineTo(-15, 15);    // Back right
    ctx.closePath();

    ctx.fillStyle = "gray";
    ctx.fill();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Back line 1

    ctx.beginPath();
    ctx.moveTo(-20, -13);      // Tip
    ctx.lineTo(-15, 0);   // Back left
    ctx.lineTo(-20, 13);    // Back right

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Back line 2

    ctx.beginPath();
    ctx.moveTo(-24, -10);      // Tip
    ctx.lineTo(-20, 0);   // Back left
    ctx.lineTo(-24, 10);    // Back right

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();  
}

export function drawControllPlayer(x, y)
{
    ({ x, y } = camera.getPosition(x, y));


    ctx.beginPath();

    ctx.arc( x, y, 20, 0, Math.PI * 2 );
    ctx.fillStyle = "gray";
    ctx.fill();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc( x, y, 10, 0, Math.PI * 2 );
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc( x + 14, y, 2, 0, Math.PI * 2 );
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc( x - 14, y, 2, 0, Math.PI * 2 );
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc( x, y + 14, 2, 0, Math.PI * 2 );
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc( x, y - 14, 2, 0, Math.PI * 2 );
    ctx.fillStyle = "white";
    ctx.fill();
   

}

export function drawSphere(x, y, radius, color)
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

export function drawText(x, y, text, color, font)
{
    ({ x, y } = camera.getPosition(x, y));

    ctx.fillStyle = color;
    ctx.font = font;
    
    ctx.fillText(text, x, y);
}


// --------------------
// Render
// --------------------

export function render() 
{
    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSphere(0, 0, 50, "grey");


    const gridSize = 100;
    const spacing = 300;

    for (let x = -gridSize; x <= gridSize; x++) {
        for (let y = -gridSize; y <= gridSize; y++) {
            drawSphere(
                x * spacing,
                y * spacing,
                2,
                "white"
            );
        }
    }

    player.render()
}