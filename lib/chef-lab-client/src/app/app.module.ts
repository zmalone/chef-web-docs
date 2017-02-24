import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr';
import { ErrorHandlerService } from './services/error-handler.service';
//import { Ng2UiAuthModule } from 'ng2-ui-auth';
//import { MyAuthConfig } from '../config';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StampsComponent } from './components/stamps/stamps.component';
import { LoginGithubDirective } from './directives/login-github/login-github.directive';
import { LoginGoogleDirective } from './directives/login-google/login-google.directive';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';
const routerConfig: Routes = [];

export const routes = RouterModule.forRoot(routerConfig, { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    StampsComponent,
    LoginGithubDirective,
    LoginGoogleDirective
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ToastModule.forRoot(),
    A2tUiModule
  ],
  providers: [
    ErrorHandlerService,
    Angular2TokenService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
