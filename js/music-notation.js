(function(notation) {
	

	function noop() {}

	function contains(array, n) {
		return array.indexOf(n) > -1;
	}


	notation.chord = (function(assemble) {
		return function(array) {
			var parts = [];
	
			array.forEach(function(n) {
				assemble[n] && assemble[n](parts, array);
			});
	
			return parts.join('');
		};
	})({
		1: function(parts, notes) {
			parts[3] = 'b9';
		},

		2: function(parts, notes) {
			parts[3] = '9';
		},
		
		3: function(parts, notes) {
			if (contains(notes, 4)) {
				parts[3] = '#9';
			}
			else {
				parts[0] = '-';
			}
		},
		
		5: function(parts, notes) {
			parts[2] = 'sus';
		},

		10: function(parts, notes) {
			if (contains(notes, 11)) {

			}
			else {
				parts[1] = '7';
			}
		},
		
		11: function(parts, notes) {
			if (contains(notes, 10)) {

			}
			else {
				parts[1] = '∆';
			}
		}
	});

})(this.window && (this.window.notation = {}) || module.exports);