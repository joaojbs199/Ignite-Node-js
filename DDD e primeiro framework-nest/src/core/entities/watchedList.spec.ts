import { WatchedList } from './watchedList';

class NumberWathedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe('Watched list', () => {
  it('Should be able to create a watched list with initial items', () => {
    const list = new NumberWathedList([1, 2, 3]);

    expect(list.currentItems).toHaveLength(3);
  });

  it('Should be able to add new items to list', () => {
    const list = new NumberWathedList([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it('Should be able to remove items from list', () => {
    const list = new NumberWathedList([1, 2, 3]);

    list.remove(2);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([2]);
  });

  it('Should be able to add an item even if it was remove before', () => {
    const list = new NumberWathedList([1, 2, 3]);

    list.remove(2);
    list.add(2);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it('Should be able to remove an item even if it was added before', () => {
    const list = new NumberWathedList([1, 2, 3]);

    list.add(4);
    list.remove(4);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it('Should be able to update watched list items', () => {
    const list = new NumberWathedList([1, 2, 3]);

    list.update([1, 3, 5]);

    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.getNewItems()).toEqual([5]);
  });
});
