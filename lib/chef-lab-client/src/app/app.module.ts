import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserProfileService } from './services/user-profile.service'
import { UserStartBtnDirective } from './directives/user-start-btn.directive'
import { AppComponent } from './app.component'
import { UserProgressBarComponent } from './components/user-progress-bar/user-progress-bar.component'
import { UserModuleProgressComponent } from './components/user-module-progress/user-module-progress.component'
import { UserTrackProgressComponent } from './components/user-track-progress/user-track-progress.component'

@NgModule({
  declarations: [
    UserStartBtnDirective,
    AppComponent,
    UserProgressBarComponent,
    UserModuleProgressComponent,
    UserTrackProgressComponent
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
