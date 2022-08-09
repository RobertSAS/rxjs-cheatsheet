import { Component } from '@angular/core';
import { lodashResults } from "./benchmark-lodash-es";
import { buildTests } from "../../testFunctions";
import { testData } from "../../testData";
import { lodashArrayRunners, lodashObjectRunners } from "../../lodash-test/lodash-test/benchmark-lodash";
import { BehaviorSubject, delay, forkJoin, Observable, of, ReplaySubject, Subject } from "rxjs";

@Component({
  selector: 'app-lodash-es-test',
  templateUrl: './lodash-es-test.component.html',
  styleUrls: ['./lodash-es-test.component.css']
})
export class LodashEsTestComponent {
  results = lodashResults;
  replaySubject = new ReplaySubject<number>(4);
  behaviourStatusSubject = new BehaviorSubject<string>('not started');
  subject1 = new Subject<number>();
  subject2 = new Subject<number>();
  subject3 = new Subject<number>();
  count = 0;

  constructor() {
    buildTests(lodashResults, lodashArrayRunners, testData.arrayTests)
    buildTests(lodashResults, lodashObjectRunners, testData.objectTests)
  }

  play(input: number): void {
    switch (input) {
      case 1:
        this.subject1.next(this.count++);
        break;
      case 2:
        this.subject2.next(this.count++);
        break;
      case 3:
        this.subject3.next(this.count++);
        break;
      default:
        break;
    }
  }

  subscribe(): void {
    this.replaySubject.subscribe(data => console.log(data))
  }

  runStep(delayS: number): Observable<number> {
    return of(delayS).pipe(
      delay(Math.random() * 3000)
    )
  }

  runConcat(): void {
    this.behaviourStatusSubject.next('starting');
    forkJoin(
      [
        this.runStep(1),
        this.runStep(2),
        this.runStep(3)
      ]
    ).pipe().subscribe(
      (data) => {
        console.log(data);
        this.behaviourStatusSubject.next(`completed step ${ data }`)
        console.log('concat complete')
      }
    )
  }

  runTest(test: (duration: number) => void, duration: number): void {
    test(duration);
  }


}
