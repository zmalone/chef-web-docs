import { Injectable } from '@angular/core'

@Injectable()
class MockAngular2TokenService {
  public init() {}

  public userSignedIn() {
    return false
  }
}

export default MockAngular2TokenService
