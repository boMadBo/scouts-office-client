import { IUtcZone } from '@/containers/account/types';
import { useCallback, useState } from 'react';

interface IDragDropTimezones {
  currentZone: IUtcZone | null;
  dragStartHandler: (e: MouseEvent | TouchEvent | PointerEvent, city: IUtcZone) => void;
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler: (e: React.DragEvent<HTMLDivElement>, city: IUtcZone) => void;
}

const useDragDropTimezones = (
  initialZones: IUtcZone[],
  setMyZones: React.Dispatch<React.SetStateAction<IUtcZone[]>>
): IDragDropTimezones => {
  const [currentZone, setCurrentZone] = useState<IUtcZone | null>(null);

  const dragStartHandler = useCallback((e: MouseEvent | TouchEvent | PointerEvent, zone: IUtcZone) => {
    setCurrentZone(zone);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, zone: IUtcZone) => {
      e.preventDefault();
      const currentIndex = initialZones.findIndex((c: IUtcZone) => c.city === currentZone?.city);
      const targetIndex = initialZones.findIndex((t: IUtcZone) => t.city === zone.city);

      if (currentIndex !== -1 && targetIndex !== -1) {
        const newZonelist = [...initialZones];
        const movedZone = newZonelist[currentIndex];
        newZonelist.splice(currentIndex, 1);
        newZonelist.splice(targetIndex, 0, movedZone);
        newZonelist.forEach((zone, index) => {
          zone.order = index;
        });
        const zones = newZonelist.map(item => {
          return {
            id: item.id,
            order: item.order,
          };
        });
        setMyZones(newZonelist);
      }
    },
    [initialZones, currentZone, setMyZones]
  );

  return {
    currentZone,
    dragStartHandler,
    dragOverHandler,
    dropHandler,
  };
};

export default useDragDropTimezones;
