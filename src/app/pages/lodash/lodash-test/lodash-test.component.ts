import { Component } from '@angular/core';
import { lodashArrayRunners, lodashObjectRunners, lodashResults } from "./benchmark-lodash";
import { buildTests } from "../../../testFunctions";
import { testData } from "../../../testData";
import { CommonModule } from "@angular/common";

console.log('loaded LodashTestComponent');

@Component({
  selector: 'app-lodash-test',
  templateUrl: './lodash-test.component.html',
  styleUrls: ['./lodash-test.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class LodashTestComponent {
  results = lodashResults;

  constructor() {
    buildTests(lodashResults, lodashArrayRunners, testData.arrayTests)
    buildTests(lodashResults, lodashObjectRunners, testData.objectTests)
  }

  runTest(test: (duration: number) => void, duration: number): void {
    test(duration);
  }
}
