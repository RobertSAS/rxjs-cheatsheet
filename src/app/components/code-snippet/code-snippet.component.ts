import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import * as hljs from "highlight.js";
import { CommonModule } from "@angular/common";

console.log('loaded CodeSnippetComponent');

@Component({
  selector: "app-code-snippet",
  templateUrl: "./code-snippet.component.html",
  styleUrls: ["./code-snippet.component.scss"],
  imports: [
    CommonModule
  ],
  standalone: true
})
export class CodeSnippetComponent implements AfterViewInit {
  @Input() public codeSnippet = "";
  @ViewChild("code") private code?: ElementRef<HTMLElement>;

  constructor() {
  }

  ngAfterViewInit() {
    if (this.code) {
      hljs.default.highlightBlock(this.code.nativeElement);
    }
  }
}
