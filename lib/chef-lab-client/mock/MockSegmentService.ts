import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
class MockSegmentService {
  public identify() {
    return Observable.from([])
  }

  public track() {
    return Observable.from([])
  }

  public page() {
    return Observable.from([])
  }

  public reset() {}
}

export default MockSegmentService
