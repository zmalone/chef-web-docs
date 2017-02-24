import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { ToastModule } from 'ng2-toastr'
import { ErrorHandlerService } from './services/error-handler.service'
import { Ng2UiAuthModule } from 'ng2-ui-auth'
import { MyAuthConfig } from '../config'

import { AppComponent } from './app.component'
import { LoginGithubDirective } from './directives/login-github/login-github.directive'
import { UserStartBtnDirective } from './directives/user-start-btn.directive'
import { UserProfileService } from './services/user-profile.service'
import { UserProgressBarComponent } from './components/user-progress-bar/user-progress-bar.component'
import { UserModuleProgressComponent } from './components/user-module-progress/user-module-progress.component'
import { UserTrackProgressComponent } from './components/user-track-progress/user-track-progress.component'

@NgModule({
  declarations: [
    UserStartBtnDirective,
    AppComponent,
    LoginGithubDirective,
    UserProgressBarComponent,
    UserModuleProgressComponent,
    UserTrackProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
    Ng2UiAuthModule.forRoot(MyAuthConfig)
  ],
  providers: [
    ErrorHandlerService,
    UserProfileService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
