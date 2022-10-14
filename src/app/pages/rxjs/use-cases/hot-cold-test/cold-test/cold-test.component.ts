import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subject, tap } from "rxjs";
import { MarbleEvent } from "../../../../../components/observable-graph/observable-graph.component";
import { ObservableAreaComponent } from "../../../../../components/observable-area/observable-area.component";

@Component({
  selector: 'app-cold-test',
  standalone: true,
  imports: [CommonModule, ObservableAreaComponent],
  templateUrl: './cold-test.component.html',
  styleUrls: ['../../../../pages.scss']
})
export class ColdTestComponent {
  codeSnippet = `
  testStream$ = interval(1000).pipe(
    tap((i) => this.runStream$.next({
      label: i,
      time: Date.now()
    }))
  );
  `
  runStream$ = new Subject<MarbleEvent>();

  testStream$ = interval(1000).pipe(
    tap((i) => this.runStream$.next({
      label: `${ i }`,
      time: Date.now()
    }))
  );

}
