import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from "../../../../components/code-snippet/code-snippet.component";
import { FromPromiseTestComponent } from "../../function-examples/from-promise-test/from-promise-test.component";
import { ObservableAreaComponent } from "../../../../components/observable-area/observable-area.component";
import { concat, Subject } from "rxjs";
import { MarbleEvent } from "../../../../components/observable-graph/observable-graph.component";
import { makeStream, makeSuperHotObs$ } from "../../../../util/rxjs-helper-functions";
import { RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-make-hot',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent, FromPromiseTestComponent, ObservableAreaComponent, RouterLinkWithHref],
  templateUrl: './make-super-hot.component.html'
})
export class MakeSuperHotComponent implements OnInit {

  hotSnippet = `
    export const makeSuperHotObs$ = <T>(input: Observable<T>, takeCount = 1, takeUntilObs?: Observable<any>): Observable<T> => {
  const destroy$ = new Subject<void>();
  const toReturn = new ReplaySubject<T>(1);
  input
    .pipe(
      takeCount > 0 ? take(takeCount) : map((res) => res),
      takeUntilObs ? takeUntil(takeUntilObs) : map((res) => res),
      takeUntil(destroy$)
    )
    .subscribe(toReturn);
  let refs = 0;
  return new Observable<T>((observer) => {
    refs++;
    const sub = toReturn.subscribe(observer);
    return () => {
      refs--;
      if (refs === 0) {
        destroy$.next();
      }
      sub.unsubscribe();
    };
  });
};
  `

  codeSnippet = `
callsToMake = [
    makeStream(1, this.runStream$),
    makeStream(2, this.runStream$),
    makeStream(3, this.runStream$),
    makeStream(4, this.runStream$),
    makeStream(5, this.runStream$),
    makeStream(6, this.runStream$),
    makeStream(7, this.runStream$)
  ]
  testStream$ = makeSuperHotObs$(concat(
    ...this.callsToMake
  ), this.callsToMake.length, -1)
  `

  runStream$ = new Subject<MarbleEvent>();
  callsToMake = [
    makeStream(1, this.runStream$),
    makeStream(2, this.runStream$),
    makeStream(3, this.runStream$),
    makeStream(4, this.runStream$),
    makeStream(5, this.runStream$),
    makeStream(6, this.runStream$),
    makeStream(7, this.runStream$)
  ]
  testStream$ = makeSuperHotObs$(concat(
    ...this.callsToMake
  ), this.callsToMake.length, -1)

  constructor() {
  }

  ngOnInit(): void {
  }

}
