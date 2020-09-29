import Response from '../sso/Response'
import Request from '../sso/Request'
import SingleSignOnRegistry from '../sso/SingleSignOnRegistry'
import SSOToken from '../sso/SSOToken'

export default class MyService {
  // @ts-ignore
  private readonly registry: SingleSignOnRegistry

  constructor(registry: SingleSignOnRegistry) {
    this.registry = registry
  }

  handleRequest(request: Request): Response {
    if (this.registry.isValid(request.getSSOToken().getToken()))
      return new Response(`hello ${request.getName()}!`)
    return new Response('invalid')
  }

  handleRegister(username: string, password: string): SSOToken {
    const token: SSOToken | undefined = this.registry.registerNewSession(username, password);
    if (token !== undefined)
      return token;
    return new SSOToken("Invalid");
  }

  handleUnRegister(token: SSOToken) {
    this.registry.unregister(token.getToken())
  }
}
