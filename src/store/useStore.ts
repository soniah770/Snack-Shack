import { create } from 'zustand';

// Define task types and order structure
interface Task {
  name: string;
  startTime: number;
  duration: number;
  endTime: number;
}

interface Order {
  id: string;
  type: 'sandwich' | 'jacket_potato';
  tasks: Task[];
  expirationTime: number;
  completed: boolean;
}

// Define Zustand store state and actions
interface SnackShackState {
  orders: Order[];
  inventory: { sandwiches: number; jacketPotatoes: number };
  microwaves: { total: number; inUse: number };
  elapsedSeconds: number;
  addOrder: (type: 'sandwich' | 'jacket_potato') => string;
  updateElapsedSeconds: () => void;
  removeOrder: (id: string) => void;
  updateMicrowaveUsage: (change: number) => void;
  clearExpiredOrders: () => void;
  getWaitTimeEstimate: (type: 'sandwich' | 'jacket_potato') => string;
}

const useSnackShackStore = create<SnackShackState>((set, get) => ({
  // Initial state
  orders: [],
  inventory: { sandwiches: 45, jacketPotatoes: 30 },
  microwaves: { total: 2, inUse: 0 },
  elapsedSeconds: 0,

  // Add an order and manage task sequencing
  addOrder: (type) => {
    const { elapsedSeconds, orders, inventory, microwaves } = get();

    // Check inventory and microwave availability
    if (type === 'sandwich' && inventory.sandwiches <= 0) return 'Out of sandwiches!';
    if (type === 'jacket_potato' && inventory.jacketPotatoes <= 0) return 'Out of jacket potatoes!';
    if (type === 'jacket_potato' && microwaves.inUse >= microwaves.total) return 'No microwaves available!';

    const prepTime = type === 'sandwich' ? 60 : 150; // 1 minute for sandwiches, 2.5 for potatoes
    const serveTime = prepTime + 30; // 30 seconds to serve
    const expirationTime = type === 'sandwich' ? 300 : 420; // 5 minutes for sandwiches, 7 for potatoes
    const startTime = orders.length > 0 ? orders[orders.length - 1].tasks.slice(-1)[0].endTime : elapsedSeconds;

    // Check if wait time exceeds limits
    const totalWaitTime = startTime + serveTime - elapsedSeconds;
    if ((type === 'sandwich' && totalWaitTime > 300) || (type === 'jacket_potato' && totalWaitTime > 420)) {
      return `Order rejected: Wait time exceeds limit for ${type}!`;
    }

    // Define tasks
    const tasks: Task[] = [
      { name: 'Prepare', startTime, duration: prepTime, endTime: startTime + prepTime },
      { name: 'Serve', startTime: startTime + prepTime + 30, duration: 30, endTime: startTime + serveTime },
    ];
    if (type === 'jacket_potato') tasks.unshift({ name: 'Microwave', startTime, duration: 150, endTime: startTime + 150 });

    // Update the store state
    set((state) => ({
      inventory: {
        ...state.inventory,
        [type === 'sandwich' ? 'sandwiches' : 'jacketPotatoes']: 
          state.inventory[type === 'sandwich' ? 'sandwiches' : 'jacketPotatoes'] - 1,
      },
      microwaves: type === 'jacket_potato' ? { ...state.microwaves, inUse: state.microwaves.inUse + 1 } : state.microwaves,
      orders: [
        ...state.orders,
        {
          id: `${type}-${orders.length + 1}`,
          type,
          tasks,
          expirationTime: startTime + expirationTime,
          completed: false,
        },
      ],
    }));

    return `Order for ${type} accepted! Estimated wait time: ${Math.floor(totalWaitTime / 60)}:${totalWaitTime % 60}`;
  },

  // Update elapsed time and manage task progress
  updateElapsedSeconds: () => set((state) => {
    const completedOrders = state.orders.map((order) => {
      const completedTasks = order.tasks.map((task) => {
        if (task.endTime <= state.elapsedSeconds) task.name = 'Done';
        return task;
      });
      const isCompleted = completedTasks.every(task => task.name === 'Done');
      if (isCompleted) order.completed = true;
      return order;
    });

    return {
      elapsedSeconds: state.elapsedSeconds + 1,
      orders: completedOrders,
    };
  }),

  // Remove a completed order
  removeOrder: (id) => set((state) => ({
    orders: state.orders.filter(order => order.id !== id),
  })),

  // Update microwave usage
  updateMicrowaveUsage: (change) => set((state) => ({
    microwaves: { ...state.microwaves, inUse: state.microwaves.inUse + change },
  })),

  // Clear expired orders
  clearExpiredOrders: () => set((state) => ({
    orders: state.orders.filter(order => order.expirationTime > state.elapsedSeconds),
  })),

  // Estimate wait time for new order
  getWaitTimeEstimate: (type) => {
    const { elapsedSeconds, orders } = get();
    const lastEndTime = orders.length > 0 ? orders[orders.length - 1].tasks.slice(-1)[0].endTime : elapsedSeconds;
    const prepTime = type === 'sandwich' ? 60 : 150;
    const serveTime = prepTime + 30;
    const totalWaitTime = lastEndTime + serveTime - elapsedSeconds;
    return `Estimated wait time: ${Math.floor(totalWaitTime / 60)}:${totalWaitTime % 60}`;
  },
}));

export default useSnackShackStore;
