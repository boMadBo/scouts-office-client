export interface IConversation {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IConversationName {
  _id: string;
  members: string[];
  sender: {
    id: string | undefined;
    senderName: string | undefined;
  };
  receiver: {
    id: string | undefined;
    receiverName: string | undefined;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMessages {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string;
  isReaded: boolean;
  updatedAt: string;
  receiver?: string;
  __v: number;
}

export interface IMessageName {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  isReaded: boolean;
  createdAt: string;
  updatedAt: string;
  receiver?: string;
  __v: number;
  senderName: string | undefined;
}

export interface IMessage {
  _id?: string | undefined;
  sender: string | undefined;
  text: string | undefined;
  conversationId: string | undefined;
  createdAt?: string | undefined;
  senderName?: string | undefined;
  receiver?: string | undefined;
  isReaded?: boolean;
}