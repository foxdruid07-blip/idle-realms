// ==================== SISTEMA DE BATALHA ====================

class Battle {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.playerHp = player.hp;
    this.monsterHp = monster.hp;
    this.playerMaxHp = player.maxHp;
    this.monsterMaxHp = monster.hp;
    this.round = 0;
    this.isActive = false;
    this.log = [];
  }

  start() {
    this.isActive = true;
    this.round = 0;
    this.playerHp = this.playerMaxHp;
    this.monsterHp = this.monsterMaxHp;
    this.log = [];
    this.addLog(`🔍 ${this.monster.name} apareceu!`, 'highlight');
  }

  update() {
    if (!this.isActive) return false;

    const playerStats = this.player.calculateStats();
    
    // Regeneração do jogador
    const hpRegenPerSecond = this.playerMaxHp * 0.008;
    this.playerHp = Math.min(this.playerMaxHp, this.playerHp + hpRegenPerSecond);
    
    // Auto-heal do jogador
    if (this.playerHp < this.playerMaxHp * 0.4) {
      this.playerHp = Math.min(this.playerMaxHp, this.playerHp + this.playerMaxHp * 0.35);
      this.addLog('❤️ Poção de Vida usada!', 'heal');
    }
    
    // Ataque do jogador
    const playerDamage = Math.floor(playerStats.damage * (0.85 + Math.random() * 0.3));
    this.monsterHp -= playerDamage;
    this.addLog(`⚔️ Causou ${playerDamage} de dano!`, 'damage');
    
    if (this.monsterHp <= 0) {
      this.endBattle(true);
      return true;
    }
    
    // Ataque do monstro
    const monsterDamage = Math.max(1, Math.floor(this.monster.damage * (0.85 + Math.random() * 0.3) - playerStats.defense * 0.2));
    this.playerHp -= monsterDamage;
    this.addLog(`💔 Sofreu ${monsterDamage} de dano!`, 'damage');
    
    if (this.playerHp <= 0) {
      this.endBattle(false);
      return false;
    }
    
    return true;
  }

  endBattle(playerWon) {
    this.isActive = false;
    
    if (playerWon) {
      const expGain = this.monster.exp;
      const goldGain = this.monster.gold;
      
      this.player.addExperience(expGain);
      this.player.addGold(goldGain);
      
      this.addLog(`💀 ${this.monster.name} derrotado!`, 'highlight');
      this.addLog(`⭐ +${expGain} XP`, 'xp');
      this.addLog(`💰 +${goldGain} Ouro`, 'gold');
      
      // Loot
      if (Math.random() < 0.65) {
        const rarity = this.getRandomRarity();
        const drop = new Item(
          this.monster.drops[0].name,
          this.monster.drops[0].type,
          this.monster.drops[0].icon,
          this.monster.drops[0].value,
          rarity.id
        );
        
        if (this.player.inventory.shouldAutoSell(drop)) {
          this.player.addGold(drop.value);
          this.addLog(`💰 ${drop.name} vendido por ${drop.value} ouro!`, 'gold');
        } else {
          if (this.player.inventory.addItem(drop)) {
            this.addLog(`🎒 Drop: ${drop.name} (${rarity.name})`, 'highlight');
          } else {
            this.addLog(`⚠️ Inventário cheio!`, 'damage');
          }
        }
      }
    } else {
      this.playerHp = this.playerMaxHp * 0.3;
      this.addLog('☠️ Derrotado! Vida restaurada parcialmente.', 'damage');
    }
  }

  getRandomRarity() {
    const rand = Math.random();
    const chances = [0.15, 0.27, 0.38, 0.48, 0.56, 0.62, 0.66, 1];
    
    for (let i = 0; i < chances.length; i++) {
      if (rand < chances[i]) {
        return RARITIES[i];
      }
    }
    return RARITIES[0];
  }

  addLog(message, type = '') {
    this.log.push({ message, type, timestamp: Date.now() });
    if (this.log.length > 100) {
      this.log.shift();
    }
  }
}
