import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";

export class DbService {
    client = new Client();
    databases;
    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createPost({title, slug, content, featuredimage, status, userId}: {[key: string]: string}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredimage, status, userId
            })
        } catch (error) {
            console.log("appwrite :: dbService :: createPost :: Error :: ", error)
        }
    }

    async updatePost(slug:string,{title, content, featuredimage, status}: {[key: string]: string}) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId, slug, {
                title, content, featuredimage, status
            })
        } catch (error) {
            console.log("appwrite :: dbService :: updatePost :: Error :: ", error)
        }
    }

    async deletePost(slug:string) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("appwrite :: dbService :: deletePost :: Error :: ", error)
            return false
        }
    }

    async getPost(slug: string) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("appwrite :: dbService :: getPost :: Error :: ", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("appwrite :: dbService :: getPosts :: Error :: ", error)
        }
    }
}

const dbService = new DbService();
export default dbService