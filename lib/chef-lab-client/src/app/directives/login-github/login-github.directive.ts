import { Directive, OnInit, HostListener, Host } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Directive({
  selector: '.login-github'
})
export class LoginGithubDirective {

  constructor(private auth?: AuthService, private eh?: ErrorHandlerService) {
  }

  @HostListener('click')
  clicked() {
    this.auth.authenticate('github')
      .subscribe({
        error: (err: any) => this.eh.handleError(err),
        complete: () => function() {
          console.log('auth with github complete')
        }
      });
  }
}
