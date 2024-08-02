import connecttoDB from "./db"
import { Post, User } from "./models"

export const getUser = async (id: string) => {
    try {
        connecttoDB()
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log(error)
        throw new Error('error when fetch user')
    }
}

export const getUsers = async () => {
    try {
        connecttoDB()
        const users = await User.find()
        return users
    } catch (error) {
        console.log(error)
        throw new Error('error when fetch user')
    }
}

export const getPost = async (slug: string) => {
    try {
        connecttoDB()
        const post = await Post.findOne({ slug })
        return post
    } catch (error) {
        console.log(error)
        throw new Error('error when fetch post')
    }
}

export const getPosts = async () => {
    try {
        connecttoDB()
        const posts = await Post.find()
        return posts
    } catch (error) {
        console.log(error)
        throw new Error('error when fetch post')
    }
}