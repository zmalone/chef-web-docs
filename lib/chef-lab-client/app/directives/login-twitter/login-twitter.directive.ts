import { Directive, HostListener } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'

@Directive({
  selector: '.login-twitter',
})
export class LoginTwitterDirective {

  constructor(private userProfileService: UserProfileService) {
  }

  @HostListener('click')
  clicked() {
    this.userProfileService.signInOAuth('twitter')
  }
}
