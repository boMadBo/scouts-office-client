import { ICity } from '@/types/account';
import { useCallback, useState } from 'react';

interface IDragDropTimezones {
  currentCity: ICity | null;
  dragStartHandler: (e: MouseEvent | TouchEvent | PointerEvent, city: ICity) => void;
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler: (e: React.DragEvent<HTMLDivElement>, city: ICity) => void;
}

const useDragDropTimezones = (
  initialCities: ICity[],
  setMyCities: React.Dispatch<React.SetStateAction<ICity[]>>
): IDragDropTimezones => {
  const [currentCity, setCurrentCity] = useState<ICity | null>(null);

  const dragStartHandler = useCallback((e: MouseEvent | TouchEvent | PointerEvent, city: ICity) => {
    setCurrentCity(city);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, city: ICity) => {
      e.preventDefault();
      const currentIndex = initialCities.findIndex((c: ICity) => c.city === currentCity?.city);
      const targetIndex = initialCities.findIndex((c: ICity) => c.city === city.city);

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
    [initialCities, currentCity, setMyCities]
  );

  return {
    currentCity,
    dragStartHandler,
    dragOverHandler,
    dropHandler,
  };
};

export default useDragDropTimezones;
