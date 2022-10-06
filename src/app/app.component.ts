import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { event as d3Event } from 'd3-selection';
import * as R from 'ramda';
import { AppService } from './app-service.service';

function getScoreColour(score: number | null, defaultColor = 'LightGray') {
    if (R.isNil(score) || Number.isNaN(score) || score > 10) {
        return defaultColor;
    }
    if (score <= 2.5) {
        return '#ce181f';
    }
    if (score <= 5) {
        return '#f47721';
    }
    if (score <= 7.5) {
        return '#ffc709';
    }
    return '#d6e040';
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  // title = 'globe-demo';
  //title changes done for app component testcase
  //Changed by Shikha Singh
  title ="Client's Risk Portfolio";

  public countryData : any;
  public countryDetails: string | undefined;
  public showCountry : boolean;

 //Implementation of Service Changed by Shikha Singh
  constructor(private api: AppService){  }

  ngOnInit(): void {
    this.api.getCountryData().subscribe(
      data =>{
      this.countryData = data;
      })
      this.loadGlobe();
  }
  //end

  private loadGlobe() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const sensitivity = 75;

    const projection = d3.geoOrthographic()
      .scale(400)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);


    const initialScale = projection.scale();
    let path = d3.geoPath().projection(projection);

    const svg = d3.select('#globe')
      .append('svg')
      .attr('width', width - 20)
      .attr('height', height - 20);

    const globe = svg.append('circle')
      .attr('fill', '#ADD8E6')
      .attr('stroke', '#000')
      .attr('stroke-width', '0.2')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', initialScale);

    svg.call(d3.drag().on('drag', () => {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([
        rotate[0] + d3Event.dx * k,
        rotate[1] - d3Event.dy * k
      ]);
      path = d3.geoPath().projection(projection);
      svg.selectAll('path').attr('d', path);
    }))
      .call(d3.zoom().on('zoom', () => {
        if (d3Event.transform.k > 0.3) {
          projection.scale(initialScale * d3Event.transform.k);
          path = d3.geoPath().projection(projection);
          svg.selectAll('path').attr('d', path);
          globe.attr('r', projection.scale());
        }
        else {
          d3Event.transform.k = 0.3;
        }
      }));

    const map = svg.append('g');

    d3.json('assets/ne_110m_admin_0_countries.json', (err, d) => {
      map.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(d.features)
        .enter().append('path')
        .attr('class', (d: any) => 'country_' + d.properties.ISO_A2)
        .attr('d', path)
        .attr('fill', (d: any) => getScoreColour(this.getCountryScore(d.properties.ISO_A2)))
        .style('stroke', 'black')
        .style('stroke-width', 0.3)
        .on('mouseleave', (d: any) => this.clearDetails())
        .on('mouseover', (d: any) => this.showDetails(d.properties.ISO_A2, d.properties.NAME));
    });

  }

  private getCountryScore(countryCode: string): number | undefined {
    const country = this.countryData[countryCode];
    return country ? country.score : undefined;
  }

  private clearDetails() {
    this.countryDetails = undefined;
  }

  private showDetails(countryCode: string, countryName: string) {
    const country = this.countryData[countryCode];
    this.showCountry = country['entitled'];
    if (!country) {
      this.countryDetails = undefined;
      return;
    }
    //Error1 on crome for below mentioned line
    //this.countryDetails = `${countryName}: ${country.score.toFixed(2)}`;
    //Cannot read properties of undefined (reading 'toFixed')
    // at AppComponent.showDetails (app.component.ts:127:60)
    // at SVGPathElement.<anonymous> (app.component.ts:107:43)
    // at SVGPathElement.<anonymous> (on.js:27:1)
    // at ZoneDelegate.invokeTask (zone.js:406:1)
    // at Object.onInvokeTask (core.js:28679:1)
    // at ZoneDelegate.invokeTask (zone.js:405:1)
    // at Zone.runTask (zone.js:178:1)
    // at ZoneTask.invokeTask [as invoke] (zone.js:487:1)
    // at invokeTask (zone.js:1600:1)
    // at SVGPathElement.globalZoneAwareCallback (zone.js:1626:1)

    //previous line of code
    // this.countryDetails = `${countryName}: ${country.score.toFixed(2)}`;

    //changes in code done by ShikhaSingh
    if(this.showCountry){
      this.countryDetails = `${countryName}: ${country.score?.toFixed(2)}`;
    }
    
  }
}
