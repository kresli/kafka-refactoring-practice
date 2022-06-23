// https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/main/GildedRoseRequirements.txt
import { Item, GildedRose, ItemType } from "@/gilded-rose";

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
  expect(createStoreItem("Conjured", 1).quality).toEqual(0);

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

// "Once the sell by date has passed, Quality degrades twice as fast"

// The Quality of an item is never negative

// "Aged Brie" actually increases in Quality the older it gets

// The Quality of an item is never more than 50

// "Sulfuras", being a legendary item, never has to be sold or decreases in Quality

// "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the concert

// "Conjured" items degrade in Quality twice as fast as normal items
