let
	_el = document.getElementsByClassName('game_board_item'),
	_pl = document.getElementsByClassName('game_status_name'),
	_ov = document.getElementsByClassName('game_overlay')[0],
	_sc = document.getElementsByClassName('game_overlay_text')[0],
	_ct = false,
	_st = 0,
	_ie = false,
	_us = [{
		name: 'Player 2',
		move: 5,
		score: 0
	}, {
		name: 'Player 1',
		move: 4,
		score: 0
	}],
	_fl = [{
		0: '',
		1: '',
		2: ''
	},{
		0: '',
		3: '',
		6: ''
	},{
		6: '',
		7: '',
		8: ''
	},{
		2: '',
		5: '',
		8: ''
	},{
		1: '',
		4: '',
		7: ''
	},{
		3: '',
		4: '',
		5: ''
	},{
		0: '',
		4: '',
		8: ''
	},{
		2: '',
		4: '',
		6: ''
	}];

Object.keys(_el).forEach((item) => {
  _el[item].addEventListener('click', (e) => {
	_ct  = !_ct;

  	let _ths = e.target,
  		_opt = _ct ? 'O' : 'X';

	if (_ie) {
		return false;
	}

  	if (_ths.dataset.value) {
  		return false
  	}

	_ths.innerHTML = _opt;
	_ths.dataset.value = _opt;
  	
	_pl[0].innerHTML = _us[_st].name + ' ' + _opt;
	_us[_st].move = _us[_st].move - 1;

  	_st = _ct ? 0 : 1;

    set(item, _opt);
	// Console current user
	// console.log(_us[_st])
  }, false);
})

set = (index, data, cb) => {
	_fl.forEach((obj, key) => {
		Object.keys(obj).forEach((item) => {
			if (typeof _fl[key][index] !== 'undefined') {
				_fl[key][index] = data;
			}
		})
	})
	// console.log(index, data)
	check(_fl)
}

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
		_ie = true;
		_ov.style.opacity = 1;
		_ov.style.zIndex = 100;
		_sc.innerHTML = _us[_st].name + ' Win!';
	}

	if (_us[0].move == 0) {
		_ie = true;
		_ov.style.opacity = 1;
		_ov.style.zIndex = 100;
		_sc.innerHTML = 'No More Move!';
	}
}