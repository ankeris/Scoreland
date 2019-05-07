export class Pipe {
    spacing: number = 175;
    top: number = this.p5.random(this.p5.height / 6, (3 / 4) * this.p5.height);
    bottom: number = this.p5.height - (this.top + this.spacing);
    x: number = this.p5.width;
    w: number = 80;
    speed: number = 6;
    highlight: boolean = false;
    constructor(public p5) {}

    hits(bird) {
        if (bird.y < this.top || bird.y > this.p5.height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    show() {
        this.p5.fill(255);
        if (this.highlight) {
            this.p5.fill(255, 0, 0);
        }
        this.p5.rect(this.x, 0, this.w, this.top);
        this.p5.rect(this.x, this.p5.height - this.bottom, this.w, this.bottom);
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}
