// ==================== INTERFACE DO USUÁRIO ====================

class UI {
  constructor(player) {
    this.player = player;
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    // Header
    this.goldDisplay = document.getElementById('gold-display');
    this.levelDisplay = document.getElementById('level-display');
    this.coinsDisplay = document.getElementById('coins-display');
    this.staminaDisplay = document.getElementById('stamina-display');
    this.staminaFill = document.getElementById('stamina-fill');
    
    // Character Panel
    this.charSprite = document.getElementById('char-sprite');
    this.charName = document.getElementById('char-name');
    this.expBar = document.getElementById('exp-bar');
    this.hpFill = document.getElementById('hp-fill');
    this.mpFill = document.getElementById('mp-fill');
    this.auraDisplay = document.getElementById('aura-display');
    this.equipmentGrid = document.getElementById('equipment-grid');
    
    // Battle
    this.battleArena = document.getElementById('battle-arena');
    this.playerBattleSprite = document.getElementById('player-battle-sprite');
    this.enemySprite = document.getElementById('enemy-sprite');
    this.enemyName = document.getElementById('enemy-name');
    this.playerHpBar = document.getElementById('player-hp-bar');
    this.enemyHpBar = document.getElementById('enemy-hp-bar');
    this.activityLog = document.getElementById('activity-log');
    
    // Inventory
    this.inventoryGrid = document.getElementById('inventory-grid');
    this.itemDetail = document.getElementById('item-detail');
    this.rarityCheckboxes = document.querySelectorAll('.rarity-check');
    
    // Tabs
    this.tabButtons = document.querySelectorAll('.tab-btn');
    this.tabContents = document.querySelectorAll('.tab-content');
  }

  setupEventListeners() {
    // Tab switching
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.currentTarget.dataset.tab));
    });
    
    // Auto-sell config
    this.rarityCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.updateAutoSellConfig());
    });
  }

  switchTab(tabName) {
    this.tabContents.forEach(content => content.classList.remove('active'));
    this.tabButtons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  }

  updateAutoSellConfig() {
    this.rarityCheckboxes.forEach(checkbox => {
      this.player.inventory.autoSellConfig[checkbox.dataset.rarity] = checkbox.checked;
    });
    this.player.save();
  }

  updateHeader() {
    this.goldDisplay.textContent = this.player.gold.toLocaleString();
    this.levelDisplay.textContent = this.player.level;
    this.coinsDisplay.textContent = this.player.coins;
    this.staminaDisplay.textContent = this.formatStamina(this.player.stamina);
    this.staminaFill.style.width = (this.player.stamina / this.player.maxStamina * 100) + '%';
  }

  updateCharacterPanel() {
    this.charSprite.textContent = PLAYER_SPRITES.cavaleiro;
    this.expBar.style.width = (this.player.experience / (this.player.level * 100) * 100) + '%';
    
    const hpPercent = (this.player.hp / this.player.maxHp) * 100;
    const mpPercent = (this.player.mp / this.player.maxMp) * 100;
    
    this.hpFill.style.width = hpPercent + '%';
    this.mpFill.style.width = mpPercent + '%';
    
    this.auraDisplay.textContent = this.player.currentAura.name + (this.player.currentAura.bonus ? ` (${this.player.currentAura.bonus})` : '');
    this.renderEquipment();
  }

  renderEquipment() {
    this.equipmentGrid.innerHTML = '';
    
    EQUIPMENT_SLOTS.forEach((slot, index) => {
      const equipped = this.player.equipment[slot.slot];
      const div = document.createElement('div');
      div.className = 'equipment-slot';
      div.textContent = equipped ? equipped.icon : slot.icon;
      div.title = equipped ? equipped.name : slot.name;
      
      this.equipmentGrid.appendChild(div);
    });
  }

  updateBattleDisplay(battle) {
    if (!battle) return;
    
    this.enemySprite.textContent = MONSTERS[battle.monster.id]?.sprite || '👾';
    this.enemyName.textContent = battle.monster.name;
    
    const playerHpPercent = (battle.playerHp / battle.playerMaxHp) * 100;
    const monsterHpPercent = (battle.monsterHp / battle.monsterMaxHp) * 100;
    
    this.playerHpBar.style.width = playerHpPercent + '%';
    this.enemyHpBar.style.width = Math.max(0, monsterHpPercent) + '%';
  }

  updateInventory() {
    this.inventoryGrid.innerHTML = '';
    
    this.player.inventory.items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `inventory-slot ${item.rarity}`;
      div.textContent = item.icon;
      div.title = `${item.name} (+${item.refine})`;
      div.addEventListener('click', () => this.showItemDetail(index));
      
      this.inventoryGrid.appendChild(div);
    });
  }

  showItemDetail(index) {
    const item = this.player.inventory.items[index];
    if (!item) return;
    
    let html = `
      <div style="color: ${item.rarity === 'ouro' ? '#ffd700' : 'white'}">
        <strong>${item.icon} ${item.name}</strong>
        <div style="font-size: 0.8rem; margin-top: 6px;">
          Raridade: ${RARITIES.find(r => r.id === item.rarity)?.name}
          <br>Valor: ${item.value} ouro
          <br>Refino: +${item.refine}/10
        </div>
      </div>
    `;
    this.itemDetail.innerHTML = html;
  }

  addActivityLog(message, type = '') {
    const div = document.createElement('div');
    div.className = type;
    div.textContent = message;
    this.activityLog.appendChild(div);
    this.activityLog.scrollTop = this.activityLog.scrollHeight;
  }

  formatStamina(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
}
