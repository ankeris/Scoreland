import p5 from "p5";
import { Pipe } from "./pipe";
import { Bird } from "./bird";

let bird;
const pipes: Array<Pipe> = [];
let points: number = 0;

export const scorebird = function(finalScore: Function) {
    return new p5(p => {
        p.setup = () => {
            p.createCanvas(800, 260).parent("myContainer");
            bird = new Bird(p);
            pipes.push(new Pipe(p));
        };

        p.draw = () => {
            p.background(0);
            for (let i = pipes.length - 1; i >= 0; i--) {
                pipes[i].show();
                pipes[i].update();

                if (pipes[i].hits(bird)) {
                    finalScore(points);
                    p.remove();
                    p.clear();
                }

                if (pipes[i].offscreen()) {
                    pipes.splice(i, 1);
                }

                if (pipes[i].isPoint(bird)) {
                    points++;
                }
            }

            bird.update();
            bird.show();

            if (p.frameCount % 45 == 0) {
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
