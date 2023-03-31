window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.font = '40px Helvetica';
    ctx.textAlign = 'center';

    class Player {
        constructor(game) {
            this.game = game;
            this.collisionX = this.game.width * 2;
            this.collisionY = this.game.height * 2;
            this.collisionRadius = 30;
        }

        draw(context) {
            if (this.game.debug) {
                context.beginPath();
                context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
                context.save();
                context.globalAlpha = 0.5;
                context.fill();
                context.restore();
                context.stroke();
            }
        }

        update() {

        }
    }

    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.debug = true;
            this.player = new Player(this);
        }

        render(context, deltaTime) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.gameObjects = [this.player];
            // this.gameObjects.sort((a, b) => {
            //     return a.collisionY - b.collisionY;
            // });
            this.gameObjects.forEach(object => {
                object.draw(context);
                object.update(deltaTime);
            });
        }

        init() {
            
        }
    }

    const game = new Game(canvas);
    game.init()

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.render(ctx, deltaTime);
        window.requestAnimationFrame(animate);
    }
    animate(0);
})