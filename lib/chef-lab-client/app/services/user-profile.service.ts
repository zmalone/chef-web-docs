import { Injectable } from '@angular/core'
import { ReplaySubject, Observable } from 'rxjs'
import { Angular2TokenService } from 'angular2-token'
import { Response } from '@angular/http'
import { User } from '../model/user'


@Injectable()
export class UserProfileService {
  public activeUserProfile: ReplaySubject<any> = new ReplaySubject(1)

   constructor(private _tokenService: Angular2TokenService) {}

  public load(userId) {
    // TODO: Implement API, remove simulated async mock data, and refactor as needed
    // this.http.get('/user/' + userId).subscribe(res => this.activeUserProfile.next(res))
    setInterval(() => {
      this.activeUserProfile.next({
        modules: {
          'develop-locally': {
              progress: 100,
          },
          'getting-started': {
            progress: Math.floor(Math.random() * 100),
          },
          'learn-basics': {
            progress: Math.floor(Math.random() * 100),
          },
        },
      })
    }, 3000)
    return this.activeUserProfile
  }

  public getUserProfile(): Observable<User> {
    return this._tokenService.get('api/v1/profile').map(res => <User> res.json())
  }

  public updateUserProfile(user): Observable<User> {
    return this._tokenService.put('api/v1/profile', user).map(res => <User> res.json())
  }

}




