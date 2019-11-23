import socketIOClient from "socket.io-client";

export class ClientSocketHandler {
  constructor(serverUrl, userType, onServerMsg) {
    this.serverUrl = serverUrl
    this.userType = userType
    this.socket = socketIOClient(serverUrl)
    this.socket.on('connect', () => { this.setUserType('client') });
    this.onServerMsg = onServerMsg ? onServerMsg : ()=>{}
    this.socket.on('serverMsg', this.onServerMsg)
  }

  setUserType(userType) {
    if (this.socket.id === undefined) return
    this.socket.emit('setUserType', userType)
  }

}

