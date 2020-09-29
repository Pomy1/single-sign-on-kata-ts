import SSOToken from '../../src/sso/SSOToken';
import SingleSignOnRegistry from '../../src/sso/SingleSignOnRegistry';
import {User} from './UserMemory';


export class SingleSignOnRegistryFake implements SingleSignOnRegistry {

    result:boolean

    users = [
        new User("Pepe", "pwdPepe", "abcdPepe"),
        new User("Pedro", "pwdPedro", "abcdPedro"),
        new User("Pepe", "pwdPepe", "abcdPepe"),
        new User("Luis", "pwdLuis", "abcdLuis")
    ]

    unregisterEvents:Array<String> = []

    isValid(token: string): boolean {
        const foundUser = this.users.find(user => token === user.token)
        return foundUser !== undefined;
    }

    registerNewSession(userName: string, password: string): SSOToken | undefined {
        const foundUser = this.users.find(user => userName === user.user && password === user.pwd)
        if(foundUser)return new SSOToken(foundUser.token)
        return undefined
    }

    unregister(token: string): void {
        this.unregisterEvents.push(token);
    }

    checkUnregister(token: string): boolean {
        const foundToken = this.unregisterEvents.find(unregisteredToken => token === unregisteredToken)
        return foundToken !== undefined
    }
}

