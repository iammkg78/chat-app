
import {io}  from "socket.io-client"

let socket;

export const socketprovide = (userid)=>{

     socket = io("http://localhost:5500",{auth :{userid},withCredentials:true})

    return socket

}

export const getSocket = () => {
   
  return socket;
}