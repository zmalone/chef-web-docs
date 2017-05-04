/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing'
import { AppComponent} from './app.component'
import { SiteDataService } from './services/site-data.service'
import { ProgressService } from './services/progress.service'
import { UserProfileService } from './services/user-profile.service'
import { SegmentService } from './services/segment.service'
import { Angular2TokenService } from 'angular2-token'
import { Device } from 'ng2-device-detector'
import MockAngular2TokenService from '../mock/MockAngular2TokenService'
import MockSiteDataService from '../mock/MockSiteDataService'
import MockDeviceService from '../mock/MockDeviceDetector'
import MockSegmentService from '../mock/MockSegmentService'

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      providers: [
        ProgressService,
        UserProfileService,
        { provide: Angular2TokenService, useClass: MockAngular2TokenService },
        { provide: SiteDataService, useClass: MockSiteDataService },
        { provide: Device, useClass: MockDeviceService },
        { provide: SegmentService, useClass: MockSegmentService },
      ],
    })
    TestBed.compileComponents()
  })

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))

})
