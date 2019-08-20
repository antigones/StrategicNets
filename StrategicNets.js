class SimpleNets {

	
	constructor(nodes = [], edges = [], delta = 0.99, cost = 1.4) {
		this.edges = edges;
		this.nodes = nodes;
		this.uDelta = delta;
		this.uCost = cost;
	}
  
	erdos(n,p) {
	  console.log('ER graph generator - '+ n +' nodes, probability ' + p);
	  this.nodes = [];
	  this.edges = [];
	  for (var i=0;i<n;i++) {
		this.nodes.push(i);
			for (var j=0;j<n;j++) {
			if (i != j) {
				// ...avoid self-loop and link duplication
				var e1 = this.edges.filter(edge => (edge[0] === i && edge[1] === j));
				var e2 = this.edges.filter(edge => (edge[0] === j && edge[1] === i));
				if (e1.length == 0 && e2.length == 0) {
					var coin = Math.random();
					if (coin <= p) {
							this.edges.push([i,j]);
							this.edges.push([j,i]);
						}
					}
				}
			}
		}	
		return this;	
	}
	
	erdosSteps(n,p) {
	  console.log('ER graph generator - '+ n +' nodes, probability ' + p);
	  var configurations = new Array();
	  this.nodes = [];
	  this.edges = [];
	  for (var i=0;i<n;i++) {
		  this.nodes.push(i);
	  }
	  
	  for (var i=0;i<n;i++) {
			for (var j=0;j<n;j++) {
			if (i != j) {
				var coin = Math.random();
				if (coin <= p) {
					this.edges.push([i,j]);
					this.edges.push([j,i]);
					var c = new SimpleNets();
					c.nodes = Object.assign(c.nodes,this.nodes);
					c.edges = Object.assign(c.edges,this.edges);
					configurations.push(c);
					}
				}
			}
		}	
	
		return configurations;	
	}
	
	wattsStrogatz(n,k,b) {
		//generate a ring with n nodes,k degree, beta rewiring parameter
		console.log('WS graph generator');
		this.nodes = [];
		this.edges = [];
		//generate lattice...
		for (var i=0;i<n;i++) {
		this.nodes.push(i);
		for (var j=0;j<n;j++) {
			if (i != j) {
				var check = (Math.abs(i-j) % (n-k/2) >= 0) && (Math.abs(i-j) % (n-k/2) <= k/2);
				if (check)
					this.edges.push([i,j]);
				}
			}
		}	
		// ...and rewire with probability b
		for (var j=0;j<this.edges.length;j++) {
			var e = this.edges[j];
			var check = (e[1] > e[0]) && (e[1]<=e[0]+k/2);
			if (check) {
			var coin = Math.random();
				if (coin <= b) {
				// ...choose new k
				var nj = Math.floor(Math.random(0,n-1)*10);
				// ...avoid self-loop and link duplication
				var e1 = this.edges.filter(edge => (edge[0] === e[0] && edge[1] === nj));
		
				if (nj != e[0] && e1.length == 0) {
						e[1] = nj;
					}
				}
			}	
		}
		return this;
	}
	
	wattsStrogatzSteps(n,k,b) {
		//generate a ring with n nodes,k degree, beta rewiring parameter
		console.log('WS graph generator - '+ n +' nodes, degree ' + k + ',b '+b);
		var configurations = new Array();
		this.nodes = [];
		this.edges = [];
		for (var i=0;i<n;i++) {
		  this.nodes.push(i);
		}
		//generate lattice...
		for (var i=0;i<n;i++) {
		for (var j=0;j<n;j++) {
			if (i != j) {
				var check = (Math.abs(i-j) % (n-k/2) >= 0) && (Math.abs(i-j) % (n-k/2) <= k/2);
				if (check) {
					this.edges.push([i,j]);
					var c = new SimpleNets();
					c.nodes = Object.assign(c.nodes,this.nodes);
					c.edges = Object.assign(c.edges,this.edges);
					configurations.push(c);		
				}
				}
			}
		}	
		// ...and rewire with probability b
		for (var j=0;j<this.edges.length;j++) {
			var e = this.edges[j];
			var check = (e[1] > e[0]) && (e[1]<=e[0]+k/2);
			if (check) {
			var coin = Math.random();
				if (coin <= b) {
				// ...choose new k
				var nj = Math.floor(Math.random(0,n-1)*10);
				// ...avoid self-loop and link duplication
				var e1 = this.edges.filter(edge => (edge[0] === e[0] && edge[1] === nj));
				if (nj != e[0] && e1.length == 0) {
						e[1] = nj;
						var c = new SimpleNets();
						c.nodes = Object.assign(c.nodes,this.nodes);
						c.edges = Object.assign(c.edges,this.edges);
						configurations.push(c);		
					}
				}
			}
				
		}
		return configurations;
	}
	
	
	lattice(n,k) {
		console.log('Lattice graph generator');
		
		this.nodes = [];
		this.edges = [];
		
		//generate lattice...
		for (var i=0;i<n;i++) {
		this.nodes.push(i);
		for (var j=0;j<n;j++) {
			if (i != j) {
				var check = (Math.abs(i-j) % (n-k/2) >= 0) && (Math.abs(i-j) % (n-k/2) <= k/2);
				if (check)
					this.edges.push([i,j]);
				}
			}
		}	
	return this;
	}
	
	latticeSteps(n,k) {
		console.log('Lattice graph generator');
		var configurations = new Array();
		this.nodes = [];
		this.edges = [];
		for (var i=0;i<n;i++) {
		  this.nodes.push(i);
		}
		//generate lattice...
		for (var i=0;i<n;i++) {
		this.nodes.push(i);
		for (var j=0;j<n;j++) {
			if (i != j) {
				var check = (Math.abs(i-j) % (n-k/2) >= 0) && (Math.abs(i-j) % (n-k/2) <= k/2);
				if (check) {
					this.edges.push([i,j]);
					var c = new SimpleNets();
					c.nodes = Object.assign(c.nodes,this.nodes);
					c.edges = Object.assign(c.edges,this.edges);
					configurations.push(c);		
				}
				}
			}
		}	
	return configurations;
	}
	
	barabasiAlbert(n,d) {
		// returns the entire BA net building progression
		// d, duration steps
		this.nodes = [];
		this.edges = [];
		var pe = 1;
		var arrGraph = [];
		var eg = new SimpleNets();
		
		// var startGraph = eg.erdos(n,pe);
		var startGraph = eg.lattice(n,2);
		arrGraph[0] = startGraph;

		var t = 1;
		while (t<=d) {
			// try to add node and link
			var degrees = startGraph.degrees();
			var degreesSum = degrees.reduce(function(a, b) {
			  return a + b;
			}, 0);
			// randomly select a destination...
			var ndest = Math.floor(Math.random()*(startGraph.nodes.length-1));
			var p = degrees[ndest]/degreesSum;
			var coin = Math.random();
			
			if (coin <= p) {
				var ng = new SimpleNets([],[],this.uDelta, this.uCost);
				ng.nodes = Object.assign(ng.nodes,startGraph.nodes);
				ng.edges = Object.assign(ng.edges,startGraph.edges);
				ng.nodes.push(ng.nodes.length);			
				ng.edges.push([ng.nodes.length-1,ndest]);
				ng.edges.push([ndest,ng.nodes.length-1]);
				arrGraph[t] = ng;
				startGraph = ng;
				t++;
			}
		}
		return arrGraph;
		
	}

	barabasiAlbertER(n,d) {
		// returns the entire BA net building progression
		// d, duration steps
		this.nodes = [];
		this.edges = [];
		var pe = 0.5;
		var arrGraph = [];
		var eg = new SimpleNets();
		
		var startGraph = eg.erdos(n,pe);
		//var startGraph = eg.lattice(n,2);
		arrGraph[0] = startGraph;

		var t = 1;
		while (t<=d) {
			// try to add node and link
			var degrees = startGraph.degrees();
			var degreesSum = degrees.reduce(function(a, b) {
			  return a + b;
			}, 0);
			// randomly select a destination...
			var ndest = Math.floor(Math.random()*(startGraph.nodes.length-1));
			var p = degrees[ndest]/degreesSum;
			var coin = Math.random();
			
			if (coin <= p) {
				var ng = new SimpleNets([],[],this.uDelta, this.uCost);
				ng.nodes = Object.assign(ng.nodes,startGraph.nodes);
				ng.edges = Object.assign(ng.edges,startGraph.edges);
				ng.nodes.push(ng.nodes.length);			
				ng.edges.push([ng.nodes.length-1,ndest]);
				ng.edges.push([ndest,ng.nodes.length-1]);
				arrGraph[t] = ng;
				startGraph = ng;
				t++;
			}
		}
		return arrGraph;
		
	}
	
	toCy() {
		var tmpNodes = this.nodes;
		var tmpEdges = this.edges;
		this.nodes = [];
		this.edges = [];
		for (var i=0;i<tmpNodes.length;i++) {
			this.nodes.push({data:{id:tmpNodes[i], name:tmpNodes[i]}});
		}
		for (var j=0;j<tmpEdges.length;j++) {
			this.edges.push({data:{source:tmpEdges[j][0], target:tmpEdges[j][1]}});
		}	
		return this;
	}
	
	toCyU() {
		var tmpNodes = this.nodes;
		var tmpEdges = this.edges;
		
		var outNet = new SimpleNets();
		outNet.uDelta = this.uDelta;
		outNet.uCost = this.uCost;
		outNet.nodes = [];
		outNet.edges = [];
		
		var u = this.U();
		
		for (var i=0;i<this.nodes.length;i++) {
			outNet.nodes.push({data:{id:tmpNodes[i], name:tmpNodes[i], utility: this.nodes[i]+', '+u[i].toFixed(3)}});
		}
		for (var j=0;j<this.edges.length;j++) {
			outNet.edges.push({data:{source:tmpEdges[j][0], target:tmpEdges[j][1]}});
		}	
		return outNet;
	}
	
	inDegrees() {
		var degrees = [];
		for (var i=0;i<this.nodes.length;i++) {
			var n = this.nodes[i];
			degrees[i] = 0;
			for(var j=0;j<this.edges.length;j++) {
				var e = this.edges[j];
				if (e[1]==n)
					degrees[i] += 1;
			}
		}
		return degrees;
	}
	
	outDegrees() {
		var degrees = [];
		for (var i=0;i<this.nodes.length;i++) {
			var n = this.nodes[i];
			degrees[i] = 0;
			for(var j=0;j<this.edges.length;j++) {
				var e = this.edges[j];
				if (e[0]==n)
					degrees[i] += 1;
			}
		}
		return degrees;
	}
	
	degrees() {
		var degrees = [];
		var iDegrees = this.inDegrees();
		var oDegrees = this.outDegrees();
		
		for(var i = 0; i < iDegrees.length; i++){
			degrees[i] = iDegrees[i] + oDegrees[i];
		}
		return degrees;
	}
	
	degreeDistribution() {
		var degrees = this.degrees();
		console.log(degrees);
		var maxDegree = Math.max(...degrees);
		console.log(maxDegree);
		var distribution = [];
		for (var i = 0; i < maxDegree; i++) {
			distribution[i] = degrees.filter(function(x){return x==i}).length;
		}
		return distribution;
	}
	
	closenessCentrality() {
		var sp = this.shortestPath();
		var cc = [];
		for (var i = 0; i < this.nodes.length; i++) {
			var sum = 0;
			for (var j = 0; j < this.nodes.length; j++) {
				if (i != j) {
					sum += sp[i][j];
				}
			}
			cc[i] = (this.nodes.length-1)/sum;
		}
		return cc;
	}
	
	decayCentrality(delta) {
		var sp = this.shortestPath();
		var dc = [];
		for (var i = 0; i < this.nodes.length; i++) {
			var sum = 0;
			for (var j = 0; j < this.nodes.length; j++) {
				if (i != j) {
					sum += Math.pow(delta,sp[i][j]);
				}
			}
			dc[i] = sum;
		}
		return dc;
	}
	
	betwennessCentrality() {
		
	}
	
	averageClustering() {
	}
	
	overallClustering() {
		
	}
	
	shortestPath() {
		var distances = [];
		for (var i=0;i < this.nodes.length;i++) {
			distances[i] = new Array(this.nodes.length);
			for (var j=0;j < this.nodes.length;j++) {
				distances[i][j] = Infinity;
			}
		}

		this.edges.forEach(function(e) {
			var source = e[0];
			var dest = e[1];
			distances[source][dest] = 1;
			distances[dest][source] = 1;
		});

		this.nodes.forEach(function(n) {
			distances[n][n] = 0;
		});

		
		this.edges.forEach(function(e) {
			var source = e[0];
			var dest = e[1];
			distances[source][dest] = 1;
		});
		this.nodes.forEach(function(n) {
			var source = n;
			var dest = n;
			distances[source][dest] = 0;
		});
		for (var k=0;k < this.nodes.length;k++) {
			for (var i=0;i < this.nodes.length;i++) {
				for (var j=0;j < this.nodes.length;j++) {
					if (distances[i][j] > distances[i][k] + distances[k][j])
						distances[i][j] = distances[i][k] + distances[k][j];
				}
			}
		}
		return distances;
		}

	U() {
		var distances = this.shortestPath();
		//treat degree as undirected G
		var degrees = this.degrees().map(x=>x/2);
		
		var u = new Array();
		for (var i=0; i <  this.nodes.length; i++) {
			u[i] = 0.0;
			for(var j=0; j <  this.nodes.length; j++) {
				if (i != j) {
					if (distances[i][j] == Infinity) u[i] += 0.0;
					else 
					{
						u[i] += Math.pow(+this.uDelta, +distances[i][j]);					
					}
				}
			}
			u[i] = u[i] - (this.uCost*(degrees[i]));
			u[i] = +u[i];		
			//console.log('u[i] '+i+'-'+u[i]);			
		}
		
		return u;
	}
	
	strategicFormationTwoLinks() {
		console.log('strategicFormationTwoLinks');
		//a link is added or sewered if improve the payoff of the players
		var elist = this.edges;
		var startNet = new SimpleNets();
		startNet.nodes = Object.assign(startNet.nodes,this.nodes);
		startNet.edges = Object.assign(startNet.edges,this.edges);
		startNet.uDelta = this.uDelta;
		startNet.uCost = this.uCost;
		var configurations = new Array(startNet);
	
		for (var i=0; i < this.nodes.length; i++) {
			
		//every player announces a set of intended links
		var intendedLinksI = Array.from({length: this.nodes.length}, () => Math.floor(Math.random() * 2));
		var intendedLinksJ = Array.from({length: this.nodes.length}, () => Math.floor(Math.random() * 2));

		for (var j=0; j < this.nodes.length; j++) {
			//it's a pure strategy
		
			var e1 = this.edges.filter(edge => (edge[0] === i && edge[1] === j));
			var e2 = this.edges.filter(edge => (edge[0] === j && edge[1] === i));

			if ( i != j && e1.length == 0 && e2.length == 0) {
				//sij where i != j
				var sij = Math.min(intendedLinksI[j],intendedLinksJ[j]);
				if (sij == 1) {
				
					this.edges.push([i,j]);
					this.edges.push([j,i]);
				
					var nextNet = new SimpleNets();
					nextNet.nodes = Object.assign(nextNet.nodes,this.nodes);
					nextNet.edges = Object.assign(nextNet.edges,this.edges);
					nextNet.uDelta = this.uDelta;
					nextNet.uCost = this.uCost;
					configurations.push(nextNet);	

				}
			}
		}
		}
		return configurations;
		
	}
	
	efficiency() {
		// return the efficient network configurations		
		// generate the complete configuration
		
		var elist = new Array();
		for (var i=0; i < this.nodes.length; i++) {
			for (var j=0; j < this.nodes.length; j++) {
 				
				var e1 = elist.filter(edge => (edge[0] === i && edge[1] === j));
				var e2 = elist.filter(edge => (edge[0] === j && edge[1] === i));
			
				if ( i != j && e1.length == 0 && e2.length == 0) {
					elist.push([i,j]);
					elist.push([j,i]);
				}
			}
		}
		
		// generate each and every (undirected) configuration from complete edge list
		var cedges = new Array();
		var j = 0;
		for (var i=0;i < elist.length; i=i+2){
			cedges[j] = elist.slice(0,i+2);
			j++;
		}
		//console.log('cedges');
		//console.log(cedges);
		
		// calculate U() for each and every configuration
		var us = new Array();
		var configurations = new Array();
		for (var i=0; i < cedges.length; i++) {
			var s = new SimpleNets(this.nodes, cedges[i], this.uDelta, this.uCost);
			configurations[i] = s;
			var u = s.U();
			us[i] = u;
		};
		
		var emptyConf = new SimpleNets(this.nodes, [], this.uDelta, this.uCost);
		configurations[cedges.length] = emptyConf;
		us[cedges.length] = emptyConf.U();
		
		// calculate sum(u(n))
		var sums = [];
		for (var i = 0; i < us.length; i++) {
			var rus = us[i].reduce(function(a, b) {
			  return a + b;
			}, 0.0);
			sums[i] = +rus;
		}
		
		// calculate the configuration where sum(u(n)) is max
		var max = -Infinity;
		var cIndex = -1;
		for (var i = 0; i < sums.length; i++) {
			if (+sums[i] >= max) {
				max = +sums[i];
				cIndex = i;
			}
		}

		return configurations[cIndex];
	}
	

	efficiencyComplete() {
		// return the efficient network configurations		
		// generate the complete configuration
		
		var elist = new Array();
		for (var i=0; i < this.nodes.length; i++) {
			for (var j=0; j < this.nodes.length; j++) {
 				
				var e1 = elist.filter(edge => (edge[0] === i && edge[1] === j));
				var e2 = elist.filter(edge => (edge[0] === j && edge[1] === i));
			
				if ( i != j && e1.length == 0 && e2.length == 0) {
					elist.push([i,j]);
					//elist.push([j,i]);
				}
			}
		}
		
		// generate each and every (undirected) configuration from complete edge list
		var cedges = this.generatePowerSet(elist);
		
		cedges = cedges.filter(edges => edges.length > 1);
		for (var i=0; i < cedges.length; i++) {
			cedges[i] = [...new Set(cedges[i].concat(cedges[i].map(edge => [edge[1],edge[0]])))];
		}
		
	
		// calculate U() for each and every configuration
		var us = new Array();
		var configurations = new Array();
		for (var i=0; i < cedges.length; i++) {
			var s = new SimpleNets(this.nodes, cedges[i], this.uDelta, this.uCost);
			configurations[i] = s;
			var u = s.U();
			us[i] = u;
		
		};
		
		var emptyConf = new SimpleNets(this.nodes, [], this.uDelta, this.uCost);
		configurations[cedges.length] = emptyConf;
		us[cedges.length] = emptyConf.U();
		
		// calculate sum(u(n))
		var sums = [];
		for (var i = 0; i < us.length; i++) {
			var rus = us[i].reduce(function(a, b) {
			  return a + b;
			}, 0.0);
			sums[i] = +rus;
		}
		
		// calculate the configuration where sum(u(n)) is max
		var max = -Infinity;
		var cIndex = -1;
		for (var i = 0; i < sums.length; i++) {
			if (+sums[i] >= max) {
				max = +sums[i];
				cIndex = i;
			}
		}
		
		return configurations[cIndex];
	}
	
	zip(a,b) {
		return a.map(function(e, i) {
		  return [e, b[i]];
		});
	}
	
	paretoDominate() {
		//net leads to a weakly higher payoff for all individuals and a stricly higher payoff for at least one
		
	
	}
	
	paretoEfficiency() {
		// does not exists any g' such that ui(g') >= ui(g) for every i, with strict inequality for some i
		console.log('pareto Efficiency...');
		var elist = new Array();
		for (var i=0; i < this.nodes.length; i++) {
			for (var j=0; j < this.nodes.length; j++) {
 				
				var e1 = elist.filter(edge => (edge[0] === i && edge[1] === j));
				var e2 = elist.filter(edge => (edge[0] === j && edge[1] === i));
			
				if ( i != j && e1.length == 0 && e2.length == 0) {
					elist.push([i,j]);
				}
			}
		}
		
		// generate each and every (undirected) configuration from complete edge list
		var cedges = this.generatePowerSet(elist);
		
		cedges = cedges.filter(edges => edges.length > 1);
		for (var i=0; i < cedges.length; i++) {
			cedges[i] = [...new Set(cedges[i].concat(cedges[i].map(edge => [edge[1],edge[0]])))];
		}
			
		// calculate U() for each and every configuration
		var configurations = new Array();
		for (var i=0; i < cedges.length; i++) {
			var s = new SimpleNets(this.nodes, cedges[i], this.uDelta, this.uCost);
			configurations[i] = s;
		};
		
		var emptyConf = new SimpleNets(this.nodes, [], this.uDelta, this.uCost);
		configurations[cedges.length] = emptyConf;
		
		var us = [];
		for (var i=0; i<configurations.length; i++) {
			us[i] = configurations[i].U();
		}
		
		// does not exists any g' such that ui(g') >= ui(g) for every i, with strict inequality for some i
		var peff = new Array();
		for (var i=0; i<configurations.length; i++) {
		
			var cond1 = true;
			for (var j=0; j<configurations.length;j++) {
				if (i != j) {
				var zipped = this.zip(us[i], us[j]);
				var sums = zipped.map(a => a[1]-a[0]);
				var reduced = sums.reduce((a, b) => a + b, 0);
				//console.log('reduced '+i+' '+j);
				//console.log(reduced);
				if (reduced > 0)
					cond1 = cond1 && false;
				else
					cond1 = cond1 && true;
				}
				
			}
			
			if (cond1) {
					//console.log('peff found');
					peff.push(configurations[i]);
				}
			
		}
		//console.log('peff');
		//console.log(peff);
		return peff;
	}
	

	/*generatePowerSet(array) {
		var result = [];
		result.push([]);

		for (var i = 1; i < (1 << array.length); i++) {
		var subset = [];
		for (var j = 0; j < array.length; j++)
			if (i & (1 << j))
				subset.push(array[j]);

		result.push(subset);
		}
		return result;
	}*/
	
	generatePowerSet(l) {
    return (function ps(list) {
			if (list.length === 0) {
				return [[]];
			}
			var head = list.pop();
			var tailPS = ps(list);
			return tailPS.concat(tailPS.map(function(e) { return [head].concat(e); }));
		})(l.slice());
	}

	
	pairwiseStable() {
		// finds pairwise stable configurations among all the available configurations
		var elist = new Array();
		for (var i=0; i < this.nodes.length; i++) {
			for (var j=0; j < this.nodes.length; j++) {
 				
				var e1 = elist.filter(edge => (edge[0] === i && edge[1] === j));
				var e2 = elist.filter(edge => (edge[0] === j && edge[1] === i));
			
				if ( i != j && e1.length == 0 && e2.length == 0) {
					elist.push([i,j]);
				}
			}
		}
		
		// generate each and every (undirected) configuration from complete edge list
		var cedges = this.generatePowerSet(elist);
		
		cedges = cedges.filter(edges => edges.length > 1);
		for (var i=0; i < cedges.length; i++) {
			cedges[i] = [...new Set(cedges[i].concat(cedges[i].map(edge => [edge[1],edge[0]])))];
		}
			
		// calculate U() for each and every configuration
		var configurations = new Array();
		for (var i=0; i < cedges.length; i++) {
			var s = new SimpleNets(this.nodes, cedges[i], this.uDelta, this.uCost);
			configurations[i] = s;
		};
		
		var emptyConf = new SimpleNets(this.nodes, [], this.uDelta, this.uCost);
		configurations[cedges.length] = emptyConf;

		
		var pwConfigurations = [];
		for (var i=0; i < configurations.length; i++) {
			if (configurations[i].edges.length == 8) {
			//console.log('examining conf:');
			//console.log(configurations[i]);
			}
			var pwc = configurations[i].isPairwiseStable();
			if (pwc)
				pwConfigurations.push(configurations[i]);
		}
			
		return pwConfigurations;
	
	}
	
	
	
	isPairwiseStable() {
		// for all i,j in g, ui(g) >= u(g-ij) and uj(g) >= uj(g-ij) (no player wants to sever a link)
		// for all i,j not in g, u(g+ij) > ui(g) and uj(g+ij) < uj(g) (no two players both want to add a link)
		console.log('checking pairwise stability...');

		var pairwiseStableCond1 = true;
		
		
		var curNet = new SimpleNets(this.nodes, this.edges, this.uDelta, this.uCost);
		var uCur = curNet.U();

		for (var i=0; i < this.nodes.length; i++) {
			for (var j=0; j < this.nodes.length; j++) {
				if ( i != j ) {
					var edges = [];
					edges = Object.assign(edges,this.edges);
					var e1 = this.edges.filter(edge => (edge[0] === i && edge[1] === j));
					var e2 = this.edges.filter(edge => (edge[0] === j && edge[1] === i));		
					
					//is edge in the graph?
	
					if (e1.length > 0 && e2.length > 0) {
						//remove edges
												
						var re1 = edges.filter(edge => (edge[0] != i || edge[1]!= j) && (edge[0] != j || edge[1]!= i));
						
						// remove re1 from graph
						var nextNet = new SimpleNets(this.nodes, re1, this.uDelta, this.uCost);
						var uNext = nextNet.U();
						if ((uCur[i] >= uNext[i]) && (uCur[j] >= uNext[j])) {
							pairwiseStableCond1 = pairwiseStableCond1 && true;
							//console.log('first condition met');
						}
						else
						{	
							//console.log('fc1 false for '+i+', '+j);
							pairwiseStableCond1 = pairwiseStableCond1 && false;
						}
					}
				}
			}
		}
		
		var pairwiseStableCond2 = true;
		for (var i=0; i < this.nodes.length; i++) {
			for (var j=0; j < this.nodes.length; j++) {
				if ( i != j ) {	
					var edges = [];
					edges = Object.assign(edges,this.edges);
					var e1 = this.edges.filter(edge => (edge[0] === i && edge[1] === j));
					var e2 = this.edges.filter(edge => (edge[0] === j && edge[1] === i));
					// is not in the graph...
					if (e1.length == 0 && e2.length == 0) {
						// add edges
						console.log('adding '+i+' '+j);
						edges.push([i,j]);
						edges.push([j,i]);
						console.log('edges');
						console.log(edges);
						var nextNet = new SimpleNets(this.nodes, edges, this.uDelta, this.uCost);
						var uNext = nextNet.U();
						/*console.log('curNet');
						console.log(curNet);
						console.log(uCur);
						console.log('nextNet');
						console.log(nextNet);
						console.log(uNext);*/
						if (!(uNext[i] > uCur[i]) || (uNext[j] < uCur[j])) {
							pairwiseStableCond2 = pairwiseStableCond2 && true;
							//console.log('second condition met');
						}
						else
						{
							//console.log('fc2 false for '+i+', '+j);
							pairwiseStableCond2 = pairwiseStableCond2 && false;
						}
						//edges = edges.filter(edge => (edge[0] != i || edge[1]!= j) && (edge[0] != j || edge[1]!= i));
					}
				}
			}
		}
		//console.log('pwstablecond1');
		//console.log(pairwiseStableCond1);
		//console.log('pwstablecond2');
		//console.log(pairwiseStableCond2);
		
		return pairwiseStableCond1 && pairwiseStableCond2;
	}
	
	

	
}