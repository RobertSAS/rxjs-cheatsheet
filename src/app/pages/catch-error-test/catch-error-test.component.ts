import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, interval, map, Subject, takeUntil, tap } from "rxjs";
import { ObservableGraphComponent } from "../../components/observable-graph/observable-graph.component";
import { CodeSnippetComponent } from "../../components/code-snippet/code-snippet.component";

@Component({
  selector: 'app-catch-error-test',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    ObservableGraphComponent,
    CommonModule],
  templateUrl: './catch-error-test.component.html',
  styleUrls: ['../pages.scss'],
})
export class CatchErrorTestComponent implements OnInit {
  codeSnippet1 = `
  catchError((err, caught) => {
      this.runStream$.next(
        {
          label: E,
          time: Date.now()
        });
      throw err;
    }))
  `
  codeSnippet2 = `
  catchError((err, caught) => {
      this.runStream$.next(
        {
          label: \`E\`,
          time: Date.now()
        });
      return this.newStream(i);
    })
  `

  emitStream$ = new Subject<{ label: string, time: number }>();
  runStream$ = new Subject<{ label: string, time: number }>();
  makeErrors = false;
  startTime = Date.now();
  endTime = Number.NEGATIVE_INFINITY;
  destroy$ = new Subject<void>();

  newStream = (i: number) => interval(i * 1000).pipe(map((x) => `${ x * 10 }`), tap((x) => this.runStream$.next(
    {
      label: `${ x }`,
      time: Date.now()
    }
  )))

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
    catchError((_, __) => {
      this.runStream$.next(
        {
          label: `E`,
          time: Date.now()
        });
      return this.newStream(i);
    }))

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
    this.makeErrors = true;
  }

  ngOnDestroy(): void {
    this.doComplete();
  }
}
