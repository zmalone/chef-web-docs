
import { CustomConfig } from 'ng2-ui-auth';

export const GITHUB_CLIENT_ID = '1d62a4020e18ecc7445a';

export class MyAuthConfig extends CustomConfig {
  defaultHeaders = {'Content-Type': 'application/json'};
  providers = { github: { clientId: GITHUB_CLIENT_ID }};
}
