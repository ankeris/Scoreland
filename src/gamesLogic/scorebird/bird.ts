export class Bird {
    y = this.p5.height / 2;
    x = 64;
    gravity = 0.4;
    lift = -10;
    velocity = 0;
    constructor(public p5) {}

    show() {
        this.p5.fill(255);
        this.p5.ellipse(this.x, this.y, 32, 32);
    }

    up() {
        this.velocity += this.lift;
    }

    update() {
        this.velocity += this.gravity;
        // this.velocity *= 0.9;
        this.y += this.velocity;

        if (this.y > this.p5.height) {
            this.y = this.p5.height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
}
