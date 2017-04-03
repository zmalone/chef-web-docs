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
  ) {}

  ngOnInit() {
    this.countries = COUNTRY
    this.updateStatus = false
    this.userProfileService.isAuthenticated().subscribe(next => {
      if (!next) window.location.href = '/'
    })
    this.userProfileService.userProfile.subscribe(user => {
      this.user = user
      this.userInfo = Object.assign({}, this.user)
    })
  }

  updateUserProfile() {
    this.userProfileService.updateUserProfile(this.userInfo)
      .subscribe(
        () => {
          window.scrollTo(0, 0)
          this.updateStatus = true
          return true
        },
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
