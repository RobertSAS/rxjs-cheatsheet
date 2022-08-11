import { Component } from '@angular/core';
import { lodashResults } from "./benchmark-lodash-es";
import { buildTests } from "../../../testFunctions";
import { testData } from "../../../testData";
import { lodashArrayRunners, lodashObjectRunners } from "../lodash-test/benchmark-lodash";
import { delay, Observable, of } from "rxjs";
import { CommonModule } from "@angular/common";

console.log('loaded LodashEsTestComponent');

@Component({
  selector: 'app-lodash-es-test',
  templateUrl: './lodash-es-test.component.html',
  styleUrls: ['../../pages.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class LodashEsTestComponent {
  results = lodashResults;
  count = 0;

  constructor() {
    buildTests(lodashResults, lodashArrayRunners, testData.arrayTests)
    buildTests(lodashResults, lodashObjectRunners, testData.objectTests)
  }

  runStep(delayS: number): Observable<number> {
    return of(delayS).pipe(
      delay(Math.random() * 3000)
    )
  }

  runTest(test: (duration: number) => void, duration: number): void {
    test(duration);
  }


}
