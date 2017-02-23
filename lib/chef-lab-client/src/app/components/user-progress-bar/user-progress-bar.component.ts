import { Component, OnInit, Input } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'user-progress-bar',
  templateUrl: './user-progress-bar.component.html'
})
export class UserProgressBarComponent implements OnInit {
  public userProfile:any

  @Input()
  module: string = ''

  constructor(private userProfileService:UserProfileService) {}

  ngOnInit() {
    console.log('module? ', this.module)
    this.userProfileService.activeUserProfile.subscribe((active) => {
      this.userProfile = active
    })
    this.userProfileService.load(1);
  }
}
