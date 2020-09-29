export class User {
    constructor(user: string, pwd: string, token: string) {
        this.user = user
        this.pwd = pwd
        this.token = token
    }
    user: string
    pwd: string
    token: string
}