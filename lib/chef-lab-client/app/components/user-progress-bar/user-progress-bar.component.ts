import { Component, OnInit, Input } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'user-progress-bar',
  templateUrl: './user-progress-bar.component.html'
})
export class UserProgressBarComponent implements OnInit {
  public progress: number

  @Input()
  module: string

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.userProfileService.activeUserProfile.subscribe((active) => {
      this.progress = (active && active.modules[this.module]) ? active.modules[this.module].progress : 0
    })
  }
}
