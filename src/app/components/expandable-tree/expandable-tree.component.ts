import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-expandable-tree',
  templateUrl: './expandable-tree.component.html',
  styleUrls: ['./expandable-tree.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ExpandableTreeComponent implements OnInit {
  @Input() expanded = false;
  @Input() title = 'Expand';

  constructor() {
  }

  ngOnInit(): void {
  }

}
