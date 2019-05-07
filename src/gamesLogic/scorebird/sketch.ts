import p5 from "p5";
import { Pipe } from "./pipe";
import { Bird } from "./bird";

let bird;
const pipes: Array<Pipe> = [];
var myCanvas;

export const scorebird = function(finalScore: Function) {
    return new p5(p => {
        p.setup = () => {
            myCanvas = p.createCanvas(660, 260).parent("myContainer");
            bird = new Bird(p);
            pipes.push(new Pipe(p));
        };

        p.draw = () => {
            p.background(0);

            for (var i = pipes.length - 1; i >= 0; i--) {
                pipes[i].show();
                pipes[i].update();

                if (pipes[i].hits(bird)) {
                    finalScore(1, p);
                    console.log("HIT");
                }

                if (pipes[i].offscreen()) {
                    pipes.splice(i, 1);
                }
            }

            bird.update();
            bird.show();

            if (p5.frameCount % 75 == 0) {
                pipes.push(new Pipe(p));
            }
        };

        p.keyPressed = e => {
            if (e.key == " ") {
                bird.up();
                //console.log("SPACE");
            }
        };
    });
};
