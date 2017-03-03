import { Directive, OnInit, HostListener, Host } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
@Directive({
  selector: '.login-chef'
})
export class LoginChefDirective {

  constructor(private _tokenService?: Angular2TokenService) {

  }
  @HostListener('click')
  clicked() {
    this._tokenService.signInOAuth('chef').subscribe(
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
