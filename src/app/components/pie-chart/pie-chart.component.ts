import {AfterViewInit, Component, ElementRef, signal, ViewChild, WritableSignal} from '@angular/core';
import * as d3 from 'd3';
import {Store} from '@ngrx/store';
import {selectFilteredData} from '../../store/data.selectors';
import {TooltipService} from '../../services/tooltip.service';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  template: `<h2>Pie Chart</h2>
<div #pieChart></div>`,
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  private data: any[] = [];

  constructor(private store: Store, private tooltip: TooltipService) {
  }

  ngAfterViewInit(): void {
    this.store.select(selectFilteredData).subscribe((data) => {
      if (data?.length) {
        this.data = data;
        this.createPieChart();
      }
    })
  }

  private createPieChart(): void {
    const currentSVG = d3.select(this.pieChartRef.nativeElement).select('svg');
    if (currentSVG) {
      currentSVG.remove();
    }
    const width = 200,
      height = 200,
      radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3
      .select(this.pieChartRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<any>().value((d) => d.value);
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);
    const labelArc = d3.arc<any>().innerRadius(radius * 0.5).outerRadius(radius * 0.5);

    const arcs = svg.selectAll('path')
      .data(pie(this.data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i.toString()))
      .on('mouseover', (event, d) => {
        this.tooltip.show(`${d.data.category}: ${d.data.value}`, event.pageX, event.pageY)
      })
      .on('mousemove', (event) => {
        this.tooltip.move(event.pageX, event.pageY);
      })
      .on('mouseout', () => {
        this.tooltip.hide();
      });

    arcs.append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .text(d => d.data.category)
      .style('fill', 'white')
      .style('font-size', '12px');
  }
}
