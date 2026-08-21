// ==================== LOOP PRINCIPAL DO JOGO ====================

let player;
let ui;
let currentBattle = null;
let gameRunning = false;
let battleLoop = null;

function initGame() {
  player = new Player();
  player.load();
  
  ui = new UI(player);
  
  // Renderizar telas iniciais
  renderHuntList();
  updateUI();
  
  // Event listeners adicionais
  document.getElementById('btn-pause').addEventListener('click', togglePause);
  document.getElementById('btn-stop').addEventListener('click', stopBattle);
  document.getElementById('btn-stamina').addEventListener('click', buyStamina);
  document.getElementById('sell-all-btn').addEventListener('click', sellAllItems);
  document.getElementById('clear-inv-btn').addEventListener('click', clearInventory);
}

function renderHuntList() {
  const selector = document.getElementById('hunt-selector');
  selector.innerHTML = '';
  
  HUNTS.forEach(hunt => {
    const canAccess = player.level >= hunt.minLvl && player.level <= hunt.maxLvl;
    const div = document.createElement('div');
    div.className = `hunt-card ${canAccess ? '' : 'disabled'}`;
    
    div.innerHTML = `
      <div class="hunt-card-name">${hunt.name}</div>
      <div class="hunt-card-info">
        Nv. ${hunt.minLvl} - ${hunt.maxLvl}
      </div>
    `;
    
    if (canAccess) {
      div.addEventListener('click', () => startHunt(hunt));
    }
    
    selector.appendChild(div);
  });
}

function startHunt(hunt) {
  if (!player.hasStamina()) {
    alert('Sem stamina!');
    return;
  }
  
  // Ocultar seletor, mostrar arena
  document.getElementById('hunt-selector').style.display = 'none';
  document.getElementById('battle-arena').style.display = 'flex';
  
  // Iniciar primeira batalha
  const monsterIndex = hunt.monsters[Math.floor(Math.random() * hunt.monsters.length)];
  const monster = MONSTERS[monsterIndex];
  
  currentBattle = new Battle(player, monster);
  currentBattle.start();
  
  gameRunning = true;
  battleLoop = setInterval(gameUpdate, 1000);
}

function gameUpdate() {
  if (!gameRunning || !currentBattle) return;
  
  // Consumir stamina
  player.reduceStamina(1);
  
  // Atualizar batalha
  const battleActive = currentBattle.update();
  
  // Atualizar UI
  updateUI();
  
  // Log
  currentBattle.log.forEach(entry => {
    if (entry.timestamp > (Date.now() - 2000)) {
      ui.addActivityLog(entry.message, entry.type);
    }
  });
  
  // Verificar stamina
  if (!player.hasStamina()) {
    alert('Stamina esgotada!');
    stopBattle();
  }
  
  // Se morte, nova batalha
  if (!battleActive) {
    setTimeout(() => {
      const hunt = HUNTS.find(h => h.id === 'floresta');
      if (hunt) {
        const monsterIndex = hunt.monsters[Math.floor(Math.random() * hunt.monsters.length)];
        const monster = MONSTERS[monsterIndex];
        currentBattle = new Battle(player, monster);
        currentBattle.start();
      }
    }, 1200);
  }
}

function togglePause() {
  gameRunning = !gameRunning;
  const btn = document.getElementById('btn-pause');
  btn.textContent = gameRunning ? '⏸️ Pausar' : '▶️ Continuar';
}

function stopBattle() {
  gameRunning = false;
  clearInterval(battleLoop);
  currentBattle = null;
  
  document.getElementById('hunt-selector').style.display = 'block';
  document.getElementById('battle-arena').style.display = 'none';
  
  player.save();
  renderHuntList();
}

function buyStamina() {
  if (player.spendGold(500)) {
    player.restoreStamina(60);
    ui.updateHeader();
  } else {
    alert('Ouro insuficiente!');
  }
}

function sellAllItems() {
  const total = player.inventory.getTotalValue();
  player.addGold(total);
  player.inventory.clear();
  
  alert(`Vendeu tudo por ${total} ouro!`);
  updateUI();
  player.save();
}

function clearInventory() {
  if (confirm('Apagar todos os itens sem ganhar ouro?')) {
    player.inventory.clear();
    updateUI();
    player.save();
  }
}

function updateUI() {
  ui.updateHeader();
  ui.updateCharacterPanel();
  ui.updateInventory();
  
  if (currentBattle) {
    ui.updateBattleDisplay(currentBattle);
  }
}

// Inicializar ao carregar
window.addEventListener('DOMContentLoaded', initGame);

// Salvar periodicamente
setInterval(() => {
  if (player) {
    player.save();
  }
}, 30000);
