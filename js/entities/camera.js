import { canvas } from "../render/canvas.js";

// --------------------
// Camera
// --------------------

export const camera = 
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