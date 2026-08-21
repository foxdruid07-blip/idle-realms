// ==================== SPRITES E IMAGENS ====================

const PLAYER_SPRITES = {
  cavaleiro: '🧔',
  mago: '🧙',
  arqueiro: '🏹',
  paladin: '⚔️'
};

const ENEMY_SPRITES = {
  rato: '🐭',
  aranha: '🕷️',
  lobo: '🐺',
  goblin: '👺',
  orc: '🪓',
  troll: '👹',
  esqueleto: '💀',
  cobra: '🐍'
};

function getMonsterSprite(monsterName) {
  const spriteMap = {
    'Rato': '🐭',
    'Aranha': '🕷️',
    'Lobo': '🐺',
    'Goblin': '👺',
    'Orc': '🪓',
    'Troll': '👹',
    'Esqueleto': '💀',
    'Cobra': '🐍'
  };
  return spriteMap[monsterName] || '👾';
}

function getEquipmentSprite(itemName) {
  const sprites = {
    'sword': '⚔️',
    'shield': '🛡️',
    'armor': '👕',
    'helmet': '⛑️',
    'boots': '👢',
    'ring': '💍',
    'amulet': '📿'
  };
  return sprites[itemName] || '📦';
}
