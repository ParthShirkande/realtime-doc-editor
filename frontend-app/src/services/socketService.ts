// frontend/src/services/socketService.ts

import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:3000'); // Connect to your WebSocket server
  }

  // Join a room
  joinRoom(room: string) {
    this.socket.emit('join_room', room);
  }

  // Send a message
  sendMessage(room: string, message: string) {
    this.socket.emit('send_message', { room, message });
  }

  // Listen for incoming messages
  listenForMessages(callback: (data: any) => void) {
    this.socket.on('received_message', callback);
  }

  // Listen for document content updates
  listenForDocumentUpdates(callback: (content: any) => void) {
    this.socket.on('document-content-update', callback);
  }

  // Disconnect from the server
  disconnect() {
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();
