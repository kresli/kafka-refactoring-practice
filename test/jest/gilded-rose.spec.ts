// https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/main/GildedRoseRequirements.txt
import { Item, GildedRose } from "@/gilded-rose";

test("sulfuras should never change ", () => {
  const name = "Sulfuras, Hand of Ragnaros";
  const shop = new GildedRose([new Item(name, 2, 10)]);
  expect(shop.updateQuality()).toEqual([{ name, sellIn: 2, quality: 10 }]);
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
