import { Directive, OnInit, HostListener, Host } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
@Directive({
  selector: '.login-twitter'
})
export class LoginTwitterDirective {

  constructor(private _tokenService?: Angular2TokenService) {

  }
  @HostListener('click')
  clicked() {
    this._tokenService.signInOAuth('twitter').subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
  }
}
