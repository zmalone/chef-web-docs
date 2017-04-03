import { Component, OnInit } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'

@Component({
  selector: 'user-profile-link',
  templateUrl: './user-profile-link.component.html',
})
export class UserProfileLinkComponent implements OnInit {
  public isSignedIn = false

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.userProfileService.isAuthenticated().subscribe((next) => {
      this.isSignedIn = next
    })
  }
}
