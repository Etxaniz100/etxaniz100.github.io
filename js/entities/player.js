import { keys } from "../utils/input.js";

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
            currentAngularAcceleration -= player.angularAcceleration;
        }
        else if (keys["ArrowRight"] || keys["d"])
        {
            currentAngularAcceleration += player.angularAcceleration;
        }

        player.angularSpeed += currentAngularAcceleration * dt;
        player.angularSpeed = player.angularSpeed * player.angularDrag;
        player.rotation += player.angularSpeed * dt;

        if (keys["ArrowUp"] || keys["w"]) 
        {
            currentAcceleration = player.acceleration;
        }

        player.speed.x += Math.cos(player.rotation) * currentAcceleration * dt;
        player.speed.y += Math.sin(player.rotation) * currentAcceleration * dt;

        player.speed.x = player.speed.x * player.drag;
        player.speed.y = player.speed.y * player.drag;

        if (keys["ArrowDown"] || keys["s"]) 
        {
            player.speed.x = player.speed.x * player.controlledDrag;
            player.speed.y = player.speed.y * player.controlledDrag;
        }

        player.x += player.speed.x * dt;
        player.y += player.speed.y * dt;
    }
};