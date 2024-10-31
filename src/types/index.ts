// src/types/index.ts
export interface Order {
    id: string;
    type: 'sandwich' | 'jacket_potato';
    remainingTime: number;
    status: 'preparing' | 'cooking' | 'ready';
  }
  
  export interface Inventory {
    sandwiches: number;
    jacketPotatoes: number;
  }