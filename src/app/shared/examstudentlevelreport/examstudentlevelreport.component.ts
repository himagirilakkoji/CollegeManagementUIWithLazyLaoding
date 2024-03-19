import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Chart from 'chart.js';
import { Sharedmodel } from '../sharedmodel';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-examstudentlevelreport',
  templateUrl: './examstudentlevelreport.component.html',
  styleUrls: ['./examstudentlevelreport.component.scss']
})
export class ExamstudentlevelreportComponent {
  chart: any;
  @Output() facultySubjectReportEvent = new EventEmitter<Sharedmodel>();
  @Input() currentFacultyUser:any;
  subjectReport: any[] = [];
  sharedmodel = new Sharedmodel();
  constructor(private service:ServicesService){

  }

  ngOnInit() {
    this.service.getSubjectLevelReportById(this.currentFacultyUser[0].facultyID).subscribe(res =>{
         console.log(res);
         this.subjectReport = res;
         this.displayBarChart(this.subjectReport);
    });
  }

  displayBarChart(reports:any){
    let names = reports.map((item:any) => item.name);
    let averageMarks = reports.map((item:any) => item.averageMarks);
    let backgroundColors = Array(names.length).fill('rgba(255, 159, 64, 0.6)');
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [...names],
        datasets: [
          {
            label: 'Exams',
            data: [...averageMarks],
            backgroundColor: [...backgroundColors]
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Subjects'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'SubjectLevelAverage'
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
    this.facultySubjectReportEvent.emit(this.sharedmodel);
  }


}
