import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  counter: number = 0;
  isLoading = new Subject<boolean>();
  
  constructor() { }

  show(){
    this.counter++;
    this.isLoading.next(true);
  }

  hide(){
    this.counter--;
    if(this.counter === 0){
       this.isLoading.next(false);
    }
  }

}
