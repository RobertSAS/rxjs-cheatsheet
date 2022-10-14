import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from "../../../../components/code-snippet/code-snippet.component";
import { FromPromiseTestComponent } from "../../function-examples/from-promise-test/from-promise-test.component";
import { ObservableAreaComponent } from "../../../../components/observable-area/observable-area.component";
import { concat, from, Subject } from "rxjs";
import { MarbleEvent } from "../../../../components/observable-graph/observable-graph.component";
import { makeColdObs$, makePromise } from "../../../../util/rxjs-helper-functions";
import { RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-make-cold',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent, FromPromiseTestComponent, ObservableAreaComponent, RouterLinkWithHref],
  templateUrl: './make-cold.component.html'
})
export class MakeColdComponent implements OnInit {

  coldSnippet = `
    export const makeColdObs$ = <T>(input: () => Observable<T>): Observable<T> => of(true).pipe(switchMap(input));
  `

  codeSnippet = `
  testStream$ = concat(
    makeColdObs$(() => from(makePromise(1))),
    makeColdObs$(() => from(makePromise(2))),
    makeColdObs$(() => from(makePromise(3))),
    makeColdObs$(() => from(makePromise(4))),
    makeColdObs$(() => from(makePromise(5))),
    makeColdObs$(() => from(makePromise(6))),
    makeColdObs$(() => from(makePromise(7)))
  )
  `

  runStream$ = new Subject<MarbleEvent>();
  testStream$ = concat(
    makeColdObs$(() => from(makePromise(1, this.runStream$))),
    makeColdObs$(() => from(makePromise(2, this.runStream$))),
    makeColdObs$(() => from(makePromise(3, this.runStream$))),
    makeColdObs$(() => from(makePromise(4, this.runStream$))),
    makeColdObs$(() => from(makePromise(5, this.runStream$))),
    makeColdObs$(() => from(makePromise(6, this.runStream$))),
    makeColdObs$(() => from(makePromise(7, this.runStream$)))
  )

  constructor() {
  }

  ngOnInit(): void {
  }

}
