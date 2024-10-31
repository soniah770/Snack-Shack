import { ChefHat } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b w-full bg-white p-4 fixed">
      <div className="container mx-auto ">
      <div className="max-w-3xl mx-auto flex items-center gap-2">
          <ChefHat className="h-6 w-6" />
          <span className="text-2xl font-semibold">Snack Shack</span>
        </div>
      </div>
    </nav>
  );
}

