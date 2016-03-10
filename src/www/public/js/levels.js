var levelData = { easy:
		  [ { dimension: 9,
		      floor: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 01, 02 ],
			     [ 02, 02 ], [ 03, 02 ], [ 01, 03 ], [ 02, 03 ],
			     [ 03, 03 ], [ 07, 03 ], [ 03, 04 ], [ 07, 04 ],
			     [ 03, 05 ], [ 04, 05 ], [ 05, 05 ], [ 06, 05 ],
			     [ 07, 05 ], [ 02, 06 ], [ 03, 06 ], [ 04, 06 ],
			     [ 06, 06 ], [ 07, 06 ], [ 02, 07 ], [ 03, 07 ],
			     [ 04, 07 ] ],
		      start: [ 01, 01 ],
		      rocks: [ [ 02, 02 ], [ 03, 02 ], [ 02, 03 ] ],
		      dots:  [ [ 07, 03 ], [ 07, 04 ], [ 07, 05 ] ] },

		    { dimension: 10,
		      floor: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 04, 01 ], [ 05, 01 ],
			       [ 06, 01 ], [ 07, 01 ], [ 08, 01 ], [ 01, 02 ], [ 02, 02 ],
			       [ 03, 02 ], [ 04, 02 ], [ 05, 02 ], [ 07, 02 ], [ 08, 02 ],
			       [ 01, 03 ], [ 02, 03 ], [ 04, 03 ], [ 07, 03 ], [ 01, 04 ],
			       [ 02, 04 ], [ 03, 04 ], [ 04, 04 ], [ 05, 04 ], [ 06, 04 ],
			       [ 07, 04 ], [ 05, 05 ], [ 07, 05 ], [ 03, 06 ], [ 04, 06 ],
			       [ 05, 06 ], [ 06, 06 ], [ 07, 06 ], [ 03, 07 ], [ 04, 07 ],
			       [ 05, 07 ], [ 06, 07 ], [ 07, 07 ], ],
		      start: [ 06, 06 ],
		      rocks: [ [ 03, 02 ], [ 04, 03 ], [ 02, 04 ], [ 04, 06 ] ],
		      dots: [ [ 01, 01 ], [ 02, 01 ], [ 01, 02 ], [ 02, 02 ], ] },

		    { dimension: 8,
		      floor: [ [ 02, 01 ], [ 03, 01 ], [ 01, 02 ], [ 02, 02 ],
			       [ 03, 02 ], [ 02, 03 ], [ 03, 03 ], [ 02, 04 ], [ 03, 04 ],
			       [ 04, 04 ], [ 01, 05 ], [ 02, 05 ], [ 03, 05 ], [ 04, 05 ],
			       [ 01, 06 ], [ 02, 06 ], [ 03, 06 ], [ 04, 06 ] ],
		      start: [ 01, 02 ],
		      rocks: [ [ 02, 02 ], [ 02, 03 ], [ 03, 04 ], [ 02, 05 ], [ 03, 06 ] ],
		      dots: [ [ 01, 05 ], [ 01, 06 ], [ 02, 06 ], [ 03, 06 ], [ 04, 06 ] ] },

		    { dimension: 8,
		      floor: [ [ 02, 01 ], [ 03, 01 ], [ 02, 02 ], [ 03, 02 ], [ 04, 02 ],
			       [ 05, 02 ], [ 02, 01 ], [ 03, 03 ], [ 05, 03 ], [ 01, 04 ],
			       [ 03, 04 ], [ 05, 04 ], [ 06, 04 ], [ 01, 05 ], [ 02, 05 ],
			       [ 03, 05 ], [ 04, 05 ], [ 06, 05 ], [ 01, 06 ], [ 02, 06 ],
			       [ 03, 06 ], [ 04, 06 ], [ 05, 06 ], [ 06, 06 ], ],
		      start: [ 02, 01 ],
		      rocks: [ [ 03, 02 ], [ 02, 05 ], [ 05, 06 ] ],
		      dots: [ [ 01, 04 ], [ 01, 05 ], [ 01, 06 ] ] },

		    { dimension: 10,
		      floor: [ [ 02, 02 ], [ 03, 02 ], [ 04, 02 ], [ 05, 02 ], [ 06, 02 ],
			       [ 02, 03 ], [ 06, 03 ], [ 07, 03 ], [ 08, 03 ], [ 01, 04 ],
			       [ 02, 04 ], [ 03, 04 ], [ 04, 04 ], [ 05, 04 ], [ 06, 04 ],
			       [ 07, 04 ], [ 08, 04 ], [ 01, 05 ], [ 02, 05 ], [ 03, 05 ],
			       [ 05, 05 ], [ 06, 05 ], [ 07, 05 ], [ 02, 06 ], [ 03, 06 ],
			       [ 05, 06 ], [ 06, 06 ], [ 07, 06 ] ],
		      start: [ 02, 04 ],
		      rocks: [ [ 02, 03 ], [ 04, 04 ], [ 06, 05 ], [ 07, 05 ] ],
		      dots: [ [ 02, 05 ], [ 03, 05 ], [ 02, 06 ], [ 03, 06 ] ] },

		    { dimension: 13,
		      floor: [ [ 08, 01 ], [ 09, 01 ], [ 08, 02 ], [ 09, 02 ], [ 04, 03 ],
			       [ 05, 03 ], [ 06, 03 ], [ 07, 03 ], [ 08, 03 ], [ 09, 03 ],
			       [ 01, 04 ], [ 02, 04 ], [ 03, 04 ], [ 04, 04 ], [ 08, 04 ],
			       [ 01, 05 ], [ 03, 05 ], [ 05, 05 ], [ 06, 05 ], [ 07, 05 ],
			       [ 08, 05 ], [ 01, 06 ], [ 03, 06 ], [ 04, 06 ], [ 05, 06 ],
			       [ 06, 06 ], [ 08, 06 ], [ 09, 06 ], [ 01, 07 ], [ 03, 07 ],
			       [ 04, 07 ], [ 05, 07 ], [ 06, 07 ], [ 07, 07 ], [ 09, 07 ],
			       [ 01, 08 ], [ 02, 08 ], [ 04, 08 ], [ 05, 08 ], [ 06, 08 ],
			       [ 07, 08 ], [ 09, 08 ], [ 02, 09 ], [ 03, 09 ], [ 04, 09 ],
			       [ 05, 09 ], [ 07, 09 ], [ 09, 09 ], [ 02, 10 ], [ 06, 10 ],
			       [ 07, 10 ], [ 08, 10 ], [ 09, 10 ], [ 02, 11 ], [ 03, 11 ],
			       [ 04, 11 ], [ 05, 11 ], [ 06, 11 ] ],
		      start: [ 08, 01 ],
		      rocks: [ [ 04, 06 ], [ 06, 06 ], [ 05, 07 ], [ 04, 08 ], [ 06, 08 ] ],
		      dots: [ [ 04, 04 ], [ 02, 08 ], [ 08, 06 ], [ 05, 07 ], [ 06, 10] ] },

		    { dimension: 10,
		      floor: [ [ 04, 01 ], [ 05, 01], [ 07, 01 ], [ 08, 01 ], [ 03, 02 ],
			       [ 04, 02 ], [ 05, 02 ], [ 07, 02 ], [ 08, 02 ], [ 03, 03 ],
			       [ 04, 03 ], [ 05, 03 ], [ 06, 03 ], [ 07, 03 ], [ 08, 03 ],
			       [ 03, 04 ], [ 04, 04 ], [ 07, 04 ], [ 08, 04 ], [ 03, 05 ],
			       [ 04, 05 ], [ 05, 05 ], [ 07, 05 ], [ 01, 06 ], [ 02, 06 ],
			       [ 03, 06 ], [ 04, 06 ], [ 05, 06 ], [ 06, 06 ], [ 07, 06 ] ],
		      start: [ 08, 01 ],
		      rocks: [ [ 03, 03 ], [ 05, 03 ], [ 07, 03 ], [ 04, 04 ], [ 04, 05 ] ],
		      dots: [ [ 01, 06 ], [ 02, 06 ], [ 03, 06 ], [ 04, 06 ], [ 05, 06 ] ] },

		    { dimension: 10,
		      floor: [ [ 04, 01 ], [ 05, 01 ], [ 06, 01 ], [ 07, 01 ], [ 02, 02 ],
			       [ 03, 02 ], [ 04, 02 ], [ 07, 02 ], [ 01, 03 ], [ 02, 03 ],
			       [ 03, 03 ], [ 04, 03 ], [ 05, 03 ], [ 06, 03 ], [ 07, 03 ],
			       [ 08, 03 ], [ 01, 04 ], [ 02, 04 ], [ 03, 04 ], [ 04, 04 ],
			       [ 05, 04 ], [ 06, 04 ], [ 07, 04 ], [ 05, 05 ], [ 06, 05 ],
			       [ 07, 05 ] ],
		      start: [ 08, 03 ],
		      rocks: [ [ 04, 02 ], [ 03, 03 ], [ 05, 03 ], [ 04, 04 ], [ 06, 04 ] ],
		      dots: [ [ 02, 02 ], [ 01, 03 ], [ 02, 03 ], [ 01, 04 ], [ 02, 04 ] ] },

		    { dimension: 11,
		      floor: [ [ 02, 01 ], [ 03, 01 ], [ 06, 01 ], [ 07, 01 ], [ 08, 01 ],
			       [ 02, 02 ], [ 03, 02 ], [ 04, 02 ], [ 05, 02 ], [ 06, 02 ],
			       [ 07, 02 ], [ 08, 02 ], [ 02, 03 ], [ 03, 03 ], [ 07, 03 ],
			       [ 08, 03 ], [ 02, 04 ], [ 04, 04 ], [ 05, 04 ], [ 06, 04 ],
			       [ 08, 04 ], [ 02, 05 ], [ 04, 05 ], [ 05, 05 ], [ 06, 05 ],
			       [ 08, 05 ], [ 01, 06 ], [ 02, 06 ], [ 03, 06 ], [ 04, 06 ],
			       [ 05, 06 ], [ 06, 06 ], [ 07, 06 ], [ 08, 06 ], [ 09, 06 ],
			       [ 01, 07 ], [ 02, 07 ], [ 03, 07 ], [ 04, 07 ], [ 05, 07 ],
			       [ 07, 07 ], [ 08, 07 ], [ 09, 07 ] ],
		      start: [ 08, 07 ],
		      rocks: [ [ 05, 02 ], [ 02, 03 ], [ 08, 03 ], [ 02, 06 ], [ 05, 06 ],
			       [ 08, 06 ] ],
		      dots: [ [ 04, 04 ], [ 05, 04 ], [ 06, 04 ], [ 04, 05 ], [ 05, 05 ],
			      [ 06, 05 ] ] },

		    { dimension: 8,
		      floor: [ [ 03, 01 ], [ 04, 01 ], [ 05, 01 ], [ 06, 01 ], [ 03, 02 ],
			       [ 04, 02 ], [ 05, 02 ], [ 06, 02 ], [ 01, 03 ], [ 02, 03 ],
			       [ 03, 03 ], [ 04, 03 ], [ 05, 03 ], [ 06, 03 ], [ 01, 04 ],
			       [ 02, 04 ], [ 03, 04 ], [ 04, 04 ], [ 05, 04 ], [ 04, 05 ],
			       [ 05, 05 ] ],
		      start: [ 01, 03 ],
		      rocks: [ [ 03, 02 ], [ 04, 02 ], [ 05, 02 ], [ 03, 03 ], [ 02, 04 ] ],
		      dots:  [ [ 04, 03 ], [ 05, 03 ], [ 03, 04 ], [ 04, 04 ], [ 05, 04 ] ] },

		    { dimension: 12,
		      floor: [ [ 02, 01 ], [ 03, 01 ], [ 08, 01 ], [ 09, 01 ], [ 10, 01 ],
			       [ 01, 02 ], [ 02, 02 ], [ 03, 02 ], [ 08, 02 ], [ 09, 02 ],
			       [ 10, 02 ], [ 01, 03 ], [ 02, 03 ], [ 03, 03 ], [ 04, 03 ],
			       [ 05, 03 ], [ 06, 03 ], [ 07, 03 ], [ 08, 03 ], [ 09, 03 ],
			       [ 10, 03 ], [ 02, 04 ], [ 03, 04 ], [ 04, 04 ], [ 05, 04 ],
			       [ 07, 04 ], [ 08, 04 ], [ 09, 04 ] ],
		      start: [ 08, 04 ],
		      rocks: [ [ 02, 02 ], [ 03, 03 ], [ 08, 02 ], [ 09, 03 ] ],
		      dots: [ [ 04, 03 ], [ 05, 03 ], [ 06, 03 ], [ 07, 03 ] ] } ],

                  hard:
		  [ { dimension: 10,
		      floor: [ [ 02, 01 ], [ 03, 01 ], [ 04, 01 ], [ 05, 01 ], [ 06, 01 ],
			       [ 02, 02 ], [ 03, 02 ], [ 04, 02 ], [ 03, 03 ], [ 04, 03 ],
			       [ 05, 03 ], [ 06, 03 ], [ 07, 03 ], [ 01, 04 ], [ 02, 04 ],
			       [ 03, 04 ], [ 05, 04 ], [ 07, 04 ], [ 01, 05 ], [ 02, 05 ],
			       [ 03, 05 ], [ 05, 05 ], [ 06, 05 ], [ 07, 05 ], [ 01, 06 ],
			       [ 02, 06 ], [ 03, 06 ] ],
		      start: [ 03, 01 ],
		      rocks: [ [ 03, 03 ], [ 02, 05 ], [ 05, 04 ] ],
		      dots: [ [ 04, 01 ], [ 05, 01 ], [ 06, 01 ] ] },

		    { dimension: 10,
		      floor: [ [ 03, 01 ], [ 04, 01 ], [ 03, 02 ], [ 04, 02 ], [ 01, 03 ],
			       [ 02, 03 ], [ 03, 03 ], [ 04, 03 ], [ 05, 03 ], [ 06, 03 ],
			       [ 07, 03 ], [ 01, 04 ], [ 02, 04 ], [ 03, 04 ], [ 04, 04 ],
			       [ 05, 04 ], [ 06, 04 ], [ 07, 04 ], [ 03, 05 ], [ 04, 05 ],
			       [ 04, 05 ], [ 03, 06 ], [ 04, 06 ] ],
		      start: [ 01, 04 ],
		      rocks: [ [ 02, 04 ], [ 04, 03 ], [ 04, 05 ], [ 06, 04 ] ],
		      dots: [ [ 03, 03 ], [ 03, 04 ], [ 04, 03 ], [ 04, 04 ] ] },

		    { dimension: 7,
		      floor: [ [ 02, 01 ], [ 03, 01 ], [ 04, 01 ], [ 05, 01 ], [ 01, 02 ],
			       [ 02, 02 ], [ 03, 02 ], [ 04, 02 ], [ 05, 02 ], [ 01, 03 ],
			       [ 02, 03 ], [ 03, 03 ], [ 04, 03 ], [ 05, 03 ], [ 01, 04 ],
			       [ 02, 04 ], [ 03, 04 ], [ 04, 04 ], [ 05, 04 ], [ 01, 05 ],
			       [ 02, 05 ], [ 03, 05 ], [ 04, 05 ] ],
		      start: [ 05, 01 ],
		      rocks: [ [ 02, 02 ], [ 04, 02 ], [ 03, 03 ], [ 02, 04 ], [ 04, 04 ] ],
		      dots: [ [ 03, 01 ], [ 01, 03 ], [ 03, 03 ], [ 05, 03 ], [ 03, 05 ] ] },

		    { dimension: 9,
		      floor: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 04, 01 ], [ 05, 01 ],
			       [ 06, 01 ], [ 07, 01 ], [ 01, 02 ], [ 02, 02 ], [ 03, 02 ],
			       [ 04, 02 ], [ 05, 02 ], [ 06, 02 ], [ 07, 02 ], [ 01, 03 ],
			       [ 02, 03 ], [ 03, 03 ], [ 04, 03 ], [ 05, 03 ], [ 06, 03 ],
			       [ 07, 03 ], [ 01, 04 ], [ 02, 04 ], [ 03, 04 ], [ 04, 04 ],
			       [ 05, 04 ], [ 06, 04 ], [ 07, 04 ], [ 01, 05 ], [ 02, 05 ],
			       [ 03, 05 ], [ 04, 05 ], [ 05, 05 ], [ 06, 05 ], [ 07, 05 ],
			       [ 01, 06 ], [ 02, 06 ], [ 03, 06 ], [ 04, 06 ], [ 05, 06 ],
			       [ 06, 06 ], [ 07, 06 ], [ 01, 07 ], [ 02, 07 ], [ 03, 07 ],
			       [ 04, 07 ], [ 05, 07 ], [ 06, 07 ], [ 07, 07 ] ],
		      start: [ 07, 07 ],
		      rocks: [ [ 02, 02 ], [ 04, 02 ], [ 06, 02 ], [ 03, 03 ], [ 05, 03 ],
			       [ 02, 04 ], [ 04, 04 ], [ 06, 04 ], [ 03, 05 ], [ 05, 05 ],
			       [ 02, 06 ], [ 04, 06 ], [ 06, 06 ] ],
		      dots: [ [ 03, 02 ], [ 05, 02 ], [ 02, 03 ], [ 04, 03 ], [ 06, 03 ],
			      [ 03, 04 ], [ 04, 04 ], [ 05, 04 ], [ 02, 05 ], [ 04, 05 ],
			      [ 06, 05 ], [ 03, 06 ], [ 05, 06 ] ] },

		    { dimension: 9,
		      floor: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 04, 01 ], [ 05, 01 ],
 			       [ 06, 01 ], [ 07, 01 ], [ 01, 02 ], [ 02, 02 ], [ 03, 02 ],
 			       [ 04, 02 ], [ 05, 02 ], [ 06, 02 ], [ 07, 02 ], [ 01, 03 ],
 			       [ 02, 03 ], [ 03, 03 ], [ 04, 03 ], [ 05, 03 ], [ 06, 03 ],
 			       [ 07, 03 ], [ 01, 04 ], [ 02, 04 ], [ 03, 04 ], [ 05, 04 ],
			       [ 06, 04 ], [ 07, 04 ], [ 01, 05 ], [ 02, 05 ], [ 03, 05 ],
			       [ 04, 05 ], [ 05, 05 ], [ 06, 05 ], [ 07, 05 ], [ 01, 06 ],
			       [ 02, 06 ], [ 03, 06 ], [ 04, 06 ], [ 05, 06 ], [ 06, 06 ],
			       [ 07, 06 ] ],
		      start: [ 04, 06 ],
		      rocks: [ [ 01, 02 ], [ 02, 02 ], [ 03, 02 ], [ 05, 02 ], [ 06, 02 ],
			       [ 07, 02 ], [ 01, 05 ], [ 02, 05 ], [ 03, 05 ], [ 04, 05 ],
			       [ 05, 05 ], [ 06, 05 ], [ 07, 05 ] ],
		      dots: [ [ 01, 03 ], [ 02, 03 ], [ 03, 03 ], [ 04, 03 ], [ 05, 03 ],
			      [ 06, 03 ], [ 07, 03 ], [ 01, 04 ], [ 02, 04 ], [ 03, 04 ],
			      [ 05, 04 ], [ 06, 04 ], [ 07, 04 ] ] },

		    { dimension: 10,
		      floor: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 06, 01 ], [ 07, 01 ],
			       [ 01, 02 ], [ 02, 02 ], [ 03, 02 ], [ 04, 02 ], [ 05, 02 ],
			       [ 06, 02 ], [ 07, 02 ], [ 01, 03 ], [ 02, 03 ], [ 03, 03 ],
			       [ 05, 03 ], [ 06, 03 ], [ 03, 04 ], [ 06, 04 ], [ 01, 05 ],
			       [ 02, 05 ], [ 03, 05 ], [ 04, 05 ], [ 05, 05 ], [ 06, 05 ],
			       [ 07, 05 ], [ 08, 05 ], [ 01, 06 ], [ 02, 06 ], [ 03, 06 ],
			       [ 06, 06 ], [ 08, 06 ], [ 01, 07 ], [ 02, 07 ], [ 03, 07 ],
			       [ 04, 07 ], [ 05, 07 ], [ 06, 07 ], [ 07, 07 ], [ 08, 07 ] ],
		      start: [ 07, 02 ],
		      rocks: [ [ 02, 02 ], [ 03, 03 ], [ 06, 02 ], [ 03, 06 ], [ 04, 05 ],
			       [ 06, 06 ], [ 05, 07 ] ],
		      dots: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 01, 02 ], [ 02, 02 ],
			      [ 03, 02 ], [ 08, 07 ] ] },

		    { dimension: 9,
		      floor: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 04, 01 ], [ 05, 01 ],
			       [ 01, 02 ], [ 02, 02 ], [ 03, 02 ], [ 04, 02 ], [ 05, 02 ],
			       [ 01, 03 ], [ 02, 03 ], [ 03, 03 ], [ 04, 03 ], [ 05, 03 ],
			       [ 01, 04 ], [ 02, 04 ], [ 03, 04 ], [ 04, 04 ], [ 05, 04 ],
			       [ 01, 05 ], [ 02, 05 ], [ 03, 05 ], [ 04, 05 ], [ 05, 05 ],
			       [ 01, 06 ], [ 02, 06 ], [ 03, 06 ], [ 04, 06 ], [ 05, 06 ],
			       [ 01, 07 ], [ 02, 07 ], [ 03, 07 ], [ 04, 07 ], [ 05, 07 ] ],
		      start: [ 05, 01 ],
		      rocks: [ [ 02, 02 ], [ 03, 02 ], [ 04, 02 ], [ 01, 04 ], [ 02, 04 ],
			       [ 03, 04 ], [ 04, 04 ], [ 05, 04 ], [ 02, 06 ], [ 03, 06 ],
			       [ 04, 06 ] ],
		      dots: [ [ 03, 01 ], [ 01, 02 ], [ 03, 02 ], [ 02, 03 ], [ 03, 03 ],
			      [ 03, 04 ], [ 03, 05 ], [ 04, 05 ], [ 03, 06 ], [ 05, 06 ],
			      [ 03, 07 ] ] },

		    { dimension: 11,
		      floor: [ [ 02, 01 ], [ 03, 01 ], [ 04, 01 ], [ 05, 01 ], [ 06, 01 ],
			       [ 07, 01 ], [ 08, 01 ], [ 09, 01 ], [ 01, 02 ], [ 02, 02 ],
			       [ 03, 02 ], [ 04, 02 ], [ 05, 02 ], [ 06, 02 ], [ 07, 02 ],
			       [ 08, 02 ], [ 09, 02 ], [ 01, 03 ], [ 02, 03 ], [ 03, 03 ],
			       [ 04, 03 ], [ 05, 03 ], [ 06, 03 ], [ 07, 03 ], [ 08, 03 ],
			       [ 09, 03 ], [ 01, 04 ], [ 02, 04 ], [ 03, 04 ], [ 04, 04 ],
			       [ 05, 04 ], [ 06, 04 ], [ 07, 04 ], [ 08, 04 ], [ 09, 04 ],
			       [ 01, 05 ], [ 02, 05 ], [ 03, 05 ], [ 04, 05 ], [ 05, 05 ],
			       [ 06, 05 ], [ 07, 05 ], [ 08, 05 ], [ 09, 05 ] ],
		      start: [ 09, 03 ],
		      rocks: [ [ 03, 01 ], [ 06, 01 ], [ 08, 01 ], [ 03, 02 ], [ 06, 02 ],
			       [ 08, 02 ], [ 03, 03 ], [ 06, 03 ], [ 08, 03 ], [ 03, 04 ],
			       [ 06, 04 ], [ 08, 04 ], [ 03, 05 ], [ 06, 05 ], [ 08, 05 ] ],
		      dots: [ [ 06, 01 ], [ 06, 02 ], [ 06, 03 ], [ 06, 04 ], [ 06, 05 ],
			      [ 07, 01 ], [ 07, 02 ], [ 07, 03 ], [ 07, 04 ], [ 07, 05 ],
 			      [ 08, 01 ], [ 08, 02 ], [ 08, 03 ], [ 08, 04 ], [ 08, 05 ] ] },

				{ dimension: 14,
					floor: [ [ 01, 01 ], [ 02, 01 ], [ 03, 01 ], [ 04, 01 ], [ 10, 01 ],
				     [ 11, 01 ], [ 12, 01 ], [ 01, 02 ], [ 02, 02 ], [ 03, 02 ],
					   [ 04, 02 ], [ 05, 02 ], [ 06, 02 ], [ 10, 02 ], [ 11, 02 ],
					   [ 12, 02 ], [ 01, 03 ], [ 03, 03 ], [ 04, 03 ], [ 05, 03 ],
					   [ 06, 03 ], [ 10, 03 ], [ 11, 03 ], [ 12, 03 ], [ 01, 04 ],
					   [ 02, 04 ], [ 03, 04 ], [ 04, 04 ], [ 05, 04 ], [ 06, 04 ],
					   [ 07, 04 ], [ 08, 04 ], [ 09, 04 ], [ 10, 04 ], [ 11, 04 ],
					   [ 12, 04 ], [ 03, 05 ], [ 04, 05 ], [ 05, 05 ], [ 06, 05 ],
					   [ 07, 05 ], [ 08, 05 ], [ 10, 05 ], [ 11, 05 ], [ 12, 05 ],
					   [ 03, 06 ], [ 04, 06 ], [ 05, 06 ], [ 07, 06 ], [ 08, 06 ],
					   [ 10, 06 ], [ 11, 06 ], [ 12, 06 ], [ 04, 07 ], [ 05, 07 ],
					   [ 06, 07 ], [ 07, 07 ], [ 08, 07 ], [ 10, 07 ], [ 11, 07 ],
					   [ 12, 07 ] ],
          start: [ 11, 04 ],
				  rocks: [ [ 03, 02 ], [ 05, 02 ], [ 05, 03 ], [ 05, 04 ], [ 05, 05 ],
				     [ 05, 06 ], [ 03, 04 ], [ 04, 04 ], [ 07, 06 ], [ 08, 05 ],
					   [ 09, 04 ] ],
					dots: [ [ 12, 01 ], [ 10, 02 ], [ 11, 02 ], [ 12, 02 ], [ 12, 03 ],
				     [ 12, 04 ], [ 12, 05 ], [ 10, 06 ], [ 11, 06 ], [ 12, 06 ],
					   [ 12, 07 ] ] },

				{ dimension: 15,
					floor: [ [ 07, 01 ], [ 08, 01 ], [ 09, 01 ], [ 10, 01 ], [ 11, 01 ],
				     [ 12, 01 ], [ 13, 01 ], [ 07, 02 ], [ 09, 02 ], [ 11, 02 ],
					   [ 13, 02 ], [ 07, 03 ], [ 08, 03 ], [ 09, 03 ], [ 10, 03 ],
					   [ 11, 03 ], [ 13, 03 ], [ 07, 04 ], [ 08, 04 ], [ 09, 04 ],
					   [ 10, 04 ], [ 11, 04 ], [ 12, 04 ], [ 13, 04 ], [ 08, 05 ],
					   [ 09, 05 ], [ 10, 05 ], [ 11, 05 ], [ 13, 05 ], [ 01, 05 ],
					   [ 02, 05 ], [ 04, 05 ], [ 05, 05 ], [ 01, 06 ], [ 02, 06 ],
					   [ 03, 06 ], [ 04, 06 ], [ 05, 06 ], [ 08, 06 ], [ 09, 06 ],
					   [ 10, 06 ], [ 11, 06 ], [ 12, 06 ], [ 13, 06 ], [ 01, 07 ],
					   [ 02, 07 ], [ 04, 07 ], [ 05, 07 ], [ 08, 07 ], [ 01, 08 ],
					   [ 02, 08 ], [ 04, 08 ], [ 06, 08 ], [ 09, 08 ], [ 10, 08 ],
					   [ 01, 09 ], [ 02, 09 ], [ 03, 09 ], [ 04, 09 ], [ 05, 09 ],
					   [ 06, 09 ], [ 07, 09 ], [ 08, 09 ], [ 09, 09 ], [ 10, 09 ],
					   [ 01, 10 ], [ 02, 10 ], [ 06, 10 ], [ 07, 10 ], [ 08, 10 ],
					   [ 08, 08 ], ],
					start: [ 07, 10 ],
				  rocks: [ [ 09, 03 ], [ 11, 03 ], [ 10, 04 ], [ 09, 05 ], [ 11, 05 ],
				     [ 09, 06 ], [ 11, 06 ], [ 07, 08 ], [ 09, 08 ], [ 08, 09 ] ],
					dots: [ [ 01, 05 ], [ 02, 05 ], [ 01, 06 ], [ 02, 06 ], [ 01, 07 ],
				     [ 02, 07 ], [ 01, 08 ], [ 02, 08 ], [ 01, 09 ], [ 02, 09 ] ] } ] }
