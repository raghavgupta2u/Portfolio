
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let items = [];
let lastMouseX = -1;
let lastMouseY = -1;
let section;

function setup(){
    section = document.getElementById('mtr');
    createCanvas(window.innerWidth,window.innerHeight);
    engine = Engine.create();
    engine.world.gravity.y = 0;

    addBoundaries();

    for(let i =0; i< 12; i++){
        let x = random(100, width - 100);
        let y = random(100, height - 100);
        items.push(new Item(x,y, `./assets2/img${i+1}.jpg`));
    }
}

function addBoundaries(){
     const thickness = 50;
     World.add(engine.world, [
        Bodies.rectangle(width/2, -thickness/2, width,thickness,{
            isStatic:true,
        }),
        Bodies.rectangle(width/2, height+thickness/2, width,thickness,{
            isStatic:true,
        }),
       Bodies.rectangle(-thickness/2, height/2, thickness, height,{
            isStatic:true,
        }),
        Bodies.rectangle(width+thickness/2, height/2,thickness,height,{
            isStatic:true,
        }), 
     ]);
}

function draw(){
    background("white");
    Engine.update(engine);
    items.forEach((item) => item.update());
}

class Item{
     constructor(x,y, imagePath){
        let option  = {
            frictionAir: 0.075,
            restitution: 0.25,
            density: 0.002,
            angle: Math.random() * Math.PI * 2,
        };

        this.body = Bodies.rectangle(x,y,200,225,option);
        World.add(engine.world, this.body);
        section = document.getElementById('mtr');
        this.div = document.createElement("div");
        this.div.className = "item";
        this.div.style.position = "absolute"; // Ensure correct positioning
        this.div.style.left = `${this.body.position.x - 50}px`;
        this.div.style.top = `${this.body.position.y - 112.5}px`;
        const img = document.createElement("img");
        img.src = imagePath;
        this.div.appendChild(img);
        section.appendChild(this.div);
    }
    update(){
        this.div.style.left =`${this.body.position.x - 50}px`;
        this.div.style.top = `${this.body.position.y - 112.5}px`;
        this.div.style.transform = `rotate(${this.body.angle}rad)`;
    }
}

function mouseMoved(){
    if(dist(mouseX, mouseY, lastMouseX, lastMouseY) > 10){
        lastMouseX = mouseX;
        lastMouseY = mouseY;

        items.forEach((item) => {
            if(dist(mouseX,mouseY,item.body.position.x, item.body.position.y)< 150){
                let forceMangnitude = 3;
                Body.applyForce(item.body, {
                    x: item.body.position.x,
                    y: item.body.position.y,
                },{
                    x: random(-forceMangnitude, forceMangnitude),
                    y: random(-forceMangnitude, forceMangnitude),
                });
            }
        })
    }
}
