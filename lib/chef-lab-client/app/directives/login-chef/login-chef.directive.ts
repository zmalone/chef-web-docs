import { Directive, HostListener } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'

@Directive({
  selector: '.login-chef',
})
export class LoginChefDirective {

  constructor(private userProfileService: UserProfileService) {
  }

  @HostListener('click')
  clicked() {
    this.userProfileService.signInOAuth('chef')
  }
}
