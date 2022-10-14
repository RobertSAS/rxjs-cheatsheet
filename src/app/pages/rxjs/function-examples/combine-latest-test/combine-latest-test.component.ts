import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { combineLatest, Observable, ReplaySubject, Subject, tap } from "rxjs";
import { MarbleEvent } from "../../../../components/observable-graph/observable-graph.component";
import { ObservableAreaComponent } from "../../../../components/observable-area/observable-area.component";
import { makeStream } from "../../../../util/rxjs-helper-functions";

export interface RxJSTestComponent {
  codeSnippet: string;
  testStream$: Observable<any>;
  runStream$: Subject<any>
}

@Component({
  selector: 'app-concat-test',
  templateUrl: './combine-latest-test.component.html',
  styleUrls: ['../../../pages.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ObservableAreaComponent,
  ]
})
export class CombineLatestTest implements RxJSTestComponent {
  codeSnippet = `
  combineLatestStream$ = combineLatest([
    this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3),
    this.triggerStream$
  ])
  `
  triggerCount = 0;
  triggerStreamSubject$ = new ReplaySubject<string>(1);

  runStream$: Subject<MarbleEvent> = new Subject<MarbleEvent>();
  triggerStream$ = this.triggerStreamSubject$.pipe(tap(data => this.runStream$.next({
    label: `${ data }`,
    time: Date.now()
  })));
  testStream$ = combineLatest([
    makeStream(1, this.runStream$),
    makeStream(2, this.runStream$),
    makeStream(3, this.runStream$),
    this.triggerStream$
  ])

  resetRunStream$(): void {
    this.runStream$ = new Subject<MarbleEvent>();
    this.triggerStream$ = this.triggerStreamSubject$.pipe(tap(data => this.runStream$.next({
      label: `${ data }`,
      time: Date.now()
    })));
    this.testStream$ = combineLatest([
      makeStream(1, this.runStream$),
      makeStream(2, this.runStream$),
      makeStream(3, this.runStream$),
      this.triggerStream$
    ])
  }

  doTrigger(): void {
    this.triggerStreamSubject$.next(`${ this.triggerCount++ }`);
  }
}
