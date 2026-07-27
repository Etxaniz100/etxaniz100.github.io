import { keys } from "../utils/input.js";
import { drawRectangle, drawPlayer, drawSphere, drawText, drawTriangle } from "../render/renderer.js";

export const player = 
{
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    acceleration: 1000, // thrust acceleration
    speed: {x:0, y:0}, // pixels per second
    drag: 0.98,
    controlledDrag: 0.9,
    rotation: 0, // radians
    angularAcceleration: 20, // radians
    angularSpeed: 0, // radians
    angularDrag: 0.95,

    update(dt) 
    {
        let currentAcceleration = 0
        let currentAngularAcceleration = 0

        if (keys["ArrowLeft"] || keys["a"])
        {
            currentAngularAcceleration -= this.angularAcceleration;
        }
        else if (keys["ArrowRight"] || keys["d"])
        {
            currentAngularAcceleration += this.angularAcceleration;
        }

        this.angularSpeed += currentAngularAcceleration * dt;
        this.angularSpeed = this.angularSpeed * this.angularDrag;
        this.rotation += this.angularSpeed * dt;

        if (keys["ArrowUp"] || keys["w"]) 
        {
            currentAcceleration = this.acceleration;
        }

        this.speed.x += Math.cos(this.rotation) * currentAcceleration * dt;
        this.speed.y += Math.sin(this.rotation) * currentAcceleration * dt;

        this.speed.x = this.speed.x * this.drag;
        this.speed.y = this.speed.y * this.drag;

        if (keys["ArrowDown"] || keys["s"]) 
        {
            this.speed.x = this.speed.x * this.controlledDrag;
            this.speed.y = this.speed.y * this.controlledDrag;
        }

        this.x += this.speed.x * dt;
        this.y += this.speed.y * dt;
    },

    render()
    {
        drawPlayer(player.x, player.y, player.rotation, "red");
    }
};