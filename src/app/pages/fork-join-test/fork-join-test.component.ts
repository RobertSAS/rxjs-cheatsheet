import { Component, OnInit } from '@angular/core';
import { delay, forkJoin, of, Subject, tap } from "rxjs";
import { CodeSnippetComponent } from "../../components/code-snippet/code-snippet.component";
import { ObservableGraphComponent } from "../../components/observable-graph/observable-graph.component";
import { CommonModule } from "@angular/common";

console.log('loaded ForkJoinTestComponent');

@Component({
  selector: 'app-fork-join-test',
  templateUrl: './fork-join-test.component.html',
  styleUrls: ['./fork-join-test.component.css'],
  standalone: true,
  imports: [
    CodeSnippetComponent,
    ObservableGraphComponent,
    CommonModule,
  ]
})
export class ForkJoinTestComponent implements OnInit {
  codeSnippet = `
  concatStream$ = forkJoin([
    this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3),
    this.makeStream(4),
    this.makeStream(5),
    this.makeStream(6),
    this.makeStream(7)
  ])
  `


  emitStream$ = new Subject<{ label: string, time: number }>();
  runStream$ = new Subject<{ label: string, time: number }>();
  startTime = Date.now();
  subscribeStartTime = Date.now();
  endTime = Number.NEGATIVE_INFINITY;

  makeStream = (i: number) => of(i).pipe(delay(Math.random() * 1000 + 1000), tap(() => this.runStream$.next(
    {
      label: `${ i }`,
      time: Date.now()
    }
  )));

  concatStream$ = forkJoin([
    this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3),
    this.makeStream(4),
    this.makeStream(5),
    this.makeStream(6),
    this.makeStream(7)
  ])

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
