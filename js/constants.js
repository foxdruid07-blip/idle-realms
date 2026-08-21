// ==================== CONSTANTES DO JOGO ====================

// RARIDADES
const RARITIES = [
  { id: 'comum', name: 'Comum', color: '#c0c0c0', stats: 1 },
  { id: 'incomum', name: 'Incomum', color: '#32cd32', stats: 2 },
  { id: 'raro', name: 'Raro', color: '#4169e1', stats: 3 },
  { id: 'epico', name: 'Épico', color: '#9932cc', stats: 4 },
  { id: 'lendario', name: 'Lendário', color: '#ff8c00', stats: 5 },
  { id: 'mitico', name: 'Mítico', color: '#ff1493', stats: 6 },
  { id: 'divino', name: 'Divino', color: '#ffd700', stats: 7 },
  { id: 'ultra', name: 'Ultra Divino', color: '#fff8dc', stats: 8 }
];

// ATRIBUTOS
const ATTRIBUTES = ['Vida', 'Mana', 'Dano', 'Defesa', 'Velocidade', 'XP%', 'Ouro%', 'Drop%'];

// AURAS
const AURAS = [
  { min: 0, name: 'Nenhuma', color: 'transparent', bonus: '' },
  { min: 10, name: 'Branca', color: 'rgba(255,255,255,.3)', bonus: '+1% XP' },
  { min: 50, name: 'Verde', color: 'rgba(50,205,50,.3)', bonus: '+2% XP +1% Dano' },
  { min: 100, name: 'Azul', color: 'rgba(65,105,225,.3)', bonus: '+3% XP +2% Dano +1% Ouro' },
  { min: 200, name: 'Dourada', color: 'rgba(255,215,0,.35)', bonus: '+5% XP +3% Dano +2% Ouro +1% Drop' },
  { min: 500, name: 'Lendária', color: 'rgba(255,140,0,.4)', bonus: '+8% XP +5% Dano +3% Ouro +2% Drop' },
  { min: 1000, name: 'Mítica', color: 'rgba(255,20,147,.4)', bonus: '+12% XP +7% Dano +4% Ouro +3% Drop +2% Vel' },
  { min: 2000, name: 'Divina', color: 'rgba(255,215,0,.5)', bonus: '+15% XP +10% Dano +5% Ouro +4% Drop +3% Vel +5% Vida' }
];

// MONSTROS DO TIBIA
const MONSTERS = [
  {
    name: 'Rato',
    sprite: '🐭',
    hp: 40,
    damage: 4,
    exp: 12,
    gold: 2,
    drops: [{ name: 'Adaga Enferrujada', type: 'weapon', icon: '🗡️', value: 5 }]
  },
  {
    name: 'Aranha',
    sprite: '🕷️',
    hp: 55,
    damage: 6,
    exp: 18,
    gold: 3,
    drops: [{ name: 'Botas Rasgadas', type: 'armor', icon: '👢', value: 6 }]
  },
  {
    name: 'Lobo',
    sprite: '🐺',
    hp: 80,
    damage: 9,
    exp: 28,
    gold: 5,
    drops: [{ name: 'Espada de Lobo', type: 'weapon', icon: '⚔️', value: 18 }]
  },
  {
    name: 'Goblin',
    sprite: '👺',
    hp: 100,
    damage: 11,
    exp: 35,
    gold: 8,
    drops: [{ name: 'Adaga de Goblin', type: 'weapon', icon: '🗡️', value: 25 }]
  },
  {
    name: 'Orc',
    sprite: '🪓',
    hp: 200,
    damage: 22,
    exp: 95,
    gold: 25,
    drops: [{ name: 'Machado Orc', type: 'weapon', icon: '⚒️', value: 400 }]
  },
  {
    name: 'Troll',
    sprite: '👹',
    hp: 150,
    damage: 16,
    exp: 60,
    gold: 15,
    drops: [{ name: 'Escudo de Troll', type: 'armor', icon: '🛡️', value: 80 }]
  },
  {
    name: 'Esqueleto',
    sprite: '💀',
    hp: 180,
    damage: 19,
    exp: 75,
    gold: 20,
    drops: [{ name: 'Cajado Ósseo', type: 'weapon', icon: '🪄', value: 120 }]
  },
  {
    name: 'Cobra',
    sprite: '🐍',
    hp: 120,
    damage: 14,
    exp: 45,
    gold: 10,
    drops: [{ name: 'Veneno', type: 'consumable', icon: '🧪', value: 30 }]
  }
];

// HUNTS - ÁREAS DE CAÇA
const HUNTS = [
  {
    id: 'floresta',
    name: '🌲 Floresta Iniciante',
    minLvl: 1,
    maxLvl: 15,
    monsters: [0, 1, 2, 7] // Rato, Aranha, Lobo, Cobra
  },
  {
    id: 'caverna',
    name: '⛰️ Caverna Escura',
    minLvl: 16,
    maxLvl: 30,
    monsters: [3, 4, 5, 6] // Goblin, Orc, Troll, Esqueleto
  },
  {
    id: 'castelo',
    name: '🏰 Castelo Antigo',
    minLvl: 31,
    maxLvl: 50,
    monsters: [4, 5, 6] // Orc, Troll, Esqueleto
  }
];

// SKILLS
const SKILLS = [
  {
    id: 'ataque-basico',
    name: 'Ataque Básico',
    icon: '⚔️',
    type: 'attack',
    manaCost: 0,
    cooldown: 0,
    level: 1
  },
  {
    id: 'golpe-pesado',
    name: 'Golpe Pesado',
    icon: '💥',
    type: 'attack',
    manaCost: 10,
    cooldown: 2,
    level: 5,
    damageMultiplier: 1.5
  },
  {
    id: 'cura-rapida',
    name: 'Cura Rápida',
    icon: '❤️',
    type: 'heal',
    manaCost: 15,
    cooldown: 3,
    level: 5,
    healAmount: 40
  },
  {
    id: 'escudo-magico',
    name: 'Escudo Mágico',
    icon: '🛡️',
    type: 'defense',
    manaCost: 20,
    cooldown: 5,
    level: 10,
    defenseBonus: 10
  }
];

// EQUIPAMENTOS
const EQUIPMENT_SLOTS = [
  { slot: 'cabeca', name: 'Cabeça', icon: '🧢' },
  { slot: 'peito', name: 'Peito', icon: '👕' },
  { slot: 'maos', name: 'Arma', icon: '🗡️' },
  { slot: 'pernas', name: 'Pernas', icon: '👢' },
  { slot: 'anel', name: 'Anel', icon: '💍' },
  { slot: 'amuleto', name: 'Amuleto', icon: '📿' },
  { slot: 'municao', name: 'Munição', icon: '🏹' },
  { slot: 'bolsa', name: 'Bolsa', icon: '🎒' }
];
