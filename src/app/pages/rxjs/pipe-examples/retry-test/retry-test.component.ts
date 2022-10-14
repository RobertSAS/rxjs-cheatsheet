import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, map, retry, Subject, tap, timer } from "rxjs";
import { MarbleEvent } from "../../../../components/observable-graph/observable-graph.component";
import { ObservableAreaComponent } from "../../../../components/observable-area/observable-area.component";

@Component({
  selector: 'app-catch-error-test',
  standalone: true,
  imports: [
    CommonModule,
    ObservableAreaComponent
  ],
  templateUrl: './retry-test.component.html',
  styleUrls: ['../../../pages.scss']
})
export class RetryTestComponent {
  codeSnippet = `
  makeStream = (i: number) => interval(i * 1000).pipe(
    map((data) => {
      if (this.makeErrors) {
        throw new Error('making errors');
      }
      return data;
    }),
    tap(() => this.runStream$.next(
      {
        label: \`$\{i\}\`,
        time: Date.now()
      }
    )),
    retry({
      count: 5,
      delay: (_, count) => {
        this.runStream$.next(
          {
            label: \`E\`,
            time: Date.now()
          }
        )
        return timer(Math.min(60000, 2 ^ count * 1000))
      }
    }));

  testStream$ = this.makeStream(1)
  `

  makeErrors = false;
  runStream$ = new Subject<MarbleEvent>();

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
    }));

  testStream$ = this.makeStream(1)

}
