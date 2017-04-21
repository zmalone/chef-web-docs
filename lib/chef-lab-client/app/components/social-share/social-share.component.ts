import { Component, OnChanges, Input } from '@angular/core'
import { SiteDataService } from '../../services/site-data.service'

@Component({
  selector: 'social-share',
  templateUrl: './social-share.component.html',
})
export class SocialShareComponent implements OnChanges {
  private sharer_url = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?',
    twitter: 'https://twitter.com/intent/tweet?',
    google: 'https://plus.google.com/share?',
    linkedin: 'https://www.linkedin.com/shareArticle?mini=true',
  }
  public facebookURL: string
  public googleURL: string
  public twitterURL: string
  public linkedinURL: string

  @Input()
  url: string

  @Input()
  socialData: any

  constructor(
    private siteDataService: SiteDataService,
  ) {}

  ngOnChanges() {
    const social_data = this.socialData || this.siteDataService.currentPage().socialShare
    this.facebookURL = this.sharer_url['facebook'] + 'u=' + this.baseURL() + this.url
    this.googleURL = this.sharer_url['google'] + 'url=' + this.baseURL() + this.url
    this.twitterURL = this.sharer_url['twitter'] + 'text=' +
      social_data['tweet_text'] + '&url=' + this.baseURL() + this.url
    this.linkedinURL = this.sharer_url['linkedin'] + '&title=' + social_data['linkedin_title'] +
      '&summary=' + social_data['linkedin_summary'] + '&url=' + this.baseURL() + this.url
  }

  private baseURL() {
    const loc = window.location
    const baseUrl = (loc.origin) ? loc.origin : loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '')
    return baseUrl
  }
}
