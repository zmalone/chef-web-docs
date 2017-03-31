import { Injectable } from '@angular/core'
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs'
import { Angular2TokenService } from 'angular2-token'
import { User } from '../model/user'

@Injectable()
export class UserProfileService {
  public userProfile: BehaviorSubject<User> = new BehaviorSubject(<User> {})
  private isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private _tokenService: Angular2TokenService) {
    this.isSignedIn.subscribe(isAuthenticated => {
      if (isAuthenticated) this.loadUserProfile()
      if (!isAuthenticated) this.userProfile.next(<User> {})
    })
  }

  public isAuthenticated = function() {
    const isAuthenticated = this._tokenService.userSignedIn()
    if (this.isSignedIn.getValue() !== isAuthenticated) this.isSignedIn.next(isAuthenticated)
    return this.isSignedIn
  }

  public signInOAuth(serviceName: string) {
    this._tokenService.signInOAuth(serviceName).subscribe(
        () => this._tokenService.validateToken().subscribe(this.onSignIn.bind(this), console.error),
        console.error,
    )
  }

  public signOut() {
    // Clear local storage before firing the next method, as the progress service depends on this data
    localStorage.clear()
    this.isSignedIn.next(false)
    return this._tokenService.signOut()
  }

  public loadUserProfile(): Observable<User> {
    const observable = this._tokenService.get('api/v1/profile').map(res => <User> res.json())
    observable.subscribe(
      userInfo => { this.userProfile.next(userInfo) },
      console.error,
    )
    return observable
  }

  public updateUserProfile(user): Observable<User> {
    const observable = this._tokenService.put('api/v1/profile', user).map(res => <User> res.json())
    observable.subscribe(
      userInfo => { this.userProfile.next(userInfo) },
      console.error,
    )
    return observable
  }

  private onSignIn() {
    this.isSignedIn.next(true)
  }
}
