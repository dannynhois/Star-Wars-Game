// setup new characters - global variables
var Luke, DarthVader, Yoda, HanSolo;
var playerCharacter;
var enemyCharacter;

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
      // if they aren't the same then set enemeycharacter and class
      enemyCharacter = assignedClickedCharacter($(this).attr('id'));
      $(this).addClass('selected-enemy');
      $('#div-defender').html('<h1>Current Defender</h1>');
      $(this).appendTo('#div-defender');
    }
  }
  //  console.log(playerCharacter, enemyCharacter);
  // change hit points tag
  //  console.log($(this).children('.hit-points').html("i changed"));
});

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
  assignHitPoints();
}

function assignHitPoints () {
  $('.character').each(function (x, y) {
    console.log(x, y);
  });
}

function createCharacters () {
  console.log('Creating characters...');
  Luke = new Character('Luke Skywalker', 100, 10, 20);
  DarthVader = new Character('Darth Vader', 200, 20, 40);
  Yoda = new Character('Yoda', 250, 15, 30);
  HanSolo = new Character('Han Solo', 250, 15, 30);

  // set choices to undefined
  playerCharacter = undefined;
  enemyCharacter = undefined;
}

// new Character Object Constructor
function Character (name, hitPoints, attackPower, counterAttackPower) {
  this.name = name;
  this.hitPoints = hitPoints;
  this.attackPower = 0;
  this.counterAttackPower = counterAttackPower;
  this.charIsDead = false;

  this.attack = function () {
    this.attackPower += attackPower;
    return this.attackPower;
  };

  this.counterAttack = function () {
    return this.counterAttackPower;
  };

  this.takeDamage = function (damage) {
    this.hitPoints -= damage;
    console.log('hit points after damage: ' + this.hitPoints);
  };
}
