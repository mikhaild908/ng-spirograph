import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spirograph',
  templateUrl: './spirograph.component.html',
  styleUrls: ['./spirograph.component.css']
})
export class SpirographComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  @Input() R: number; // 220; // 150;
  @Input() r: number; // 65
  @Input() l: number; // 0.8

  @Input() red = 255;
  @Input() green = 255;
  @Input() blue = 255;
  @Input() alpha = 1.0;

  private xc: number;
  private yc: number;
  private k: number;
  private nRot: number;

  constructor() { }

  ngOnInit() {
    if (this.R && this.r && this.l) {
      this.setParameters(this.getCanvasWidth() / 2, this.getCanvasHeight() / 2, this.R, this.r, this.l);
      this.drawSpirograph();
    }
  }

  private setParameters(xc: number, yc: number, R: number, r: number, l: number): void {
    this.xc = xc;
    this.yc = yc;
    this.R = R;
    this.r = r;
    this.l = l;

    const gcdVal = this.gcd(this.r, this.R);

    this.k = r / R;
    this.nRot = this.r / gcdVal;
  }

  private mapTo256(value: number, max: number): number {
    return 256 / max * value;
  }

  private getColor(r: number, g: number, b: number, a: number): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  private gcd(a: number, b: number): number {
    if (b) {
        return this.gcd(b, a % b);
    } else {
        return Math.abs(a);
    }
  }

  private toRadians(theta: number): number {
    return theta * (Math.PI / 180.0);
  }

  private drawFiftyThousandRandomCircles(): void {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = 'black'; // '#DD0031';

    for (let i = 0 ; i < 50000 ; i++) {
      const x = Math.random() * 500;
      const y = Math.random() * 500;
      ctx.moveTo(x, y);
      ctx.arc(x, y, 1, 0, Math.PI * 2);
    }

    ctx.fill();
  }

  private getCanvasHeight(): number {
    return this.canvasRef.nativeElement.height;
  }

  private getCanvasWidth(): number {
    return this.canvasRef.nativeElement.width;
  }

  private drawSpirograph(): void {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
    ctx.beginPath();

    ctx.fillStyle = this.getColor(this.red, this.green, this.blue, this.alpha);

    let theta = 0;
    const R = this.R;
    const k = this.k;
    const l = this.l;

    const max = 360 * this.nRot;

    for (let i = 0; i < 360 * this.nRot + 1; i++) {
      theta = this.toRadians(i);

      const x = R * ((1 - k) * Math.cos(theta) + l * k * Math.cos((1 - k) * theta / k));
      const y = R * ((1 - k) * Math.sin(theta) - l * k * Math.sin((1 - k) * theta / k));

      // ctx.fillStyle = this.getColor(0, this.mapTo256(i, max), this.mapTo256(i, max), 1);

      ctx.fillRect(this.xc + x, this.yc + y, 1, 1);
    }

    ctx.fill();
  }

  public draw(): void {
    this.setParameters(this.getCanvasWidth() / 2, this.getCanvasHeight() / 2, this.R, this.r, this.l);
    this.drawSpirograph();
  }
}
