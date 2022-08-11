import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { delay, merge, of, Subject, tap } from "rxjs";
import { CodeSnippetComponent } from "../../components/code-snippet/code-snippet.component";
import { ObservableGraphComponent } from "../../components/observable-graph/observable-graph.component";

@Component({
  selector: 'app-concat-test',
  templateUrl: './merge-test.component.html',
  styleUrls: ['../pages.scss'],
  standalone: true,
  imports: [
    CodeSnippetComponent,
    ObservableGraphComponent,
    CommonModule,
  ]
})
export class MergeTestComponent implements OnInit {
  codeSnippet = `
  streams = [this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3)];
  mergeStream$ = concat(...this.streams)
  `


  emitStream$ = new Subject<{ label: string, time: number }>();
  runStream$ = new Subject<{ label: string, time: number }>();
  subscribeStartTime = Date.now();
  endTime = Number.NEGATIVE_INFINITY;

  makeStream = (i: number) => of(i).pipe(delay(Math.random() * 1000 + 1000), tap(() => this.runStream$.next(
    {
      label: `${ i }`,
      time: Date.now()
    }
  )));

  private streams = [this.makeStream(1),
    this.makeStream(2),
    this.makeStream(3)];
  mergeStream$ = merge(...this.streams)

  ngOnInit(): void {
  }

  doSubscribe(): void {
    this.subscribeStartTime = Date.now();
    this.mergeStream$.subscribe({
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
