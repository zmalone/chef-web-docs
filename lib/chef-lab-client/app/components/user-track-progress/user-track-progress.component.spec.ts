/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { UserTrackProgressComponent } from './user-track-progress.component'
import { SiteDataService } from '../../services/site-data.service'
import { ProgressService } from '../../services/progress.service'
import { UserProfileService } from '../../services/user-profile.service'
import { Angular2TokenService } from 'angular2-token'
import MockAngular2TokenService from '../../../mock/MockAngular2TokenService'
import MockSiteDataService from '../../../mock/MockSiteDataService'

describe('UserTrackProgressComponent', () => {
  let component: UserTrackProgressComponent
  let fixture: ComponentFixture<UserTrackProgressComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTrackProgressComponent ],
      providers: [
        ProgressService,
        UserProfileService,
        { provide: Angular2TokenService, useClass: MockAngular2TokenService },
        { provide: SiteDataService, useClass: MockSiteDataService },
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrackProgressComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
