import { Item, GildedRose, ItemType } from "@/gilded-rose";

// full design tests
// https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/main/GildedRoseRequirements.txt

test("Once the sell by date has passed, Quality degrades twice as fast", () => {
  const store = new GildedRose([new Item("foo", 1, 9)]);
  expect(store.items).toEqual([{ name: "foo", sellIn: 1, quality: 9 }]);
  expect(store.updateQuality()).toEqual([
    { name: "foo", sellIn: 0, quality: 8 },
  ]);
  expect(store.updateQuality()).toEqual([
    { name: "foo", sellIn: -1, quality: 6 },
  ]);
});

test("The Quality of an item is never negative", () => {
  const store = new GildedRose([new Item("foo", 0, 0)]);
  expect(store.updateQuality()).toEqual([
    { name: "foo", sellIn: -1, quality: 0 },
  ]);
});

test(`"Aged Brie" actually increases in Quality the older it gets`, () => {
  const store = new GildedRose([new Item("Aged Brie", 3, 0)]);
  expect(store.updateQuality()).toEqual([
    { name: "Aged Brie", sellIn: 2, quality: 1 },
  ]);
});

test("The Quality of an item is never more than 50", () => {
  const store = new GildedRose([new Item("Aged Brie", 3, 50)]);
  expect(store.updateQuality()).toEqual([
    { name: "Aged Brie", sellIn: 2, quality: 50 },
  ]);
});

test(`"Sulfuras", being a legendary item, never has to be sold or decreases in Quality`, () => {
  const store = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 3, 2)]);
  expect(store.updateQuality()).toEqual([
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 3, quality: 2 },
  ]);
});

test(`"Backstage passes" increases in Quality as its SellIn value approaches`, () => {
  const store = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 12, 0),
  ]);
  expect(store.updateQuality()).toEqual([
    {
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: 11,
      quality: 1,
    },
  ]);
});
test(`"Backstage passes" Quality increases by 2 when there are 10 days or less`, () => {
  const store = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
  ]);
  expect(store.updateQuality()).toEqual([
    {
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: 9,
      quality: 2,
    },
  ]);
  expect(store.updateQuality()).toEqual([
    {
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: 8,
      quality: 4,
    },
  ]);
});
test(`"Backstage passes" Quality increases by 3 when there are 5 days or less`, () => {
  const store = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0),
  ]);
  expect(store.updateQuality()).toEqual([
    {
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: 4,
      quality: 3,
    },
  ]);
  expect(store.updateQuality()).toEqual([
    {
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: 3,
      quality: 6,
    },
  ]);
});
test(`"Backstage passes" quality drops to 0 after the concert`, () => {
  const store = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
  ]);
  expect(store.updateQuality()).toEqual([
    {
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: -1,
      quality: 0,
    },
  ]);
});

test(`"Conjured" items degrade in Quality twice as fast as normal items`, () => {
  const store = new GildedRose([new Item("Conjured", 2, 10)]);
  expect(store.updateQuality()).toEqual([
    {
      name: "Conjured",
      sellIn: 1,
      quality: 8,
    },
  ]);
});

// REST

test("sulfuras should never change ", () => {
  const name = "Sulfuras, Hand of Ragnaros";
  const shop = new GildedRose([new Item(name, 2, 10)]);
  expect(shop.updateQuality()).toEqual([{ name, sellIn: 2, quality: 10 }]);
});

test("getItemType", () => {
  const makeItemType = (name: string) =>
    GildedRose.getItemType(new Item(name, 2, 10));
  expect(makeItemType("Backstage passes - foo")).toBe(
    ItemType.BACKSTAGE_PASSES
  );
  expect(makeItemType("Aged Brie  - foo")).toBe(ItemType.AGED_BRIE);
  expect(makeItemType("Sulfuras - foo")).toBe(ItemType.SULFURAS);
  expect(makeItemType("Conjured - foo")).toBe(ItemType.CONJURED);
});

test("item quality never drops bellow 0", () => {
  const createStoreItem = (name: string, quality: number) =>
    new GildedRose([new Item(name, 2, quality)]).updateQuality()[0];

  expect(createStoreItem("Backstage passes", 1).quality).toEqual(4);
  expect(createStoreItem("Aged Brie", 1).quality).toEqual(2);
  expect(createStoreItem("Sulfuras", 1).quality).toEqual(1);

  expect(createStoreItem("Backstage passes", 0).quality).toEqual(3);
  expect(createStoreItem("Aged Brie", 0).quality).toEqual(1);
  expect(createStoreItem("Sulfuras", 0).quality).toEqual(0);
  expect(createStoreItem("Conjured", 0).quality).toEqual(0);
});

test("max item quality is 50", () => {
  const createStoreItem = (name: string, quality: number) =>
    new GildedRose([new Item(name, 2, quality)]).updateQuality()[0];

  expect(createStoreItem("Backstage passes", 55).quality).toEqual(50);
  expect(createStoreItem("Aged Brie", 55).quality).toEqual(50);
  // expect(createStoreItem("Sulfuras", 55).quality).toEqual(50);
  expect(createStoreItem("Conjured", 55).quality).toEqual(50);
});

test("min item quality is 0", () => {
  const createStoreItem = (name: string, quality: number) =>
    new GildedRose([new Item(name, 2, quality)]).updateQuality()[0];
  expect(createStoreItem("Backstage passes", -10).quality).toEqual(0);
  expect(createStoreItem("Aged Brie", -10).quality).toEqual(0);
  // expect(createStoreItem("Sulfuras", -10).quality).toEqual(0);
  expect(createStoreItem("Conjured", -10).quality).toEqual(0);
});
