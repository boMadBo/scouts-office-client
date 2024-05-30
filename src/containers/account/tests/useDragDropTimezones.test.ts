import useDragDropTimezones from '@/containers/account/useDragDropTimezones';
import { act, renderHook } from '@testing-library/react-hooks';

const mockZones = [
  { id: 1, city: 'New York', order: 0, isActive: true },
  { id: 2, city: 'London', order: 1, isActive: false },
  { id: 3, city: 'Tokyo', order: 2, isActive: true },
];

const setMyZonesMock = jest.fn();

describe('useDragDropTimezones', () => {
  beforeEach(() => {
    setMyZonesMock.mockClear();
  });

  it('should set current zone on drag start', () => {
    const { result } = renderHook(() => useDragDropTimezones(mockZones, setMyZonesMock));

    const mockEvent = new MouseEvent('dragstart');

    act(() => {
      result.current.dragStartHandler(mockEvent, mockZones[0]);
    });

    expect(result.current.currentZone).toEqual(mockZones[0]);
  });

  it('should handle drag over', () => {
    const { result } = renderHook(() => useDragDropTimezones(mockZones, setMyZonesMock));

    const event = {
      preventDefault: jest.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.dragOverHandler(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should handle drop and reorder zones', () => {
    const { result } = renderHook(() => useDragDropTimezones(mockZones, setMyZonesMock));

    const mockEvent = new MouseEvent('dragstart');

    act(() => {
      result.current.dragStartHandler(mockEvent, mockZones[0]);
    });

    const dropEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.dropHandler(dropEvent, mockZones[1]);
    });

    const expectedZones = [
      { id: 2, city: 'London', order: 0, isActive: false },
      { id: 1, city: 'New York', order: 1, isActive: true },
      { id: 3, city: 'Tokyo', order: 2, isActive: true },
    ];

    expect(setMyZonesMock).toHaveBeenCalledWith(expectedZones);
  });

  it('should not reorder zones if indices are invalid', () => {
    const { result } = renderHook(() => useDragDropTimezones(mockZones, setMyZonesMock));

    const mockEvent = new MouseEvent('dragstart');

    act(() => {
      result.current.dragStartHandler(mockEvent, { id: 4, city: 'Invalid', order: 3, isActive: true });
    });

    const dropEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.dropHandler(dropEvent, mockZones[1]);
    });

    expect(setMyZonesMock).not.toHaveBeenCalled();
  });
});
