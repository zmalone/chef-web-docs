import { Injectable } from '@angular/core'
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs'
import { SegmentService } from './segment.service'
import { Angular2TokenService } from 'angular2-token'
import { User, UserInfo } from '../model'

@Injectable()
export class UserProfileService {
  public userProfile: BehaviorSubject<User> = new BehaviorSubject(<User> {})
  private isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(
    private segmentService: SegmentService,
    private _tokenService: Angular2TokenService,
  ) {
    this.isSignedIn.subscribe(isAuthenticated => {
      if (isAuthenticated) this.loadUserProfile().subscribe()
      if (!isAuthenticated) this.userProfile.next(<User> {})
    })
  }

  public isAuthenticated = function() {
    const isAuthenticated = this._tokenService.userSignedIn()
    if (this.isSignedIn.getValue() !== isAuthenticated) this.isSignedIn.next(isAuthenticated)
    return this.isSignedIn
  }

  public signInOAuth(serviceName: string) {
    return this._tokenService.signInOAuth(serviceName)
      .concat(this._tokenService.validateToken)
      .concat(this.loadUserProfile.bind(this))
      .mergeMap(this.identifyUser.bind(this))
      .mergeMap(() => {
        this.isSignedIn.next(true)
        return this.isSignedIn
      })
  }

  public signOut() {
    // Clear local storage before firing the next method, as the progress service depends on this data
    localStorage.clear()
    this.isSignedIn.next(false)
    this.segmentService.reset()
    return this._tokenService.signOut()
  }

  public loadPublicProfile(userId): Observable<UserInfo> {
    return this._tokenService.get('api/v1/users/' + userId).map(res => <UserInfo> res.json())
  }

  public updateUserProfile(user): Observable<User> {
    return this._tokenService.put('api/v1/profile', user)
    .map(res => <User> res.json())
    .mergeMap(userInfo => {
      this.userProfile.next(userInfo)
      return this.userProfile
    })
  }

  private loadUserProfile(): Observable<User> {
    return this._tokenService.get('api/v1/profile')
      .map(res => <User> res.json() )
      .mergeMap(userInfo => {
        this.userProfile.next(userInfo)
        return this.userProfile
      })
  }

  private identifyUser(userInfo) {
    return this.segmentService.identify(userInfo.id, {
      email: userInfo.email,
      createdAt: userInfo.created_at,
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      username: userInfo.display_name,
    })
  }
}
