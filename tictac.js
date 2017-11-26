window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "Do you want to reset this game?";

  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  return confirmationMessage;              // Gecko, WebKit, Chrome <34
});

let
	block   = document.getElementsByClassName('game_board_item'),
	player  = document.getElementsByClassName('game_status_name'),
	overlay = document.getElementsByClassName('game_overlay')[0],
	status  = document.getElementsByClassName('game_overlay_text')[0],
	reset   = document.getElementsByClassName('game_overlay_reset')[0],
	score   = document.getElementsByClassName('game_player_score'),
	current = false,
	state   = 0,
	isEnd   = false,
	moving  = 0,
	flag    = [
		{ 0: '', 1: '', 2: '' },
		{ 0: '', 3: '', 6: '' },
		{ 6: '', 7: '', 8: '' },
		{ 2: '', 5: '', 8: '' },
		{ 1: '', 4: '', 7: '' },
		{ 3: '', 4: '', 5: '' },
		{ 0: '', 4: '', 8: '' },
		{ 2: '', 4: '', 6: '' }
	],
	user    = [{
		name: 'Player 1',
		move: 5,
		score: 0
	}, {
		name: 'Player 2',
		move: 4,
		score: 0
	}];

/**
 * [description]
 * @param  {[type]} block).forEach((item) [description]
 * @return {[type]}                       [description]
 */
Object.keys(block).forEach((item) => {
  block[item].addEventListener('click', (e) => {
	if (isEnd) {
		return false;
	}

	if (e.target.dataset.value && e.target.dataset.value !== '') {
		return false;
	}

	current = !current;
	moving  = moving + 1;

  	let element = e.target,
  		option  = current ? 'X' : 'O';

	element.innerHTML = option;
	element.dataset.value = option;
  	
	// player[0].innerHTML = user[state].name + ' ' + option;
	user[state].move = user[state].move - 1;

  	state = current ? 0 : 1;

    set(item, option);

  }, false);
});

/**
 * [description]
 * @param  {[type]}   index [description]
 * @param  {[type]}   data  [description]
 * @param  {Function} cb    [description]
 * @return {[type]}         [description]
 */
set = (index, data, cb) => {
	flag.forEach((obj, key) => {
		Object.keys(obj).forEach((item) => {
			if (typeof flag[key][index] !== 'undefined') {
				flag[key][index] = data;
			}
		});
	});

	check(flag);
}

/**
 * [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
check = (data) => {
	let bracket = [];
	data.forEach((value, index) => {
		bracket[index] = '';
		Object.keys(value).forEach((idx) => {
			bracket[index] += value[idx];
		})
	})
	// console.log(bracket)
	if (bracket.indexOf('XXX') > -1 || bracket.indexOf('OOO') > -1) {
		isEnd = true;

		overlay.style.opacity  = 1;
		overlay.style.zIndex   = 100;
		status.innerHTML       = user[state].name + ' Win!';
		user[state].score      = user[state].score + 1;
		score[state].innerHTML = user[state].score;
	} else {
		if (moving === 9) {
			isEnd = true;
			overlay.style.opacity = 1;
			overlay.style.zIndex = 100;
			status.innerHTML = 'Draw!';
		}
	}
}

/**
 * [description]
 * @param  {[type]} )     {	}         [description]
 * @param  {[type]} false [description]
 * @return {[type]}       [description]
 */
reset.addEventListener('click', (e) => {
	Object.keys(block).forEach((item) => {
		user[0].move = 5;
		user[1].move = 4;
		current      = false;
		state        = 0;
		isEnd        = false;
		moving       = 0;
		flag         = [
			{ 0: '', 1: '', 2: '' },
			{ 0: '', 3: '', 6: '' },
			{ 6: '', 7: '', 8: '' },
			{ 2: '', 5: '', 8: '' },
			{ 1: '', 4: '', 7: '' },
			{ 3: '', 4: '', 5: '' },
			{ 0: '', 4: '', 8: '' },
			{ 2: '', 4: '', 6: '' }
		];
		block[item].innerHTML     = '';
		block[item].dataset.value = '';
		overlay.style.opacity     = 0;
		overlay.style.zIndex      = -1;
	});
}, false);