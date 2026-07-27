import { camera } from "../entities/camera.js";
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

export function drawPlayer(x, y, rotation, color)
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