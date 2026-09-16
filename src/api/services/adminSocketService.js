export const initAdminSocket = () => {
  return {
    on: () => {},
    off: () => {},
    emit: () => {},
    disconnect: () => {},
  };
};

export const getAdminSocket = () => initAdminSocket();
