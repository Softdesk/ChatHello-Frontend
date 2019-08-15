import {SELECTED_CHAT,ADD_SOCKET, LOGIN, LOGOUT,LIST_USER, LIST_CHATS, LIST_MESSAGE} from '../constant/constant';

export const addSocket = (socket) => ({
	type: ADD_SOCKET,
	socket: socket
})

export const login_user = (user) => ({
	type: LOGIN,
	user: user
})

export const logout_user = (user) => ({
	type: LOGOUT,
	user:user
})

export const list_user = (users) => ({
	type: LIST_USER,
	users:users
})

export const list_chat = (chats) => ({
	type: LIST_CHATS,
	chats:chats
})

export const selected_chat = (chat) => ({
	type: SELECTED_CHAT,
	chat: chat
})

export const chat_message = (data) => ({
	type: LIST_MESSAGE,
	message: data
})

