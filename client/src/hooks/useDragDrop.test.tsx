import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import useDragDrop from './useDragDropTimezones';
import { ICity } from '@/types/account';

interface Props {
  cities: ICity[];
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>;
}

const MockComponent = ({ cities, setCities }: Props) => {
  const { currentCity, dragStartHandler, dragOverHandler, dropHandler } = useDragDrop(cities, setCities);

  return (
    <div>
      <div
        data-testid="drop-target"
        onDragOver={dragOverHandler}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, { city: 'London', gmt: 1, order: 0 })}
      >
        Drop Target
      </div>
      <div
        data-testid="drag-source"
        draggable={true}
        onDragStart={(e: any) => dragStartHandler(e, { city: 'Madrid', gmt: 2, order: 1 })}
      >
        Drag Source
      </div>
      <div data-testid="current-city">{currentCity ? currentCity.city : 'No city'}</div>
    </div>
  );
};
describe('DragDrop', () => {
  test('it should handle drag and drop', () => {
    const cities = [
      { city: 'ICity 1', order: 0, gmt: 2 },
      { city: 'ICity 2', order: 1, gmt: 1 },
    ];
    const setCities = jest.fn();
    const { getByTestId } = render(<MockComponent cities={cities} setCities={setCities} />);

    const dragSource = getByTestId('drag-source');
    const dropTarget = getByTestId('drop-target');

    fireEvent.dragStart(dragSource);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);

    expect(setCities).toHaveBeenCalledTimes(0);
  });
});
