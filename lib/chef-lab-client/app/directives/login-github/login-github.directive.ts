import { Directive, HostListener } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'

@Directive({
  selector: '.login-github',
})
export class LoginGithubDirective {

  constructor(private userProfileService: UserProfileService) {
  }

  @HostListener('click')
  clicked() {
    this.userProfileService.signInOAuth('github')
  }
}
