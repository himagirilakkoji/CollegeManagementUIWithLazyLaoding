import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { Sharedmodel } from '../sharedmodel';

@Component({
  selector: 'app-examreport',
  templateUrl: './examreport.component.html',
  styleUrls: ['./examreport.component.scss']
})
export class ExamreportComponent implements OnInit {
  chart: any;
  courseReport: any[] = [];
  @Input() courseLevelReport: any;
  @Output() facultyCourseReportEvent = new EventEmitter<Sharedmodel>();

  sharedmodel = new Sharedmodel()


  ngOnChanges(changes: SimpleChanges) {
    this.courseReport = this.courseLevelReport;
  }

  ngOnInit() {
    console.log(this.courseReport);
    let names = this.courseReport.map(item => item.name);
    let averageMarks = this.courseReport.map(item => item.averageMarks);
    let totalAverageMarks = averageMarks.reduce((acc, val) => acc + val, 0);
    let overallPercentage = ((totalAverageMarks / (averageMarks.length * 100)) * 100);
    overallPercentage = Math.round(overallPercentage * 100) / 100;

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [...names, 'Overall'],
        datasets: [
          {
            label: 'Course',
            data: [...averageMarks, overallPercentage],
            backgroundColor: [...Array(names.length).fill('rgba(153, 102, 255, 0.6)'), 'rgba(75, 0, 130, 0.6)']
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'CourseLevel'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'ExamsAverage'
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

  navigateToFacultyList(){
    this.sharedmodel.isAddFacultyClicked = false;
    this.sharedmodel.isAddStudentClicked = false;
    this.sharedmodel.isEditFacultyClicked = false;
    this.sharedmodel.isFacultylistClicked = true;
    this.sharedmodel.isStudentlistClicked = false;
    this.sharedmodel.isRegitrtionPageClicked = false;
    this.sharedmodel.isAddStudentMarksClicked = false;
    this.sharedmodel.isFacultyReportClicked = false;
    this.facultyCourseReportEvent.emit(this.sharedmodel);
  }

  navigateToSubjectLevelReport(){
    this.sharedmodel.isAddFacultyClicked = false;
    this.sharedmodel.isAddStudentClicked = false;
    this.sharedmodel.isEditFacultyClicked = false;
    this.sharedmodel.isFacultylistClicked = false;
    this.sharedmodel.isStudentlistClicked = false;
    this.sharedmodel.isRegitrtionPageClicked = false;
    this.sharedmodel.isAddStudentMarksClicked = false;
    this.sharedmodel.isFacultyReportClicked = false;
    this.sharedmodel.isSubjectReportClicked = true;
    this.facultyCourseReportEvent.emit(this.sharedmodel);
  }
}
