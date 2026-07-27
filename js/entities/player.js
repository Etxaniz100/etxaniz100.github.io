import { keys } from "../utils/input.js";
import { drawRectangle, drawArrowPlayer, drawControllPlayer, drawSphere, drawText, drawTriangle } from "../render/renderer.js";

export const player = 
{
    // Base
    x: 0,
    y: 0,
    acceleration: 1000, // thrust acceleration
    speed: {x:0, y:0}, // pixels per second
    drag: 0.98,

    currentMode: 0,

    // Speed form
    width: 50,
    height: 50,
    controlledDrag: 0.9,
    rotation: 0, // radians
    angularAcceleration: 20, // radians
    angularSpeed: 0, // radians
    angularDrag: 0.95,

    // Controll form


    update(dt) 
    {
        if (keys[" "])
        {
            keys[" "] = false;
            this.currentMode += 1;
            if(this.currentMode > 1)
            {
                this.currentMode = 0;
            }
            
            if(this.currentMode == 0)
            {
                this.rotation = Math.atan2(this.speed.y, this.speed.x);
            }
        }

        if(this.currentMode == 0)
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
        }
        else if(this.currentMode == 1)
        {
            let currentAcceleration = {x:0, y:0}

            if (keys["ArrowLeft"] || keys["a"])
            {
                currentAcceleration.x = -this.acceleration;
            }
            else if (keys["ArrowRight"] || keys["d"])
            {
                currentAcceleration.x = this.acceleration;
            }
            if (keys["ArrowUp"] || keys["w"]) 
            {
                currentAcceleration.y = -this.acceleration;
            }
            else if(keys["ArrowDown"] || keys["s"]) 
            {
                currentAcceleration.y = this.acceleration;
            }
         

            this.speed.x += currentAcceleration.x * dt;
            this.speed.y += currentAcceleration.y * dt;

            this.speed.x = this.speed.x * this.drag;
            this.speed.y = this.speed.y * this.drag;
        }

        this.x += this.speed.x * dt;
        this.y += this.speed.y * dt;
        
    },

    render()
    {
        if(this.currentMode == 0)
        {
            drawArrowPlayer(player.x, player.y, player.rotation);
        }
        else if(this.currentMode == 1)
        {
            drawControllPlayer(player.x, player.y);
        }
    }
};