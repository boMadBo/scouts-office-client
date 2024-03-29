export interface IConversation {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUserValues;
  interlocutor: IUserValues;
  messages: IMessage[]
}

export interface IUserValues {
  id: number | undefined;
  name: string | undefined;
}

export interface IMessage {
  id: number;
  conversationId: number;
  senderId: number;
  recieverId: number;
  text: string;
  isReaded: boolean;
  createdAt: Date;
  updatedAt: Date;
  senderName?: string;
  recieverName?: string;
}

export interface ICreateMessage {
  senderId: number | undefined;
  text: string;
  conversationId: number | undefined;
  recieverId: number | undefined;
}