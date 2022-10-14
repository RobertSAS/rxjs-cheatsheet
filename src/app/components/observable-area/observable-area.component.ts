import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarbleEvent, ObservableGraphComponent } from "../observable-graph/observable-graph.component";
import { CodeSnippetComponent } from "../code-snippet/code-snippet.component";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-observable-area',
  standalone: true,
  imports: [CommonModule, ObservableGraphComponent, CodeSnippetComponent],
  templateUrl: './observable-area.component.html',
  styleUrls: ['./observable-area.component.css']
})
export class ObservableAreaComponent implements OnDestroy {
  makeErrors = false;
  @Input() showMakeErrors = false;
  @Input() codeSnippet!: string;
  emitStream$: Subject<MarbleEvent> = new Subject();
  startTime = Date.now();
  subscribeStartTime = Date.now();
  endTime = Number.NEGATIVE_INFINITY;
  destroy$ = new Subject<void>();
  @Output() endStreamTriggerChange = new EventEmitter<boolean>();
  @Input() runStream$!: Subject<MarbleEvent>;
  @Output() makeErrorsChange = new EventEmitter<boolean>();

  subscriberLabelChar = 65;
  @Input() showSubscriberLabels = false;

  _testStream$?: Observable<any>;

  @Input() set testStream$(input: Observable<any> | undefined) {
    console.log(input);
    if (!input) {
      return;
    }
    this.destroy$.next();
    this._testStream$ = input;
  };

  @Input() set endStreamTrigger(input: boolean) {
    if (!input) {
      return;
    }
    this.destroy$.next();
    this.endStreamTriggerChange.emit(false);
  }

  doSubscribe(): void {
    if (!this._testStream$) {
      throw new Error('need test stream$ input set')
    }
    const subscriberLabel = String.fromCharCode(this.subscriberLabelChar++);
    this.subscribeStartTime = Date.now();
    this._testStream$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
        next: (data) => {
          this.emitStream$.next({
            label: `${ this.showSubscriberLabels ? subscriberLabel : '' }${ data }`,
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

  doComplete(): void {
    this.destroy$.next();
    this.endTime = Date.now();
  }

  doError(): void {
    this.makeErrors = !this.makeErrors;
    this.makeErrorsChange.emit(this.makeErrors);
  }

  ngOnDestroy(): void {
    this.doComplete();
  }
}
