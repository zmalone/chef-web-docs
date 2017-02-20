import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr';
import { ErrorHandlerService } from './services/error-handler.service';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { MyAuthConfig } from '../config';

import { AppComponent } from './app.component';
import { StampsComponent } from './components/stamps/stamps.component';
import { LoginGithubDirective } from './directives/login-github/login-github.directive';

@NgModule({
  declarations: [
    AppComponent,
    StampsComponent,
    LoginGithubDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
    Ng2UiAuthModule.forRoot(MyAuthConfig)
  ],
  providers: [
    ErrorHandlerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
