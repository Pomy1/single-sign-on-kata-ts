import MyService from '../src/myservice/MyService';
import Request from '../src/sso/Request';
import SSOToken from '../src/sso/SSOToken';
import { SingleSignOnRegistryStub } from '../src/myservice/SingleSignOnRegistryStub';
import { SingleSignOnRegistryFake } from './fakes/SingleSignOnRegistryFake';

describe('MyService', () => {
  it('invalid sso token is rejected', () => {
    const service = new MyService(new SingleSignOnRegistryStub());

    const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

    expect(response.getText()).not.toEqual('hello Foo!');
  });

  it('valid sso token is accepted', () => {
    const service = new MyService(new SingleSignOnRegistryFake());

    const response = service.handleRequest(new Request('Luis', new SSOToken('abcdLuis')));

    expect(response.getText()).toEqual('hello Luis!');
  });


  it('invalid user and password is rejected by SSO', () => {
    const service = new MyService(new SingleSignOnRegistryFake());

    const token = service.handleRegister("miguel","hola");

    expect(token.getToken()).toEqual('Invalid');
  });

  it('valid user and password is accepted by SSO', () => {
    const service = new MyService(new SingleSignOnRegistryFake());

    const token = service.handleRegister("Pepe","pwdPepe");

    expect(token.getToken()).not.toEqual('Invalid');
  });

  it('valid sso unregister', () => {
    const sso = new SingleSignOnRegistryFake()
    const service = new MyService(sso);
    const token = new SSOToken("adsfsdf")
    
    service.handleUnRegister(token);

    expect(sso.checkUnregister("adsfsdf")).toBeTruthy();
  });
});
