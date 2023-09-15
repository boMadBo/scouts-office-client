type User = {
  userId: string;
  socketId: string;
};

export let users: User[] = [];

export const addUser = (userId: string, socketId: string): void => {
  !users.some(user => user.userId === userId) && users.push({ userId, socketId });
};

export const getUser = (userId: string) => {
  return users.find(user => user.userId === userId);
};

export const removeUser = (socketId: string) => {
  users = users.filter(user => user.socketId !== socketId);
};
