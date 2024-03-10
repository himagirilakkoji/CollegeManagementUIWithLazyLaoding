import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-examreport',
  templateUrl: './examreport.component.html',
  styleUrls: ['./examreport.component.scss']
})
export class ExamreportComponent implements OnInit {
  chart: any;

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Exam 5'],
        datasets: [
          {
            label: 'Marks',
            data: [85, 90, 78, 95, 88],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Exams'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Marks'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
