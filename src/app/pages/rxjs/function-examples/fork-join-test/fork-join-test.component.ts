import { Component } from '@angular/core';
import { forkJoin, Subject } from "rxjs";
import { MarbleEvent } from "../../../../components/observable-graph/observable-graph.component";
import { CommonModule } from "@angular/common";
import { ObservableAreaComponent } from "../../../../components/observable-area/observable-area.component";
import { makeStream } from "../../../../util/rxjs-helper-functions";

@Component({
  selector: 'app-fork-join-test',
  templateUrl: './fork-join-test.component.html',
  styleUrls: ['../../../pages.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ObservableAreaComponent,
  ]
})
export class ForkJoinTestComponent {
  codeSnippet = `
  testStream$ = forkJoin([
    this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3),
    this.makeStream(4),
    this.makeStream(5),
    this.makeStream(6),
    this.makeStream(7)
  ])
  `

  runStream$ = new Subject<MarbleEvent>();
  testStream$ = forkJoin([
    makeStream(1, this.runStream$),
    makeStream(2, this.runStream$),
    makeStream(3, this.runStream$),
    makeStream(4, this.runStream$),
    makeStream(5, this.runStream$),
    makeStream(6, this.runStream$),
    makeStream(7, this.runStream$)
  ]);
}
