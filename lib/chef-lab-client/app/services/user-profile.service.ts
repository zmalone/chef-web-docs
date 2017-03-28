import { Injectable } from '@angular/core'
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs'
import { Angular2TokenService } from 'angular2-token'
import { User } from '../model/user'

@Injectable()
export class UserProfileService {
  public userProfile: ReplaySubject<any> = new ReplaySubject(1)
  private isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private _tokenService: Angular2TokenService) {}

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
    this.isSignedIn.next(false)
    if (this._tokenService.signOut()) {
      localStorage.clear()
      return true
    } else {
      return false
    }
  }

  public getUserProfile(): Observable<User> {
    return this._tokenService.get('api/v1/profile').map(res => <User> res.json())
  }

  public updateUserProfile(user): Observable<User> {
    return this._tokenService.put('api/v1/profile', user).map(res => <User> res.json())
  }

  private onSignIn() {
    this.isSignedIn.next(true)
  }
}
