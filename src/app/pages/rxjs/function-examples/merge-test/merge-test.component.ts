import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { merge, Subject } from "rxjs";
import { MarbleEvent } from "../../../../components/observable-graph/observable-graph.component";
import { ObservableAreaComponent } from "../../../../components/observable-area/observable-area.component";
import { makeStream } from "../../../../util/rxjs-helper-functions";

@Component({
  selector: 'app-concat-test',
  templateUrl: './merge-test.component.html',
  styleUrls: ['../../../pages.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ObservableAreaComponent,
  ]
})
export class MergeTestComponent {
  codeSnippet = `
// making an array here because merge needs to be spread
  private streams = [makeStream(1, this.runStream$),
    makeStream(2, this.runStream$),
    makeStream(3, this.runStream$)];
  testStream$ = merge(...this.streams)
  `
  runStream$ = new Subject<MarbleEvent>();
  // making an array here because merge needs to be spread
  private streams = [makeStream(1, this.runStream$),
    makeStream(2, this.runStream$),
    makeStream(3, this.runStream$)];
  testStream$ = merge(...this.streams)
}
