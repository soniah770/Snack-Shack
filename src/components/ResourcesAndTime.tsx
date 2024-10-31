import { Clock } from 'lucide-react';
import useStore from '../store/useStore';
import { useMemo } from 'react';

const ResourcesAndTime = () => {
  const { microwaves, elapsedSeconds } = useStore();

  // Memoize formatted elapsed time
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(elapsedSeconds / 60);
    const remainingSeconds = elapsedSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [elapsedSeconds]);

  // Destructure microwave properties for readability
  const { total, inUse } = microwaves;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5" />
        <h2 className="font-medium">Resources & Time</h2>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between">
            <span>Microwaves Available</span>
            <span>{total - inUse} of {total}</span>
          </div>
          <div className="mt-2">
            <div className="font-mono text-xl">{formattedTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesAndTime;
