
export const generateOrderNumber = (): string => {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${randomNumber}`;
  };
  