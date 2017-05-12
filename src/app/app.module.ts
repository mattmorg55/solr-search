import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { LevelOfCompletionComponent } from './level-of-completion/level-of-completion.component';
import { ReviewStatusComponent } from './review-status/review-status.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LevelOfCompletionComponent,
    ReviewStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
