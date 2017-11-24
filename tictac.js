let
	block   = document.getElementsByClassName('game_board_item'),
	player  = document.getElementsByClassName('game_status_name'),
	overlay = document.getElementsByClassName('game_overlay')[0],
	status  = document.getElementsByClassName('game_overlay_text')[0],
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
	if (isEnd || e.target.dataset.value) {
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

		overlay.style.opacity = 1;
		overlay.style.zIndex  = 100;
		status.innerHTML      = user[state].name + ' Win!';
	} else {
		if (moving === 9) {
			isEnd = true;
			overlay.style.opacity = 1;
			overlay.style.zIndex = 100;
			status.innerHTML = 'No More Move!';
		}
	}
}