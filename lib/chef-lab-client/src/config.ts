
import { CustomConfig } from 'ng2-ui-auth';
import {Request, Response} from '@angular/http';
import {Inject} from '@angular/core';
import {IHttpInterceptor} from 'angular2-http-interceptor';


export const GITHUB_CLIENT_ID = '1d62a4020e18ecc7445a';
export const GOOGLE_CLIENT_ID = '10853652301-hflh57t29bvb6glnlc21uqibit8cp2eu.apps.googleusercontent.com';
export const CHEF_API_CONFIG = {url:'http://localhost:3000/', clientId:''};

export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {
      github: {
        clientId: GITHUB_CLIENT_ID,
  },
      google: {
        clientId: GOOGLE_CLIENT_ID,
    }
    };
}

export class AuthInterceptor implements IHttpInterceptor {
  before(request: Request): Request {
    var fl=request.url.match(/(google|github|twitter|linkedin)/g)
    if(request.url == '/auth/github'){
      request.url = CHEF_API_CONFIG.url.concat('oauth/token')
      var existingBody = JSON.parse(request.getBody())
      var requestPlayLoad = {
        grant_type: 'password',
        provider: existingBody.name,
        code: existingBody.code,
        clientId: existingBody.clientId,
      }
      var requestOptions = {
        'body': JSON.stringify(requestPlayLoad),
        'url': request.url,
        'headers': request.headers,
        'method': request.method,
        'withCredentials': request.withCredentials,
        'responseType': request.responseType,
      }
      request.constructor(requestOptions)

    }
    return request;
  }
}
