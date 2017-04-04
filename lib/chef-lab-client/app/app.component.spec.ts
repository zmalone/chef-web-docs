/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing'
import { AppComponent} from './app.component'
import { SiteDataService } from './services/site-data.service'
import { ProgressService } from './services/progress.service'
import { UserProfileService } from './services/user-profile.service'
import { Angular2TokenService } from 'angular2-token'
import MockAngular2TokenService from '../mock/MockAngular2TokenService'
import MockSiteDataService from '../mock/MockSiteDataService'

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
