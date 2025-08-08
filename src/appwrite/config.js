import conf from '../conf/conf.js';

import { Client, Account, ID,Databases, Storage,Query } from "appwrite";
export class Services{
    client =new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({titlle,slug,content,featuredImage,status,userid,demourl,githuburl,techstacks}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    titlle,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userid,
                    demourl,
                    githuburl,
                    techstacks
                }
            );
        } catch (error) {
            console.log("Error creating post:", error);
            throw error;
        }
    }
    async updatePost(slug,{titlle,content,featuredImage,status,demourl,githuburl,techstacks}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    titlle,
                    content,
                    featuredImage,
                    status,
                    demourl,
                    githuburl,
                    techstacks
                }
            )
        } catch (error) {
            console.log("Error updating post:", error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true; // Return true if deletion is successful
        } catch (error) {
            console.log("Error deleting post:", error);
            return false; // Return false if deletion fails 
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Error fetching post:", error);
            return false;
        }
    }
    async getAllPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Error fetching all posts:", error);
            return false
        }
    }
    async getMyPosts(userid) {
            
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userid", userid)
                ]
            )
        } catch (error) {
            console.log("Error fetching all posts:", error);
            return false
        }
    }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Error uploading file:", error);
            return false;

        }
    }  
    
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true; // Return true if deletion is successful
        } catch (error) {
            console.log("Error deleting file:", error);
            return false; // Return false if deletion fails 
        }
    }

    getFileView(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId,
        );
    }
}
const services = new Services();

export default services;