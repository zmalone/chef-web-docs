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
    const [login, logout] = this.isSignedIn.partition(isAuthenticated => isAuthenticated)
    login
      .switchMap(this.loadUserProfile.bind(this))
      .switchMap(this.identifyNewUser.bind(this))
      .subscribe()
    logout.subscribe(() => { this.userProfile.next(<User> {}) })
  }

  public isAuthenticated = function() {
    const isAuthenticated = this._tokenService.userSignedIn()
    if (this.isSignedIn.getValue() !== isAuthenticated) this.isSignedIn.next(isAuthenticated)
    return this.isSignedIn
  }

  public signInOAuth(serviceName: string) {
    const observable = this._tokenService.signInOAuth(serviceName)
    // For sameWindow oAuth, observable is undefined here
    if (!observable) return Observable.never()
    // Due to the use of Observable.fromEvent in signInOAuth, use `first` here to unsubscribe after
    // the first message is received to avoid repeating events if a user signs out and back in.
    return observable.first()
      .switchMap(this.loadUserProfile.bind(this))
      .switchMap(this.identifyUser.bind(this))
      .switchMap(this.syncMarketo.bind(this))
      .switchMap(() => {
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
    .switchMap(userInfo => {
      this.userProfile.next(userInfo)
      return this.userProfile
    })
    .switchMap(this.syncMarketo.bind(this))
  }

  private loadUserProfile(): Observable<User> {
    return this._tokenService.get('api/v1/profile')
      .map(res => <User> res.json() )
      .switchMap(userInfo => {
        this.userProfile.next(userInfo)
        return this.userProfile.first()
      })
  }

  private identifyNewUser(userInfo) {
    if (localStorage.getItem('newLogin')) {
      localStorage.removeItem('newLogin')
      return this.identifyUser(userInfo)
    } else {
      return Observable.of(userInfo)
    }
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

  private syncMarketo(data) {
    // Make the API call and immediately return the input as an observable so we can use this in any
    // chain. If the Marketo sync fails, this observable should still complete successfully.
    this._tokenService.put('api/v1/profile_sync_marketo', {})
    return Observable.of(data)
  }
}
