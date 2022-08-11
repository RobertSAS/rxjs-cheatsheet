import { Component, OnInit } from '@angular/core';
import { concat, from, Subject } from "rxjs";
import { ObservableGraphComponent } from "../../components/observable-graph/observable-graph.component";
import { CodeSnippetComponent } from "../../components/code-snippet/code-snippet.component";
import { CommonModule } from "@angular/common";

console.log('loaded FromPromiseTestComponent');

@Component({
  selector: 'app-from-promise-test',
  templateUrl: './from-promise-test.component.html',
  styleUrls: ['../pages.scss'],
  standalone: true,
  imports: [
    CodeSnippetComponent,
    ObservableGraphComponent,
    CommonModule,
  ]
})
export class FromPromiseTestComponent implements OnInit {
  codeSnippet = `
    concatStream$ = concat(
      from(this.makePromise(1)),
      from(this.makePromise(2)),
      from(this.makePromise(3)),
      from(this.makePromise(4)),
      from(this.makePromise(5)),
      from(this.makePromise(6)),
      from(this.makePromise(7))
  )
  `


  emitStream$ = new Subject<{ label: string, time: number }>();
  runStream$ = new Subject<{ label: string, time: number }>();
  startTime = Date.now();
  subscribeStartTime = Date.now();
  endTime = Number.NEGATIVE_INFINITY;

  makePromise = (i: number) => new Promise((resolve) => {
    setTimeout(() => {
      this.runStream$.next({
        label: `${ i }`,
        time: Date.now()
      })
      resolve(i)
    }, Math.random() * 3000 + 1000)
  })

  concatStream$ = concat(
    from(this.makePromise(1)),
    from(this.makePromise(2)),
    from(this.makePromise(3)),
    from(this.makePromise(4)),
    from(this.makePromise(5)),
    from(this.makePromise(6)),
    from(this.makePromise(7))
  )

  ngOnInit(): void {
  }

  doSubscribe(): void {
    this.subscribeStartTime = Date.now();
    this.concatStream$.subscribe({
        next: (data) => {
          this.emitStream$.next({
            label: `${ data }`,
            time: Date.now()
          })
        },
        complete: () => {
          this.endTime = Date.now();
          this.emitStream$.complete();
          this.runStream$.complete();
        }
      }
    )
  }


}
