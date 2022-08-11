import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { concat, delay, of, ReplaySubject, Subject, takeUntil, tap } from "rxjs";
import { CodeSnippetComponent } from "../../components/code-snippet/code-snippet.component";
import { ObservableGraphComponent } from "../../components/observable-graph/observable-graph.component";

@Component({
  selector: 'app-concat-test',
  templateUrl: './concat-test.component.html',
  styleUrls: ['../pages.scss'],
  standalone: true,
  imports: [
    CodeSnippetComponent,
    ObservableGraphComponent,
    CommonModule,
  ]
})
export class ConcatTestComponent implements OnInit {
  codeSnippet = `
  streams = [this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3)];
  concatStream$ = concat(...this.streams)
  `

  triggerStreamSubject$ = new ReplaySubject<string>(1);
  emitStream$ = new Subject<{ label: string, time: number }>();
  runStream$ = new Subject<{ label: string, time: number }>();
  triggerStream$ = this.triggerStreamSubject$.pipe(tap(data => this.runStream$.next({
    label: `${ data }`,
    time: Date.now()
  })));
  subscribeStartTime = Date.now();
  endTime = Number.NEGATIVE_INFINITY;
  triggerCount = 0;
  destroy$ = new Subject<void>();

  makeStream = (i: number) => of(i).pipe(delay(Math.random() * 1000 + 1000), tap(() => this.runStream$.next(
    {
      label: `${ i }`,
      time: Date.now()
    }
  )));

  private streams = [this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3),
    this.triggerStream$
  ];
  concatStream$ = concat(...this.streams)

  ngOnInit(): void {
  }

  doSubscribe(): void {
    this.subscribeStartTime = Date.now();
    this.concatStream$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.emitStream$.next({
            label: `${ data }`,
            time: Date.now()
          })
        },
        complete: () => {
          this.emitStream$.complete();
          this.runStream$.complete();
          this.triggerStreamSubject$.complete();
        }
      }
    )
  }

  doComplete(): void {
    this.endTime = Date.now();
    this.destroy$.next();
  }

  doTrigger(): void {
    this.triggerStreamSubject$.next(`${ this.triggerCount++ }`);
  }

  ngOnDestroy(): void {
    this.doComplete();
  }
}
