import { Directive, HostListener } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'

@Directive({
  selector: '.login-linkedin',
})
export class LoginLinkedInDirective {

  constructor(private userProfileService: UserProfileService) {
  }

  @HostListener('click')
  clicked() {
    this.userProfileService.signInOAuth('linkedin')
  }
}
