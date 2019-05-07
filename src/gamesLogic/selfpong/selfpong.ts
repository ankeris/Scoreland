import p5 from "p5";
let points = 0;
let myCanvas;
let balls: any = [];
let playRect;
let startGame = "Press here to spawn a ball";

const selfpong = function(finalScore: Function) {
    return new p5(p => {
        p.pointsCounter = function() {
            p.textAlign(p.LEFT);
            p.text(points, 10, 30);
            p.textSize(12);
            p.textAlign(p.CENTER);
            p.text(startGame, p.width / 2, p.height / 2);
            p.fill(255);
        };

        p.setup = () => {
            myCanvas = p.createCanvas(660, 260).parent("myContainer");
            playRect = new Rectangle(160, 250, 70, 10, 5, 5);
        };

        // Ball appears;
        p.mousePressed = () => {
            if (balls.length < 3) {
                balls.push(new Ball(p.mouseX, p.mouseY));
            }
            startGame = "";
        };

        p.draw = () => {
            p.background(100);
            p.fill(255);
            p.textSize(16);
            p.textAlign(p.LEFT);
            p.text("control with right/left arrow", 10, 50);
            p.fill(22, 180, 200);
            p.textSize(22);
            p.pointsCounter();

            playRect.displayRect();
            playRect.keyIsDown();
            playRect.fixed();
            for (var i = 0; i < balls.length; i++) {
                balls[i].display();
                balls[i].move();
                balls[i].ballWallHit();
                balls[i].bounceOfRectangle();
            }
        };

        class Rectangle {
            private x;
            private y;
            private w;
            private h;
            private xspeed;
            private yspeed;
            constructor(xas, yas, w, h, xspeed, yspeed) {
                this.x = xas;
                this.y = yas;
                this.w = w;
                this.h = h;
                this.xspeed = xspeed;
                this.yspeed = yspeed;
            }
            displayRect() {
                p.rectMode(p.CENTER);
                p.fill(125, 220, 10);
                p.rect(this.x, this.y, this.w, this.h);
            }

            // movement by arrows
            keyIsDown() {
                if (p.keyIsDown(p.RIGHT_ARROW)) {
                    this.x = this.x + this.xspeed;
                } else if (p.keyIsDown(p.LEFT_ARROW)) {
                    this.x = this.x - this.xspeed;
                }
            }

            // if rectangle hits the wall it stops
            fixed() {
                this.x = p.constrain(this.x, 25, p.width - 25);
            }
        }

        class Ball {
            private x;
            private y;
            private xspeed;
            private yspeed;
            private r;
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.xspeed = -5;
                this.yspeed = -6;
                this.r = 20;
            }

            display() {
                p.fill(255);
                p.ellipse(this.x, this.y, this.r, this.r);
            }
            // speed of the ball
            move() {
                this.x = this.x + this.xspeed;
                this.y = this.y + this.yspeed;
            }
            // if it hits the wall it goes other direction
            ballWallHit() {
                if (this.x > p.width || this.x <= 0) {
                    this.xspeed = this.xspeed * -1;
                }
                if (this.y < 5) {
                    this.yspeed = this.yspeed * -1;
                }
            }

            // when Ball hits the rectangle it bounces back and gets the point
            bounceOfRectangle() {
                // if (playRect.x > this.x) console.log(this.y);
                if (this.y >= 240 && this.y <= 245 && this.x < playRect.x + playRect.w / 2 && this.x > playRect.x - playRect.w / 2) {
                    this.yspeed = this.yspeed * -1;
                    if (this.xspeed > 0) {
                        this.xspeed = Math.floor(Math.random() * 5);
                    } else {
                        this.xspeed = Math.floor(Math.random() * -4);
                    }
                    //adds +1 point on hit
                    points = points + 1;
                }

                if (this.y > 290) {
                    finalScore(points, p);
                    balls.splice(0, balls.length);
                    points = 0;
                    p.fill(255, 0, 0);
                }
            }
        }
    });
};

export { selfpong };
