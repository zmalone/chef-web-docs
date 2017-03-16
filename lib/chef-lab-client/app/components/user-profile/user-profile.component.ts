import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'
import { ErrorHandlerService } from '../../services/error-handler.service'
import { User } from '../../model/user'
import { ToastsManager } from 'ng2-toastr'

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  providers: [UserProfileService, ErrorHandlerService, ToastsManager],
})
export class UserProfileComponent implements OnInit {
  user: User
  userInfo: any
  frmStatus: boolean

  constructor(
    private userProfileService: UserProfileService,
    private errHandlerService: ErrorHandlerService,
    public toastr: ToastsManager,
  ) {
  }

  ngOnInit() {
    this.getUserProfile()
  }

  getUserProfile() {
    this.userProfileService.getUserProfile()
      .subscribe(
        user => {
          this.user = user
          this.userInfo = Object.assign({}, this.user)
        },
        err => this.errHandlerService.handleError(err),
      )
  }

  updateUserProfile() {
    this.userProfileService.updateUserProfile(this.userInfo)
      .subscribe(
        res => {
          this.getUserProfile()
          return true
        },
        err => this.errHandlerService.handleError(err),
      )
  }
  showForm() {
    this.frmStatus = true
  }

  hideForm() {
    this.frmStatus = false
  }

}
