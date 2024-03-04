import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isloader:boolean = false;
  constructor(private loaderService: SpinnerService) {
    this.loaderService.isLoading.subscribe(result =>{ this.isloader = result});;
  }
}
