class Player {
  position: { x: number; y: number };
  width: number;
  height: number;
  ball: HTMLImageElement;
  canvasWidth: number;
  canvasHeight: number;
  sides: { bottom: number };
  velocity: { x: number; y: number };
  gravity: number;
  speed: number;
  maxSpeed: number;

  constructor(
    private context: CanvasRenderingContext2D | null,
    ball: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.position = {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 0.4;
    this.gravity = 0.4;
    this.maxSpeed = 15;
    this.width = 126;
    this.height = 126;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.ball = ball;
    this.ball.onload = () => {
      this.draw();
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };
  }

  draw() {
    if (this.context) {
      this.context.clearRect(this.position.x, this.position.y, this.width, this.height);
      this.context.drawImage(this.ball, this.position.x, this.position.y);
    }
  }
  // this.ball = new Sprite({
  //   context,
  //   position: {
  //     x: player.position.x,
  //     y: player.position.y,
  //     width: player.width,
  //     height: player.height,
  //   },
  //   source: ballImage,
  // });

  update() {
    console.log(this.position.x);
    // управление скростью
    if (this.velocity.x === 0) {
      this.speed = 0;
    }
    if (this.velocity.x > 0) {
      if (this.speed < this.maxSpeed) {
        this.speed = this.speed + 0.1;
      }
      this.position.x += this.speed + this.velocity.x;
    }
    if (this.velocity.x < 0) {
      if (this.speed < this.maxSpeed) {
        this.speed = this.speed + 0.1;
      }
      this.position.x += -this.speed + this.velocity.x;
    }
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;
    // прямо здесь над нижней части окна
    if (this.sides.bottom + this.velocity.y < this.canvasHeight) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

export default Player;
