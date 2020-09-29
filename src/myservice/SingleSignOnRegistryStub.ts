import SSOToken from '../sso/SSOToken';
import SingleSignOnRegistry from '../sso/SingleSignOnRegistry';

export class SingleSignOnRegistryStub implements SingleSignOnRegistry {

    result:boolean

    isValid(token: string): boolean {
        return this.result;
    }

    registerNewSession(userName: string, password: string): SSOToken | undefined {
        throw new Error('Dummy: not implemented');
    }

    unregister(token: string): void {
        throw new Error('Dummy: not implemented');
    }

    setValidResponse(): void {
        this.result = true
    }

    setInvalidResponse(): void {
        this.result = false
    }
}

