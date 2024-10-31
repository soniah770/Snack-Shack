import { Package } from 'lucide-react';
import useStore from '../store/useStore';

const InventoryLevels = () => {
  const { inventory } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Package className="h-5 w-5" />
        <h2 className="text-lg font-medium">Inventory Levels</h2>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-lg mb-3">
            <span>Sandwiches</span>
            <span>{inventory.sandwiches} of 45</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 bg-zinc-900 rounded-full transition-all duration-300"
              style={{width: `${(inventory.sandwiches / 45) * 100}%`}}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-lg mb-3">
            <span>Jacket Potatoes</span>
            <span>{inventory.jacketPotatoes} of 30</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 bg-zinc-900 rounded-full transition-all duration-300"
              style={{width: `${(inventory.jacketPotatoes / 30) * 100}%`}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryLevels;
