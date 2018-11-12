import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'cn-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const interval$ = interval(1000);
    const sub  = interval$.subscribe(console.log);
    setTimeout(() => {
      sub.unsubscribe();
    }, 5000);
  }

}
