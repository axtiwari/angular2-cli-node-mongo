import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	@ViewChild('canvas1') canvas1: ElementRef;
	chart = [];

	@ViewChild('canvas2') canvas2: ElementRef;
	chart2 = [];

	@ViewChild('canvas3') canvas3: ElementRef;
	chart3 = [];

	constructor() { }

	ngAfterViewInit() {
	}

	ngOnInit() {
		this.showChart1();
		this.showChart2();
		this.showChart3();
	}

	showChart1() {
		this.chart = new Chart(this.canvas1.nativeElement.getContext('2d'), {
			type: 'bar',
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}

	showChart2() {

		var barChartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'Dataset 1',
				backgroundColor: 'rgba(62, 174, 230, 0.64)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
				data: [
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1)
				]
			}, {
				label: 'Dataset 2',
				backgroundColor: 'rgba(249, 30, 69, 0.66)',
				borderColor: 'rgba(249, 30, 69, 0.66)',
				borderWidth: 1,
				data: [
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1),
					Math.floor((Math.random() * 100) + 1)
				]
			}]

		};

		this.chart2 = new Chart(this.canvas2.nativeElement.getContext('2d'), {
			type: 'bar',
			data: barChartData,
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Chart.js Bar Chart'
				}
			}
		});
	}

	showChart3() {

		var pieChartData = {
			type: 'pie',
			data: {
				datasets: [{
					data: [
						Math.round(Math.random() * 100),
						Math.round(Math.random() * 100),
						Math.round(Math.random() * 100),
						Math.round(Math.random() * 100),
						Math.round(Math.random() * 100),
					],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Red',
					'Orange',
					'Yellow',
					'Green',
					'Blue'
				]
			},
			options: {
				responsive: true,
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Chart.js Pie Chart'
				}
			}
		};

		this.chart3 = new Chart(this.canvas3.nativeElement.getContext('2d'), pieChartData);
	}

}

