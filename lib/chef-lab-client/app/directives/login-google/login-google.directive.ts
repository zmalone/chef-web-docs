import { Directive, HostListener } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'

@Directive({
  selector: '.login-google',
})
export class LoginGoogleDirective {

  constructor(private userProfileService: UserProfileService) {
  }

  @HostListener('click')
  clicked() {
    this.userProfileService.signInOAuth('google').subscribe()
  }
}
