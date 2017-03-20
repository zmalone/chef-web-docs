import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'
import { ErrorHandlerService } from '../../services/error-handler.service'
import { User } from '../../model/user'
import { COUNTRY } from './data/countries'
import { Angular2TokenService } from 'angular2-token'

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  providers: [UserProfileService, ErrorHandlerService],
})
export class UserProfileComponent implements OnInit {
  user: User
  userInfo: any
  frmStatus: boolean
  updateStatus: boolean
  countries: any

  constructor(
    private userProfileService: UserProfileService,
    private errHandlerService: ErrorHandlerService,
    private _tokenService: Angular2TokenService,
  ) {
    if ( !this._tokenService.userSignedIn() ) {
      window.location.href = '/'
    }
  }

  ngOnInit() {

    this.getUserProfile()
    this.countries = COUNTRY
    this.updateStatus = false
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
          window.scrollTo( 0, 0 )
          this.updateStatus = true
          return true
        },
        err => this.errHandlerService.handleError(err),
      )
  }
  showForm() {
    this.frmStatus = true
  }

  hideForm() {
    this.updateStatus = false
    this.frmStatus = false
  }

}
