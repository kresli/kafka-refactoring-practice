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
      const type = GildedRose.getItemType(item);

      switch (type) {
        case ItemType.SULFURAS: {
          break;
        }
        case ItemType.AGED_BRIE:
          item.quality += 1;
          item.sellIn -= 1;
          break;
        case ItemType.BACKSTAGE_PASSES: {
          const { sellIn } = item;
          item.quality +=
            sellIn > 10 ? 1 : sellIn > 5 ? 2 : sellIn > 0 ? 3 : -item.quality;
          item.sellIn -= 1;
          break;
        }
        case ItemType.CONJURED: {
          break;
        }
        default: {
          item.sellIn -= 1;
          item.quality -= item.sellIn >= 0 ? 1 : 2;
        }
      }
      item.quality = item.quality >= 50 ? 50 : item.quality;
      item.quality = item.quality <= 0 ? 0 : item.quality;
    }

    return this.items;
  }
}
