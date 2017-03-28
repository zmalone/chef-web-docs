import { Component, OnInit } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'
import { ErrorHandlerService } from '../../services/error-handler.service'
import { User } from '../../model/user'
import { COUNTRY } from './data/countries'

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
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
  ) {
  }

  ngOnInit() {
    this.getUserProfile()
    this.countries = COUNTRY
    this.updateStatus = false
    this.userProfileService.isAuthenticated().subscribe((next) => {
      if (!next) window.location.href = '/'
    })
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
