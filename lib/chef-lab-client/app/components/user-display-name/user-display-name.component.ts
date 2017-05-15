import { Component, OnInit } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'

@Component({
  selector: 'user-display-name',
  template: '<span>{{displayName}}</span>',
})
export class UserDisplayNameComponent implements OnInit {
  public displayName: string

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.userProfileService.userProfile.subscribe(user => {
      this.displayName = user.display_name
    })
  }
}
