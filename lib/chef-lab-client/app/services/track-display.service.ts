import {Subject, Observable} from 'rxjs'
import {Config} from '../config/config'

export class TrackDisplayService {

  private trackCnt: number
  private trackCounter = new Subject<number>()

  constructor() {
    this.trackCnt = 0
  }

  setTrackDisplayCounter() {
    this.trackCnt = this.trackCnt + Config.SHOW_TRACKS
    this.trackCounter.next(this.trackCnt)
  }

  getTrackDisplayCounter(): Observable<number> {
    return this.trackCounter.asObservable()
  }


}
