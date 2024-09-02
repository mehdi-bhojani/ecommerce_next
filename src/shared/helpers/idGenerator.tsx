// utils/idGenerator.js
export const generateId = () => {
    // Example: Generate a simple unique ID using Date.now and Math.random
    return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  