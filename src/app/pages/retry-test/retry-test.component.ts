import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, map, retry, Subject, takeUntil, tap, timer } from "rxjs";
import { ObservableGraphComponent } from "../../components/observable-graph/observable-graph.component";
import { CodeSnippetComponent } from "../../components/code-snippet/code-snippet.component";

@Component({
  selector: 'app-catch-error-test',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    ObservableGraphComponent,
    CommonModule],
  templateUrl: './retry-test.component.html',
  styleUrls: ['../pages.scss']
})
export class RetryTestComponent implements OnInit {
  codeSnippet = `
  combineLatestStream$ = combineLatest([
    this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3),
    this.triggerStream$
  ])
  `

  emitStream$ = new Subject<{ label: string, time: number }>();
  runStream$ = new Subject<{ label: string, time: number }>();
  makeErrors = false;

  startTime = Date.now();
  endTime = Number.NEGATIVE_INFINITY;
  destroy$ = new Subject<void>()

  makeStream = (i: number) => interval(i * 1000).pipe(
    map((data) => {
      if (this.makeErrors) {
        throw new Error('making errors');
      }
      return data;
    }),
    tap(() => this.runStream$.next(
      {
        label: `${ i }`,
        time: Date.now()
      }
    )),
    retry({
      count: 5,
      delay: (_, count) => {
        this.runStream$.next(
          {
            label: `E`,
            time: Date.now()
          }
        )
        return timer(Math.min(60000, 2 ^ count * 1000))
      }
    }))
  ;

  stream$ = this.makeStream(1)

  ngOnInit(): void {
  }

  doSubscribe(): void {
    this.startTime = Date.now();
    this.stream$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.emitStream$.next({
            label: `${ data }`,
            time: Date.now()
          })
        },
        error: (_) => {
          this.emitStream$.next({
            label: `E`,
            time: Date.now()
          })
          this.emitStream$?.complete();
          this.runStream$?.complete();
        },
        complete: () => {
          this.emitStream$?.complete();
          this.runStream$?.complete();
        }
      }
    )
  }

  doComplete(): void {
    this.destroy$.next();
    this.endTime = Date.now();
  }

  doError(): void {
    this.makeErrors = !this.makeErrors;
  }

  ngOnDestroy(): void {
    this.doComplete();
  }
}
