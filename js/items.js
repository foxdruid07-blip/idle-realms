// ==================== SISTEMA DE ITEMS ====================

class Item {
  constructor(name, type, icon, value, rarity) {
    this.name = name;
    this.type = type;
    this.icon = icon;
    this.value = value;
    this.rarity = rarity;
    this.refine = 0;
    this.attributes = this.generateAttributes();
  }

  generateAttributes() {
    const rarityData = RARITIES.find(r => r.id === this.rarity);
    const attributes = [];
    
    for (let i = 0; i < rarityData.stats; i++) {
      const attrName = ATTRIBUTES[Math.floor(Math.random() * ATTRIBUTES.length)];
      const attrValue = Math.floor(Math.random() * 15) + 3;
      attributes.push({ name: attrName, value: attrValue });
    }
    
    return attributes;
  }

  refineItem(gold) {
    const refineCost = Math.floor(50 * Math.pow(1.5, this.refine));
    if (gold >= refineCost && this.refine < 10) {
      this.refine++;
      return { success: true, cost: refineCost };
    }
    return { success: false, cost: refineCost };
  }
}

class Inventory {
  constructor(maxSlots = 40) {
    this.items = [];
    this.maxSlots = maxSlots;
    this.autoSellConfig = {
      'comum': true,
      'incomum': false,
      'raro': false,
      'epico': false,
      'lendario': false,
      'mitico': false,
      'divino': false,
      'ultra': false
    };
  }

  addItem(item) {
    if (this.items.length < this.maxSlots) {
      this.items.push(item);
      return true;
    }
    return false;
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      return this.items.splice(index, 1)[0];
    }
    return null;
  }

  shouldAutoSell(item) {
    return this.autoSellConfig[item.rarity];
  }

  getTotalValue() {
    return this.items.reduce((sum, item) => sum + item.value, 0);
  }

  clear() {
    this.items = [];
  }
}
