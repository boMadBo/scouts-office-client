import { City } from '@/interfaces';
import { useCallback, useState } from 'react';

interface DragDropHook {
  currentCity: City | null;
  dragStartHandler: (e: MouseEvent | TouchEvent | PointerEvent, city: City) => void;
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler: (e: React.DragEvent<HTMLDivElement>, city: City) => void;
}

const useDragDrop = (initialCities: City[], setMyCities: React.Dispatch<React.SetStateAction<City[]>>): DragDropHook => {
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  const dragStartHandler = useCallback((e: MouseEvent | TouchEvent | PointerEvent, city: City) => {
    setCurrentCity(city);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, city: City) => {
      e.preventDefault();
      const currentIndex = initialCities.findIndex((c: City) => c.city === currentCity?.city);
      const targetIndex = initialCities.findIndex((c: City) => c.city === city.city);

      if (currentIndex !== -1 && targetIndex !== -1) {
        const newCitylist = [...initialCities];
        const movedCity = newCitylist[currentIndex];
        newCitylist.splice(currentIndex, 1);
        newCitylist.splice(targetIndex, 0, movedCity);
        newCitylist.forEach((c, index) => {
          c.order = index;
        });

        setMyCities(newCitylist);
      }
    },
    [initialCities, currentCity, setMyCities],
  );

  return {
    currentCity,
    dragStartHandler,
    dragOverHandler,
    dropHandler,
  };
};

export default useDragDrop;
