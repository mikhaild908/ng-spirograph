import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SpirographComponent } from './spirograph/spirograph.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('spirograph') spirograph: SpirographComponent;

  title = 'Spirograph Generator';

  R: string;
  r: string;
  l: string;

  red: number;
  green: number;
  blue: number;
  alpha: number;

  ngOnInit() {
    this.R = '150';
    this.r =  '65';
    this.l = '0.8';

    this.red = 255;
    this.green = 255;
    this.blue = 255;
    this.alpha = 1.0;
  }

  public onDrawSpirograph(): void {
    this.spirograph.draw();
  }
}
