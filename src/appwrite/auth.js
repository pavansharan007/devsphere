import conf from '../conf/conf.js';

import { Client, Account, ID } from "appwrite";

export class Authservice{
    client=new Client()
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount(email,password,name){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password,name);
            if (userAccount) {
                //addd methods like login or any other method
                return this.login(email, password);
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }
    async login(email, password) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }
    async logout() {
        try {
            await this.account.deleteSessions();
        
        } catch (error) {
            console.log("Error logging out:", error);
            return false;
        }
    }
}
const authService = new Authservice();
export default authService;
