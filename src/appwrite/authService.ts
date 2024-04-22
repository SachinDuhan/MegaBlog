import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.ts";

export class AuthService {
    client = new Client()
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({name, email, password}: {[key: string]: string}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.appLogin({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("appwrite :: authService :: createAcco:unt : Error :: ", error);
        }
    }

    async appLogin({email, password}: {[key:string]:string}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("appwrite :: authService :: appLogin :: Error :: ", error);
            
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrite :: authService :: getCurrent:User : Error :: ", error);
        }

        return null
    }

    async appLogout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite :: authService :: appLogout :: Error :: ", error);
        }
    }
}

const authService = new AuthService();

export default authService;