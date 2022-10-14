import { Component } from '@angular/core';
import { concat, from, Subject } from "rxjs";
import { MarbleEvent } from "../../../../components/observable-graph/observable-graph.component";
import { CommonModule } from "@angular/common";
import { ObservableAreaComponent } from "../../../../components/observable-area/observable-area.component";
import { RouterLinkWithHref } from "@angular/router";
import { makePromise } from "../../../../util/rxjs-helper-functions";

console.log('loaded FromPromiseTestComponent');

@Component({
  selector: 'app-from-promise-test',
  templateUrl: './from-promise-test.component.html',
  styleUrls: ['../../../pages.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ObservableAreaComponent,
    RouterLinkWithHref,
  ]
})
export class FromPromiseTestComponent {
  codeSnippet = `
    testStream$ = concat(
      from(makePromise(1)),
      from(makePromise(2)),
      from(makePromise(3)),
      from(makePromise(4)),
      from(makePromise(5)),
      from(makePromise(6)),
      from(makePromise(7))
  )
  `
  runStream$ = new Subject<MarbleEvent>();

  testStream$ = concat(
    from(makePromise(1, this.runStream$)),
    from(makePromise(2, this.runStream$)),
    from(makePromise(3, this.runStream$)),
    from(makePromise(4, this.runStream$)),
    from(makePromise(5, this.runStream$)),
    from(makePromise(6, this.runStream$)),
    from(makePromise(7, this.runStream$))
  )

}
