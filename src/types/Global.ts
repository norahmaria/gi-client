import type { Dispatch, SetStateAction } from 'react'
import type User from '../types/User'
import type Post from '../types/Post'
import type Chat from '../types/Chat'

type Global = {
  user?: User | null,
  setUser: Dispatch<SetStateAction<User | null>>
  posts: Post[] | [],
  setPosts: Dispatch<SetStateAction<Post[] | []>>,
  chats: Chat[] | [],
  setChats: Dispatch<SetStateAction<Chat[] | []>>,
  openChats: Chat[] | [],
  setOpenChats: Dispatch<SetStateAction<Chat[] | []>>,
  addChat: (_id: string, openChat: (_id: string) => void) => void,
  openChat: (_id: string) => void,
  closeChat: (_id: string) => void,
  addPost: (post: Post) => void,
  deletePost: (id: string) => void,
  updatePost: (post: Post) => void
}

export default Global