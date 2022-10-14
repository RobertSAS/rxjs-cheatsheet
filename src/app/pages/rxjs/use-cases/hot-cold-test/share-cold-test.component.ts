import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ShareTestComponent } from "./share-test/share-test.component";
import { ColdTestComponent } from "./cold-test/cold-test.component";

console.log('loaded FromPromiseTestComponent');

@Component({
  selector: 'app-from-promise-test',
  templateUrl: './share-cold-test.component.html',
  styleUrls: ['../../../pages.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ShareTestComponent,
    ColdTestComponent
  ]
})
export class ShareColdTestComponent {
}
