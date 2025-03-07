import {Injectable} from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  tooltip: any;

  constructor() {
    this.create();
  }

  show(text: string, x: number, y: number): void {
    this.tooltip
      .style('visibility', 'visible')
      .style('position', 'absolute')
      .text(text)
      .style('left', x + 10 + 'px')
      .style('top', y - 10 + 'px');
  }

  move(x: number, y: number): void {
    this.tooltip
      .style('left', x + 10 + 'px')
      .style('top', y - 10 + 'px');
  }

  hide(): void {
    this.tooltip.style('visibility', 'hidden');
  }

  private create(): void {
    this.tooltip = d3.select('body .main')
      .append('div')
      .attr('class', 'tooltip')
  }
}
