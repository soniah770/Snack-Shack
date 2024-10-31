import { useEffect } from 'react';
import useSnackShackStore from './store/useStore';
import PlaceOrder from './components/PlaceOrder';
import ResourcesAndTime from './components/ResourcesAndTime';
import ActiveOrders from './components/ActiveOrders';
import InventoryLevels from './components/InventoryLevels';
import { Toaster } from 'react-hot-toast';

function App() {
  const { elapsedSeconds, updateElapsedSeconds, orders, removeOrder, updateMicrowaveUsage, clearExpiredOrders } = useSnackShackStore();

  useEffect(() => {
    const interval = setInterval(() => {
      updateElapsedSeconds();
      orders.forEach(order => {
        if (order.tasks.every(task => task.name === 'Done')) {
          removeOrder(order.id);
          if (order.type === 'jacket_potato') updateMicrowaveUsage(-1); // Free up microwave
        }
      });
      clearExpiredOrders();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateElapsedSeconds, orders, removeOrder, updateMicrowaveUsage, clearExpiredOrders]);

  return (
    <div className="min-h-screen bg-gray-50">
            <Toaster /> 
      <nav className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <span className="text-xl font-semibold">Snack Shack</span>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto p-4 space-y-4">
        <PlaceOrder />
        <ResourcesAndTime />
        <ActiveOrders />
        <InventoryLevels />
      </main>
    </div>
  );
}

export default App;
