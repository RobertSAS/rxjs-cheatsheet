import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, share, Subject, takeUntil, tap } from "rxjs";
import { CodeSnippetComponent } from "../../../components/code-snippet/code-snippet.component";
import { ObservableGraphComponent } from "../../../components/observable-graph/observable-graph.component";

@Component({
  selector: 'app-hot-test',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    ObservableGraphComponent, CommonModule],
  templateUrl: './hot-test.component.html',
  styleUrls: ['./../../pages.scss']

})
export class HotTestComponent {
  codeSnippet = `
  stream$ = interval(1000).pipe(
    tap((i) => this.runStream$.next({
      label: i,
      time: Date.now()
    })),
    shareReplay()
  );
  `
  emitStream$ = new Subject<{ label: string, time: number }>();
  runStream$ = new Subject<{ label: string, time: number }>();
  startTime = Date.now();
  subscribeStartTime = Date.now();
  endTime = Number.NEGATIVE_INFINITY;

  stream$ = interval(1000).pipe(
    tap((i) => this.runStream$.next({
      label: `${ i }`,
      time: Date.now()
    })),
    share()
  );

  subscriberLabelChar = 65;
  destroy$ = new Subject<void>();

  doSubscribe(): void {
    const thisLabel = this.subscriberLabelChar++;
    if (!this.subscribeStartTime) {
      this.subscribeStartTime = Date.now();
    }
    this.stream$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.emitStream$.next({
            label: `${ String.fromCharCode(thisLabel) + data }`,
            time: Date.now()
          })
        },
        complete: () => {
          this.emitStream$.next({
            label: `${ String.fromCharCode(thisLabel) }X`,
            time: Date.now()
          })
        }
      }
    )
  }

  doUnsubscribe(): void {
    this.destroy$.next();
  }
}
