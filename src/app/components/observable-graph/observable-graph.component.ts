import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";

console.log('loaded ObservableGraphComponent');

@Component({
  selector: 'app-observable-graph',
  templateUrl: './observable-graph.component.html',
  styleUrls: ['./observable-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ],
  standalone: true
})
export class ObservableGraphComponent implements OnInit {
  @Input() title!: string;
  @Input() startTime!: number;
  @Input() endTime!: number;

  events: MarbleEvent[] = [];
  graphData!: GraphData;
  destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  @Input() set stream$(input: Observable<MarbleEvent>) {
    this.destroy$.next();
    this.events = [];
    input.pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: data => {
          this.events.push(data);
          setTimeout(() => this.drawGraph());
        },
        complete: () => setTimeout(() => this.drawGraph())
      }
    )
  };

  getStyleForMarble = (marble: MarbleEvent, graphData: GraphData) => {
    return ({
      position: "absolute",
      "border-radius": "100%",
      background: ["Start", "Complete"].includes(marble.label) ? "" : "lightgray",
      width: "20px",
      height: "20px",
      transform: "translate(-50%, -50%)",
      left: `${ (marble.time - this.graphData.startTime) / this.graphData.totalTime * 100 }%`,
      top: `${ ++graphData.zIndex * 22 + 12 }px`,
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    })
  }

  ngOnInit(): void {
  }

  drawGraph() {
    const totalTime = this.endTime === Number.NEGATIVE_INFINITY ? Date.now() - this.startTime : this.endTime - this.startTime
    if (!this.startTime) {
      return;
    }
    this.graphData = {
      zIndex: 0,
      endTime: this.endTime,
      startTime: this.startTime,
      totalTime,
      events: [
        {
          label: "Start",
          time: this.startTime,
        },
        ...this.events
      ]
    }
    if (this.endTime !== Number.NEGATIVE_INFINITY) {
      this.graphData.events.push(
        {
          label: "Complete",
          time: this.endTime,
        })
    }
    this.cdr.markForCheck();
  }

}

export interface MarbleEvent {
  label: string,
  time: number
}

export interface GraphData {
  endTime: number,
  startTime: number,
  totalTime: number,
  zIndex: 0,
  events: MarbleEvent[]
}
