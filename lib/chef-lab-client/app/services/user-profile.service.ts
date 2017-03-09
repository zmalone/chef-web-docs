import { Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs'

@Injectable()
export class UserProfileService {
  public activeUserProfile: ReplaySubject<any> = new ReplaySubject(1)

  // constructor(private http: Http) {}

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
}
