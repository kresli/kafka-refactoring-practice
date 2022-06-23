export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum ItemType {
  BACKSTAGE_PASSES = "Backstage passes",
  AGED_BRIE = "Aged Brie",
  SULFURAS = "Sulfuras",
  CONJURED = "Conjured",
}

export class GildedRose {
  static getItemType(item: Item) {
    return Object.entries(ItemType).find(([key, type]) =>
      item.name.startsWith(type)
    )?.[1];
  }

  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name === "Sulfuras, Hand of Ragnaros") continue;
      const type = GildedRose.getItemType(item);

      item.sellIn = item.sellIn - 1;

      if (
        item.name != "Aged Brie" &&
        item.name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (item.quality > 0) {
          item.quality -= 1;
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1;
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality += 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality += 1;
              }
            }
          }
        }
      }

      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (item.quality > 0) {
              item.quality -= 1;
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality += 1;
          }
        }
      }
    }

    return this.items;
  }
}
