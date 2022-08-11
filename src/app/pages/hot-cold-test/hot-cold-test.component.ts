import { Component } from '@angular/core';
import { ObservableGraphComponent } from "../../components/observable-graph/observable-graph.component";
import { CodeSnippetComponent } from "../../components/code-snippet/code-snippet.component";
import { CommonModule } from "@angular/common";
import { HotTestComponent } from "./hot-test/hot-test.component";
import { ColdTestComponent } from "./cold-test/cold-test.component";

console.log('loaded FromPromiseTestComponent');

@Component({
  selector: 'app-from-promise-test',
  templateUrl: './hot-cold-test.component.html',
  styleUrls: ['../pages.scss'],
  standalone: true,
  imports: [
    CodeSnippetComponent,
    ObservableGraphComponent,
    CommonModule,
    HotTestComponent,
    ColdTestComponent
  ]
})
export class HotColdTestComponent {
}
