import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-examreport',
  templateUrl: './examreport.component.html',
  styleUrls: ['./examreport.component.scss']
})
export class ExamreportComponent implements OnInit {
  chart: any;
  courseReport : any[] = [];
  @Input() courseLevelReport: any;


  ngOnChanges(changes: SimpleChanges) {
      this.courseReport = this.courseLevelReport;
  }

  ngOnInit() {
    console.log(this.courseReport);
    let names = this.courseReport.map(item => item.name);
    let averageMarks = this.courseReport.map(item => item.averageMarks);
    let totalAverageMarks = averageMarks.reduce((acc, val) => acc + val, 0);
    let overallPercentage = (totalAverageMarks / (averageMarks.length * 100)) * 100;

this.chart = new Chart('canvas', {
  type: 'bar',
  data: {
    labels: [...names, 'Overall'],
    datasets: [
      {
        label: 'Course',
        data: [...averageMarks, overallPercentage],
        backgroundColor: [...Array(names.length).fill('rgba(54, 162, 235, 0.6)'), 'rgba(255, 99, 132, 0.6)']
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
          labelString: 'CourseLevelAverage'
        },
        ticks: {
          beginAtZero: true,
          max: 100
        }
      }]
    }
  }
});

  }
}
