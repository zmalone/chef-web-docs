import { Directive, OnInit, HostListener, Host } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Directive({
  selector: '.login-github'
})
export class LoginGithubDirective {

  constructor(private _tokenService?: Angular2TokenService) {

  }
  @HostListener('click')
  clicked() {
    this._tokenService.signInOAuth('github').subscribe(
      res =>      {
        this._tokenService.validateToken().subscribe(
          res =>      console.log(res),
          error =>    console.log(error)
        );
      },
      error =>    console.log(error)
    );
  }
}
