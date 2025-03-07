import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {selectFilteredData} from '../../store/data.selectors';
import {Store} from '@ngrx/store';
import {TooltipService} from '../../services/tooltip.service';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  template: `<h2>Bar Chart</h2><div #barChart></div>`,
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef;
  private data: any[] = [];

  constructor(private store: Store, private tooltip: TooltipService) {
  }

  ngAfterViewInit(): void {
    this.store.select(selectFilteredData).subscribe((data) => {
      if (data?.length) {
        this.data = data;
        this.createBarChart();
      }
    })
  }

  private createBarChart(): void {
    const currentSVG = d3.select(this.barChartRef.nativeElement).select('svg');
    if (currentSVG) {
      currentSVG.remove();
    }
    const width = 300,
      height = 200,
      margin = {top: 20, right: 20, bottom: 50, left: 50};

    const svg = d3
      .select(this.barChartRef.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(this.data.map((d) => d.category))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.value)!])
      .nice()
      .range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.category)!)
      .attr('y', (d) => y(d.value)!)
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value)!)
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        this.tooltip.show(`${d.category}: ${d.value}`, event.pageX, event.pageY);
      })
      .on('mousemove', (event) => {
        this.tooltip.move(event.pageX, event.pageY);
      })
      .on('mouseout', () => {
        this.tooltip.hide();
      });
    svg
      .selectAll('.label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => x(d.category)! + x.bandwidth() / 2)
      .attr('y', (d) => y(d.value)! - 5)
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .style('font-size', '12px')
      .text((d) => d.value);
  }
}
