import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserProfileService } from './services/user-profile.service'
import { AppComponent } from './app.component';
import { UserProgressBarComponent } from './components/user-progress-bar/user-progress-bar.component';
import { StampsComponent } from './components/stamps/stamps.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProgressBarComponent,
    StampsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
