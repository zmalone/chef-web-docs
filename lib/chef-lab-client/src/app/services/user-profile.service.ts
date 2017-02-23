import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs"

@Injectable()
export class UserProfileService {
  public activeUserProfile:ReplaySubject<any> = new ReplaySubject(1)

  // constructor(private http: Http) {}

  public load(userId) {
    // TODO: Cache the profile after it has loaded once
    console.log('Loading user profile: ' + userId, Date.now())
    // TODO: Implement API, remove simulated async mock data, and refactor as needed
    // this.http.get('/user/' + userId).subscribe(res => this.activeUserProfile.next(res))
    setTimeout(() => {
      this.activeUserProfile.next({
        modules: {
          'develop-locally': {
            progress: 42
          },
          'getting-started': {
            progress: 88
          }
        }
      })
    }, 1000);
    return this.activeUserProfile;
  }
}
