import { MonitorDot, Hourglass, CircleX } from 'lucide-react';
import useStore from '../store/useStore';

const ActiveOrders = () => {
  const { orders, elapsedSeconds, removeOrder } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <MonitorDot className="h-5 w-5" />
        <h2 className="text-lg font-medium">Active Orders</h2>
      </div>
      <div className="space-y-4">
        {orders.map((order) => {
          const remainingTask = order.tasks.find(task => task.endTime > elapsedSeconds);

          return (
            <div 
              key={order.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {order.type === 'sandwich' ? '🥪' : '🥔'}
                </span>
                <span className="text-lg font-medium">
                  {order.type === 'sandwich' ? 'Sandwich' : 'Jacket Potato'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg justify-center">
                {remainingTask ? (
                  <>
                    <Hourglass />
                    <span>{remainingTask.name}: {remainingTask.endTime - elapsedSeconds}s</span>
                  </>
                ) : (
                  <span className="text-green-500">Complete</span>
                )}
                <button className="text-red-500" onClick={() => removeOrder(order.id)}>
                  <CircleX />
                </button>
              </div>
            </div>
          );
        })}
        {orders.length === 0 && (
          <div className="text-lg text-gray-500 text-center py-8">
            No active orders
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveOrders;
