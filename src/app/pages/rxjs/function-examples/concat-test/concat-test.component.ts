import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { concat, ReplaySubject, Subject, tap } from "rxjs";
import { MarbleEvent } from "../../../../components/observable-graph/observable-graph.component";
import { ObservableAreaComponent } from "../../../../components/observable-area/observable-area.component";
import { makeStream } from "../../../../util/rxjs-helper-functions";

@Component({
  selector: 'app-concat-test',
  templateUrl: './concat-test.component.html',
  styleUrls: ['../../../pages.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ObservableAreaComponent,
  ]
})
export class ConcatTestComponent {
  codeSnippet = `
  private streams = [makeStream(1, this.runStream$),
    makeStream(2, this.runStream$),
    makeStream(3, this.runStream$),
    this.triggerStream$
  ];
  testStream$ = concat(...this.streams)
  `

  triggerStreamSubject$ = new ReplaySubject<string>(1);
  runStream$ = new Subject<MarbleEvent>();
  triggerStream$ = this.triggerStreamSubject$.pipe(tap(data => this.runStream$.next({
    label: `${ data }`,
    time: Date.now()
  })));
  triggerCount = 0;

  private streams = [makeStream(1, this.runStream$),
    makeStream(2, this.runStream$),
    makeStream(3, this.runStream$),
    this.triggerStream$
  ];
  testStream$ = concat(...this.streams)

  doTrigger(): void {
    this.triggerStreamSubject$.next(`${ this.triggerCount++ }`);
  }

}
