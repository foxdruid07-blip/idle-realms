// ==================== SPRITES E IMAGENS TIBIA ====================

// URLs REAIS DO TIBIA WIKI
const TIBIA_SPRITES = {
  // PLAYER OUTFITS
  knight: 'https://tibiawiki.dev/img/outfits/male/knight.gif',
  paladin: 'https://tibiawiki.dev/img/outfits/male/paladin.gif',
  sorcerer: 'https://tibiawiki.dev/img/outfits/male/sorcerer.gif',
  druid: 'https://tibiawiki.dev/img/outfits/male/druid.gif',
  warrior: 'https://tibiawiki.dev/img/outfits/male/warrior.gif',
  hunter: 'https://tibiawiki.dev/img/outfits/male/hunter.gif',
  
  // CREATURES/MONSTROS
  rat: 'https://tibiawiki.dev/img/creatures/rat.gif',
  spider: 'https://tibiawiki.dev/img/creatures/spider.gif',
  wolf: 'https://tibiawiki.dev/img/creatures/wolf.gif',
  goblin: 'https://tibiawiki.dev/img/creatures/goblin.gif',
  orc: 'https://tibiawiki.dev/img/creatures/orc.gif',
  troll: 'https://tibiawiki.dev/img/creatures/troll.gif',
  skeleton: 'https://tibiawiki.dev/img/creatures/skeleton.gif',
  snake: 'https://tibiawiki.dev/img/creatures/snake.gif',
  demon: 'https://tibiawiki.dev/img/creatures/demon.gif',
  dragon: 'https://tibiawiki.dev/img/creatures/dragon.gif'
};

// MAP SPRITES TIBIA
const HUNT_LOCATIONS = {
  forest: {
    name: '🌲 Rookgaard Forest',
    sprite: 'forest',
    color: '#2a5a2a'
  },
  cave: {
    name: '⛰️ Dark Cave',
    sprite: 'cave',
    color: '#3a3a3a'
  },
  castle: {
    name: '🏰 Ancient Castle',
    sprite: 'castle',
    color: '#4a4a4a'
  }
};

// MAPEAMENTO DE SPRITES PARA MONSTROS
function getMonsterSprite(monsterName) {
  const spriteMap = {
    'Rat': TIBIA_SPRITES.rat,
    'Spider': TIBIA_SPRITES.spider,
    'Wolf': TIBIA_SPRITES.wolf,
    'Goblin': TIBIA_SPRITES.goblin,
    'Orc': TIBIA_SPRITES.orc,
    'Troll': TIBIA_SPRITES.troll,
    'Skeleton': TIBIA_SPRITES.skeleton,
    'Snake': TIBIA_SPRITES.snake,
    'Demon': TIBIA_SPRITES.demon,
    'Dragon': TIBIA_SPRITES.dragon
  };
  return spriteMap[monsterName] || TIBIA_SPRITES.rat;
}

// PLAYER SPRITE SELECTOR
function getPlayerSprite(class_name) {
  const classSprite = {
    'knight': TIBIA_SPRITES.knight,
    'paladin': TIBIA_SPRITES.paladin,
    'sorcerer': TIBIA_SPRITES.sorcerer,
    'druid': TIBIA_SPRITES.druid,
    'warrior': TIBIA_SPRITES.warrior,
    'hunter': TIBIA_SPRITES.hunter
  };
  return classSprite[class_name.toLowerCase()] || TIBIA_SPRITES.knight;
}

// ITEM ICONS (usando emojis como fallback)
const ITEM_ICONS = {
  sword: '⚔️',
  shield: '🛡️',
  armor: '🧥',
  helmet: '⚔️',
  boots: '👢',
  ring: '💍',
  amulet: '📿',
  potion: '🧪',
  scroll: '📜',
  wand: '✨'
};

// RARIDADE CORES
const RARITY_COLORS = {
  'comum': { name: 'Common', color: '#808080', text: 'gray' },
  'incomum': { name: 'Uncommon', color: '#00ff00', text: 'lime' },
  'raro': { name: 'Rare', color: '#0099ff', text: 'dodgerblue' },
  'epico': { name: 'Epic', color: '#ff00ff', text: 'magenta' },
  'lendario': { name: 'Legendary', color: '#ff8000', text: 'orange' },
  'mitico': { name: 'Mythic', color: '#ff1493', text: 'deeppink' },
  'divino': { name: 'Divine', color: '#ffff00', text: 'yellow' },
  'ultra': { name: 'Ultra Divine', color: '#fffacd', text: 'lightyellow' }
};
