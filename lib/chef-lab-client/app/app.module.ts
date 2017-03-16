import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { ToastModule } from 'ng2-toastr'
import { HttpClient } from './services/http-client.service'
import { ErrorHandlerService } from './services/error-handler.service'
import { RouterModule, Routes } from '@angular/router'
import { Angular2TokenService, A2tUiModule } from 'angular2-token'

import { AppComponent } from './app.component'
import { LoginGithubDirective } from './directives/login-github/login-github.directive'
import { LoginGoogleDirective } from './directives/login-google/login-google.directive'
import { UserStartBtnDirective } from './directives/user-start-btn/user-start-btn.directive'
import { ModuleNextBtnDirective } from './directives/module-next-btn/module-next-btn.directive'
import { UserProfileService } from './services/user-profile.service'
import { UserProgressBarComponent } from './components/user-progress-bar/user-progress-bar.component'
import { UserModuleProgressComponent } from './components/user-module-progress/user-module-progress.component'
import { UserTrackProgressComponent } from './components/user-track-progress/user-track-progress.component'
import { DisplayNamePipe } from './pipe/display_name.pipe'
import { LoginTwitterDirective } from './directives/login-twitter/login-twitter.directive'
import { LoginLinkedInDirective } from './directives/login-linkedin/login-linkedin.directive'
import { LoginChefDirective } from './directives/login-chef/login-chef.directive'
import { ProgressService } from './services/progress.service'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { MaterialModule } from '@angular/material'


const routerConfig: Routes = []

export const routes = RouterModule.forRoot(routerConfig, { useHash: true })

@NgModule({
  declarations: [
    AppComponent,
    LoginGithubDirective,
    LoginGoogleDirective,
    UserStartBtnDirective,
    ModuleNextBtnDirective,
    UserProgressBarComponent,
    UserModuleProgressComponent,
    UserTrackProgressComponent,
    DisplayNamePipe,
    LoginTwitterDirective,
    LoginLinkedInDirective,
    LoginChefDirective,
    UserProfileComponent,
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ToastModule.forRoot(),
    A2tUiModule,
    MaterialModule,
  ],
  providers: [
    HttpClient,
    ErrorHandlerService,
    Angular2TokenService,
    UserProfileService,
    ProgressService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
  constructor (private progressService: ProgressService) {
    progressService.init()
  }
}
