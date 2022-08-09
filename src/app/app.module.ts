import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { ExpandableTreeComponent } from "./components/expandable-tree/expandable-tree.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ExpandableTreeComponent,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
