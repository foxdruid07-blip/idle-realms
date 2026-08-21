// ==================== SISTEMA DO PERSONAGEM ====================

class Player {
  constructor() {
    this.level = 1;
    this.experience = 0;
    this.gold = 0;
    this.coins = 0;
    this.stamina = 480; // 8 horas
    this.maxStamina = 480;
    
    // Atributos
    this.hp = 100;
    this.maxHp = 100;
    this.mp = 100;
    this.maxMp = 100;
    
    // Equips
    this.equipment = {};
    EQUIPMENT_SLOTS.forEach(slot => {
      this.equipment[slot.slot] = null;
    });
    
    // Inventory
    this.inventory = new Inventory(40);
    
    // Stats
    this.baseStats = {
      damage: 10,
      defense: 5,
      critical: 0,
      accuracy: 85
    };
    
    this.refineTotal = 0;
    this.currentAura = AURAS[0];
    this.skillRotation = new SkillRotation();
  }

  addExperience(amount) {
    this.experience += amount;
    const expNeeded = this.level * 100;
    
    while (this.experience >= expNeeded) {
      this.experience -= expNeeded;
      this.levelUp();
    }
  }

  levelUp() {
    this.level++;
    const healthIncrease = 12;
    const manaIncrease = 3;
    
    this.maxHp += healthIncrease;
    this.hp = this.maxHp;
    this.maxMp += manaIncrease;
    this.mp = this.maxMp;
  }

  addGold(amount) {
    this.gold += amount;
  }

  spendGold(amount) {
    if (this.gold >= amount) {
      this.gold -= amount;
      return true;
    }
    return false;
  }

  addCoins(amount) {
    this.coins += amount;
  }

  reduceStamina(amount = 1) {
    this.stamina = Math.max(0, this.stamina - amount);
  }

  restoreStamina(amount = 60) {
    this.stamina = Math.min(this.maxStamina, this.stamina + amount);
  }

  hasStamina() {
    return this.stamina > 0;
  }

  equipItem(item, slot) {
    const oldItem = this.equipment[slot];
    this.equipment[slot] = item;
    
    if (oldItem) {
      this.inventory.addItem(oldItem);
    }
    
    return oldItem;
  }

  unequipItem(slot) {
    const item = this.equipment[slot];
    if (item && this.inventory.addItem(item)) {
      this.equipment[slot] = null;
      return true;
    }
    return false;
  }

  calculateStats() {
    let stats = { ...this.baseStats };
    
    // Bonus do equipamento
    Object.values(this.equipment).forEach(item => {
      if (item && item.attributes) {
        item.attributes.forEach(attr => {
          if (attr.name === 'Dano') stats.damage += attr.value;
          if (attr.name === 'Defesa') stats.defense += attr.value;
        });
      }
    });
    
    // Bonus da aura
    if (this.currentAura.bonus) {
      const danoMatch = this.currentAura.bonus.match(/(\d+)% Dano/);
      if (danoMatch) {
        stats.damage *= (1 + parseInt(danoMatch[1]) / 100);
      }
    }
    
    return stats;
  }

  updateAura() {
    this.currentAura = AURAS.filter(a => this.refineTotal >= a.min).pop() || AURAS[0];
  }

  save() {
    const data = {
      level: this.level,
      experience: this.experience,
      gold: this.gold,
      coins: this.coins,
      stamina: this.stamina,
      hp: this.hp,
      mp: this.mp,
      refineTotal: this.refineTotal,
      inventory: this.inventory.items,
      equipment: this.equipment,
      autoSellConfig: this.inventory.autoSellConfig
    };
    localStorage.setItem('idle-realms-player', JSON.stringify(data));
  }

  load() {
    const data = localStorage.getItem('idle-realms-player');
    if (data) {
      const saved = JSON.parse(data);
      Object.assign(this, saved);
      this.inventory.autoSellConfig = saved.autoSellConfig || this.inventory.autoSellConfig;
    }
  }
}
