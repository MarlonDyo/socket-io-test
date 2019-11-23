import socketIOClient from "socket.io-client";

export class DashboardSocketHandler {
  constructor(serverUrl, userType, onUpdate) {
    this.serverUrl = serverUrl
    this.userType = userType
    this.socket = socketIOClient(serverUrl)
    this.socket.on('connect', () => {
      this.setUserType('dashboard')
    });
    this.socket.on("UpdateUserListing", onUpdate );
  }

  setUserType(userType) {
    if (this.socket.id === undefined) return
    this.socket.emit('setUserType', userType)
  }

  sendMsg(target, msg) {
    if (this.socket.id === undefined) return
    console.log('target',target)
    console.log('msg',msg)
    this.socket.emit('msg', { target, msg })
    
  }

}