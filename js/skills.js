// ==================== SISTEMA DE SKILLS ====================

class Skill {
  constructor(skillData) {
    this.id = skillData.id;
    this.name = skillData.name;
    this.icon = skillData.icon;
    this.type = skillData.type;
    this.manaCost = skillData.manaCost;
    this.cooldown = skillData.cooldown;
    this.maxCooldown = skillData.cooldown;
    this.level = skillData.level;
    this.damageMultiplier = skillData.damageMultiplier || 1;
    this.healAmount = skillData.healAmount || 0;
    this.defenseBonus = skillData.defenseBonus || 0;
    this.currentCooldown = 0;
  }

  canUse() {
    return this.currentCooldown === 0;
  }

  use() {
    if (this.canUse()) {
      this.currentCooldown = this.maxCooldown;
      return true;
    }
    return false;
  }

  updateCooldown() {
    if (this.currentCooldown > 0) {
      this.currentCooldown--;
    }
  }
}

class SkillRotation {
  constructor() {
    this.slots = [null, null, null];
    this.currentSlot = 0;
  }

  setSkill(slot, skill) {
    if (slot >= 0 && slot < 3) {
      this.slots[slot] = skill;
    }
  }

  getNextSkill() {
    const skill = this.slots[this.currentSlot];
    this.currentSlot = (this.currentSlot + 1) % 3;
    return skill;
  }

  getAllSkills() {
    return this.slots.filter(s => s !== null);
  }
}
