import { UtensilsCrossed } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const PlaceOrder = () => {
  const { inventory, addOrder } = useStore();

  // Handle order placement and show toast messages
  const handleOrder = (type) => {
    const result = addOrder(type);
    if (result.includes("accepted")) {
      toast.success(result); // Show success toast if order is accepted
    } else {
      toast.error(result); // Show error toast if order is rejected or out of stock
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <UtensilsCrossed className="h-4 w-4" />
        <span className="text-sm font-medium">Place Order</span>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => handleOrder('sandwich')}
          className={`w-full p-3 rounded-md flex items-center justify-center 
            ${inventory.sandwiches === 0 ? 'bg-gray-300 text-gray-500' : 'bg-zinc-900 text-white'}`}
          disabled={inventory.sandwiches === 0}
        >
          Order Sandwich ({inventory.sandwiches} left)
        </button>

        <button
          onClick={() => handleOrder('jacket_potato')}
          className={`w-full p-3 rounded-md flex items-center justify-center 
            ${inventory.jacketPotatoes === 0 ? 'bg-gray-300 text-gray-500' : 'bg-gray-50 text-gray-900'}`}
          disabled={inventory.jacketPotatoes === 0}
        >
          Order Jacket Potato ({inventory.jacketPotatoes} left)
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
