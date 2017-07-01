// setup new characters - global variables
var Luke, DarthVader, Yoda, HanSolo;
var playerCharacter;
var enemyCharacter;
var characterArray = [];

// start new game
createNewGame();

// when user clicks on any character
$('.character').on('click', function () {
  // if a player hasn't been selected
  if (!playerCharacter) {
    // set player charater to person clicked
    playerCharacter = assignedClickedCharacter($(this).attr('id'));

    // update classes for character
    $(this).addClass('selected-player');
    $('.character').not('.selected-player').addClass('enemy');

    // show select enemy div
    $('#div-enemies').html('<h1>Select An Enemy</h1>');
    $('.enemy').appendTo('#div-enemies');
    $('#div-player h1').text('Current Player');
  }

  // else check to see if enemy character has not been selected or undefined
  else if (!enemyCharacter) {
    // verify selected enemy isn't the current hero
    if (playerCharacter !== assignedClickedCharacter($(this).attr('id'))) {
      // if they aren't the same then set enemycharacter and class
      enemyCharacter = assignedClickedCharacter($(this).attr('id'));
      $(this).addClass('selected-enemy');

      // move enemy to current defender
      $('#div-defender').html('<h1>Current Defender</h1>');
      $(this).appendTo('#div-defender');

      // rename select an enemy div
      $('#div-enemies > h1').text('Up Next');
    }
  }
});

$('#attack').on('click', function () {
  // do nothing if there isn't a valid player or enemy character
  if (!playerCharacter || !enemyCharacter) {
    return console.log('Need to select player and enemy');
  }

  // if both player and enemy is alive
  if (!playerCharacter.charIsDead && !enemyCharacter.charIsDead) {
    attackBattle();
  }
});

function attackBattle () {
  var battleMessage = $('#battle-message');
  var message = '';
  battleMessage.html('');

  // player attacks first
  enemyCharacter.takeDamage(playerCharacter.attack());
  $('.selected-enemy > .hit-points').text(enemyCharacter.hitPoints);
  message = playerCharacter.name + ' attacked ' + enemyCharacter.name + ' for ' + playerCharacter.previousAttack() + ' damage.';
  battleMessage.append('<p>' + message + '</p>');
  // check if enemy died
  if (enemyCharacter.charIsDead) {
    message = enemyCharacter.name + ' has died.';
    $('.selected-enemy').hide();
    enemyCharacter = undefined;
    battleMessage.append(message);
    return checkIsGameOver();
  }

  // receive counterattack
  playerCharacter.takeDamage(enemyCharacter.counterAttack());
  $('.selected-player > .hit-points').text(playerCharacter.hitPoints);
  message = enemyCharacter.name + ' attacked ' + playerCharacter.name + ' for ' + enemyCharacter.counterAttackPower + ' damage.';
  battleMessage.append('<p>' + message + '</p>');
  // check if player is alive
  if (playerCharacter.charIsDead) {
    return checkIsGameOver();
  }
}

function checkIsGameOver () {
  var battleMessage = $('#battle-message');
  var message = '';
  var count = 0;

  // create a restart button
  var restart = $('<button>');
  restart.attr('id', 'restart-button');
  restart.text('Restart Game');
  restart.on('click', function () {
    location.reload();
  });

  // count the number of dead charcters
  characterArray.forEach(function (c) {
    if (c.charIsDead) {
      count++;
    }
  });

  // if number of characters dead is 1 less than array length it means all enemy has died
  if (count === (characterArray.length - 1)) {
    message = 'You have defeated all the enemies!';
    battleMessage.append('<p>' + message + '</p>');
    battleMessage.append(restart);
  }
  if (playerCharacter.charIsDead) {
    message = 'You died. Try again!';
    battleMessage.append('<p>' + message + '</p>');
    battleMessage.append(restart);
  }
}

function assignedClickedCharacter (name) {
  switch (name) {
    case 'luke':
      return Luke;
    case 'darth-vader':
      return DarthVader;
    case 'han-solo':
      return HanSolo;
    case 'yoda':
      return Yoda;
    default:
      return undefined;
  }
}

function createNewGame () {
  console.log('Creating new game...');
  createCharacters();
  addCharactersToHTML();
}

function addCharactersToHTML () {
  characterArray.forEach(function (c) {
    var charHTML = $('<div class="character" id="' + c.id + '">');
    charHTML.append('<div>' + c.name + '</div>');
    charHTML.append('<img class="img-character" src="' + c.image + '">');
    charHTML.append('<div class="hit-points">' + c.hitPoints + '</div>');
    $('#div-player').append(charHTML);
  });
}

function createCharacters () {
  Luke = new Character('Luke Skywalker', 'luke', 180, 20, 15, './assets/images/luke.jpg');
  DarthVader = new Character('Darth Vader', 'darth-vader', 200, 10, 40, './assets/images/darth_vader.jpg');
  Yoda = new Character('Yoda', 'yoda', 225, 13, 35, './assets/images/yoda.jpg');
  HanSolo = new Character('Han Solo', 'han-solo', 225, 15, 10, './assets/images/han_solo.jpg');

  // set choices to undefined
  playerCharacter = undefined;
  enemyCharacter = undefined;

  // add character objects to character array
  characterArray = [Luke, DarthVader, Yoda, HanSolo];
}

// new Character Object Constructor
function Character (name, id, hitPoints, attackPower, counterAttackPower, image) {
  this.name = name;
  this.id = id;
  this.hitPoints = hitPoints;
  this.attackPower = attackPower;
  this.counterAttackPower = counterAttackPower;
  this.charIsDead = false;
  this.image = image;

  this.attack = function () {
    this.attackPower += attackPower;
    return this.attackPower - attackPower;
  };

  this.previousAttack = function () {
    return this.attackPower - attackPower;
  };

  this.counterAttack = function () {
    return this.counterAttackPower;
  };

  this.takeDamage = function (damage) {
    this.hitPoints -= damage;

    // check if character has died
    if (this.hitPoints <= 0) {
      this.charIsDead = true;
      console.log('char is dead: ', this.charIsDead);
    }
    console.log('hit points after damage: ' + this.hitPoints);
  };
}
