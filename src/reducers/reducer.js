import {SELECTED_CHAT,ADD_SOCKET, LOGIN, LOGOUT, LIST_USER, LIST_CHATS, LIST_MESSAGE} from '../constant/constant';

const initialState = {
  user:undefined, 
  users:undefined,
  chat:undefined,
  chats:undefined,
  message:undefined,
  socket:undefined
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    
    case ADD_SOCKET:
        return {
          ...state,
          socket:action.socket
        }

    case LOGIN:
      return {
          ...state,
          user:action.user
        }
    
    case LOGOUT:
        console.log(state.user)
        return {
          ...state,
          user:undefined, 
          users:undefined,
          chat:undefined,
          chats:undefined,
          message:undefined
        }
    
    case LIST_USER:
        return {
          ...state,
          users:action.users
        }   
    
      case LIST_CHATS:
        return {
          ...state,
          chats:action.chats
        }     

      case SELECTED_CHAT:
          return {
              ...state,
              chat:action.chat
          }
         
      case LIST_MESSAGE:
          return {
              ...state,
              message:action.message
          }
    default:
      return state
  }
}

export default reducer;