// mix.harmony.js
// Analysised arrays of intervals for harmonic properties.
//
// Reference:
// http://www.acousticslab.org/learnmoresra/moremodel.html
// https://en.wikipedia.org/wiki/Roughness_%28psychophysics%29
// http://music.stackexchange.com/questions/4439/is-there-a-way-to-measure-the-consonance-or-dissonance-of-a-chord

(function(music) {
	var intervals = justIntervals();

	// The multiplication factor we use to turn floats into in integer
	// maths avoiding rounding errors. Essentially a common numerator.
	// Just stack all the primes.
	var factor = 37 * 31 * 29 * 23 * 19 * 17 * 13 * 11 * 7 * 5 * 4 * 3 * 2;

	var factorvals = intervals.map(function(n) {
	    	return n * factor;
	    });

	// Reduce fns
	function min(s, n, i, array) { return Math.min(s, n); }

	// Map fns
	function createAdd(x) { return function add(n) { return x + n; }; };


	function gcd(a, b) {
		// Greatest common divider
		return b ? gcd(b, a % b) : a ;
	}

	function lcm(a, b) {
		// Lowest common multiple.
		return a * b / gcd(a, b);
	}

	function evenIntervals() {
		var ratio = Math.pow(2, 1/12),
		    i = -1,
		    intervals = [1];
	
		while (++i < 128) {
			intervals.push(intervals[intervals.length - 1] * ratio);
		}
	
		return intervals;
	}

	function justIntervals() {
		var intervals = [1, 16/15, 9/8, 6/5, 5/4, 4/3, 7/5, 3/2, 8/5, 10/6, 9/5, 15/8],
		    i = intervals.length - 1;

		while (++i < 128) {
			intervals.push(intervals[i-12] * 2);
		}

		return intervals;
	}

	function weightedIntervals() {
		// Rates intervals by their position in the harmonic series. The idea
		// is called 'interval strength'. It's related to the combined tone
		// method, but not identical.
		// http://en.wikipedia.org/wiki/Harmonic_series_(music)
		return [1, 15, 8, 5, 4, 3, 5, 2, 5, 6, 5, 8, 1];
	}

	function toInterval(n, i) {
		return intervals[n];
	}

	function toFactorval(n, i) {
		return factorvals[n];
	}

	function consonance(arr) {
		return arr.map(toFactorval).reduce(gcd, factor) / factor;
	}

	function density(arr) {
		return arr.length / (arr[arr.length - 1] + 1);
	}

	function floor(array) {
		// Make sure the array's lowest note is 0
		var lowest = array.reduce(min);
		return array.map(createAdd(-lowest));
	}

	music.consonance = function(array) {
		return consonance(floor(array));
	};

	music.density = function(array) {
		return density(floor(array));
	};
})(window.music);