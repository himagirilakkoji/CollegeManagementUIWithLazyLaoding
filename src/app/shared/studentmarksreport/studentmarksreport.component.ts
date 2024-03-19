import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Chart from 'chart.js';
import { StudentMarks } from '../models/studentlist';
import { Sharedmodel } from '../sharedmodel';

@Component({
  selector: 'app-studentmarksreport',
  templateUrl: './studentmarksreport.component.html',
  styleUrls: ['./studentmarksreport.component.scss']
})
export class StudentmarksreportComponent {
  chart: any;
  distinctSemesters : any[] = [];
  @Input() studentMarksList:any;

  @Output() studentMarksReportEvent = new EventEmitter<Sharedmodel>();
  
  ngOnInit() {
    // Extract all the semesters
    const semesters = this.studentMarksList.map((item:any) => item.semester);
    // Get distinct semesters using Set
    this.distinctSemesters = Array.from(new Set(semesters));

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Marks',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'SubjectLevel'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'ExamMarks'
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
  onSemesterSelect(data:any){
    const selectedSemester = data.target.value;
    const selectedSemesterData = this.studentMarksList.filter((item: any) => item.semester === selectedSemester);

    const names = selectedSemesterData.map((item: any) => item.name);
    const marks = selectedSemesterData.map((item: any) => item.marks);

    const totalMarks = marks.reduce((total:any, mark:any) => total + mark, 0);
    const overallPercentage = (totalMarks / (marks.length * 100)) * 100;
  
    this.chart.data.labels = [...names, 'Overall'];
    this.chart.data.datasets[0].data = [...marks, overallPercentage];

    this.chart.data.datasets[0].backgroundColor = [
      ...Array(names.length).fill('rgba(75, 192, 192, 0.6)'),'rgba(0, 128, 0, 0.6)'
    ];

    this.chart.update();
  }

  navigateToStudentList(){
    let cancelCommonObj = new Sharedmodel();
    cancelCommonObj.isStudentlistClicked = true;
    this.studentMarksReportEvent.emit(cancelCommonObj);
  }
}
