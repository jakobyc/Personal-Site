// Algorithm base:
function Algorithm()
{
    this.onNodeComplete = new Function();
    this.onCompletion = new Function();
    this.onNeighborDiscovery = new Function();
    this.beforeStart = new Function();
}
// Add callbacks with fluent builder pattern:
Algorithm.prototype.beforeStarting = function(callback)
{
    this.beforeStart = callback;
    
    return this;
}
// Params supported:
// Array of integers (Traversed node ids)
Algorithm.prototype.completed = function(callback)
{
    this.onCompletion = callback;

    return this;
}
// Params supported:
// Completed node
Algorithm.prototype.nodeCompleted = function(callback)
{
    this.onNodeComplete = callback;

    return this;
}
// Params supported:
// Node with discovered neighbors
Algorithm.prototype.neighborsDiscovered = function(callback)
{
    this.onNeighborDiscovery = callback;

    return this;
}

// Breadth First Algorithm:
function BreadthFirst()
{
    Algorithm.call(this);
}

BreadthFirst.prototype = Object.create(Algorithm.prototype);
BreadthFirst.prototype.constructor = BreadthFirst;

BreadthFirst.prototype.execute = function(graph, startId, endId, traversedIds)
{
    var that = this;

    this.beforeStart();

    // Store traversed nodes:
    var traversed = traversedIds || [];
    
    // Queue for nodes:
    var queue = [];
    queue.push(startId);

    while (queue.length > 0)
    {
        var nextId = queue.shift();
        var nextNode = graph.nodes.find(function(node) { return node.id == nextId});
        
        // If next node is found, queue neighbors:
        if (nextNode)
        {
            // If we haven't traversed this node yet, traverse it:
            if (!hasTraversed(nextId, traversed) && !isCurrentlyQueued(nextId, queue))
            {
                queueNeighbors(queue, nextNode, traversed);
            
                traversed.push(nextId);
                
                this.onNodeComplete(nextNode);

                // If we've found the end node, break the loop:
                if (nextId == endId)
                {
                    break;
                }
            }
            else
            {
                console.log('Already traversed that node.');
            }
        }
        else
        {
            console.log('Node ' + nextId.toString() + ' not found');
        }
    }

    // Algorithm completed successfully, invoke callback if available:
    this.onCompletion(traversed);
        
    function queueNeighbors(queue, node, traversed)
    {
        if (node.neighbors && node.neighbors.length > 0)
        {
            node.neighbors.forEach(function(neighbor)
            {
                if (!hasTraversed(neighbor, traversed) && !isCurrentlyQueued(neighbor, queue))
                {
                    queue.push(neighbor)
                }
            });

            that.onNeighborDiscovery(node);
        }
    }

    function hasTraversed(id, traversed)
    {
        return traversed.find(function(traversedId) { return traversedId == id}) != undefined;
    }

    function isCurrentlyQueued(id, queue)
    {
        return queue.find(function(queuedId) { return queuedId == id}) != undefined;
    }
}

// A* Search Algorithm:
function AStar()
{
    this.debug = false;

    Algorithm.call(this);
}

AStar.prototype = Object.create(Algorithm.prototype);
AStar.prototype.constructor = AStar;

// Get distance from current to a specific node:
AStar.prototype.execute = function(graph, startId, endId, traversedIds)
{
    this.beforeStart();

    var currentNode = graph.nodes.find(function(node) { return node.id == startId; });
    // Array of nodes we've already traversed:
    var traversed = traversedIds || [];
    while (currentNode)
    {
        if (currentNode && currentNode.id == endId)
        {
            this.onNodeComplete(currentNode);
            traversed.push(currentNode.id);

            break;
        }

        if (this.debug)
        {
            console.log('Ending node: ' + endId);
        }

        var neighborCosts = neighborCosts || [];
        currentNode.neighbors.forEach(function(neighbor)
        {
            // If we haven't traversed neighbor node yet:
            if (!hasTraversed(neighbor, traversed) && !isCurrentlyAdded(neighbor, neighborCosts))
            {
                // Get costs:
                var gCost = getCost(currentNode.id, neighbor, graph.columns);
                var hCost = getCost(neighbor, endId, graph.columns);
                var fCost = gCost + hCost;
    
                // Add to neighbor costs so we can compare later to other neighbors:
                neighborCosts.push({neighbor, fCost});
            }
        });

        if (this.debug)
        {
            console.log(neighborCosts);
        }
        // Neighbor with lowest fCost:
        var bestNeighbor = undefined;
        neighborCosts.forEach(function(x)
        {
            if (bestNeighbor == undefined || x.fCost < bestNeighbor.fCost)
            {
                bestNeighbor = x;
            }
        });

        this.onNodeComplete(currentNode);
        traversed.push(currentNode.id);

        if (bestNeighbor)
        {
            neighborCosts = neighborCosts.filter(function(element)
            {
                return element.neighbor != bestNeighbor.neighbor;
            });
            
            currentNode = graph.nodes.find(function(node) { return node.id == bestNeighbor.neighbor; });
        }
        else
        {
            currentNode = undefined;
        }

        if (this.debug)
        {
            if (bestNeighbor)
            {
                console.log('Lowest fCost Neighbor: ' + bestNeighbor.neighbor);
            }
            else
            {
                console.log('No neighbors available for node');
            }
        }
    }

    this.onCompletion(traversed);

    // Amount of nodes required to traverse from startId to endId:
    function getCost(startId, endId, columns)
    {
        var rowShifts = Math.ceil(endId / columns) - Math.ceil(startId / columns)
        var columnShifts = endId - (startId + (columns * rowShifts));

        return Math.abs(rowShifts) + Math.abs(columnShifts);
    }

    function hasTraversed(id, traversed)
    {
        return traversed.find(function(traversedId) { return traversedId == id}) != undefined;
    }

    function isCurrentlyAdded(id, neighbors)
    {
        return neighbors.find(function(neighbor) { return neighbor == id}) != undefined;
    }
}

// TODO: Refactor similarly to Breadth First
// Depth First Algorithm:
function DepthFirst()
{
    this.onNodeComplete;
    this.onCompletion;
    this.beforeStart;

    // ids = Node IDs to ignore (marked as traversed):
    DepthFirst.prototype.execute = function(nodes, startId, endId, ids)
    {
        // Before Start callback:
        if (this.beforeStart && this.beforeStart instanceof Function)
        {
            this.beforeStart();
        }

        // Store traversed nodes:
        var traversed = ids || [];
        
        // Stack for nodes:
        var stack = [];
        stack.push(startId);

        while (stack.length > 0)
        {
            var nextId = stack.pop();
            var nextNode = nodes.find(function(node) { return node.id == nextId});

            // If next node is found, stack neighbors:
            if (nextNode)
            {
                if (!hasTraversed(nextId, traversed))
                {
                    stackNeighbors(stack, nextNode, traversed);

                    traversed.push(nextId);

                    // Node completed, invoke callback if available:
                    if (this.onNodeComplete && this.onNodeComplete instanceof Function)
                    {
                        this.onNodeComplete(nextNode);
                    }

                    // If we've found the end node, break the loop:
                    if (nextId == endId)
                    {
                        break;
                    }
                }
            }
        }
        console.log(traversed);

        // Algorithm completed successfully, invoke callback if available:
        if (this.onCompletion && this.onCompletion instanceof Function)
        {
            this.onCompletion(traversed);
        }
    }

    function stackNeighbors(stack, node, traversed)
    {
        if (node.neighbors && node.neighbors.length > 0)
        {
            for (var i = 0; i < node.neighbors.length; i++)
            {
                var neighbor = node.neighbors[i];

                if (!hasTraversed(neighbor, traversed))
                {
                    stack.push(neighbor);

                    // break on first stacked neighbor to continue digging:
                    break;
                }
            }

            // Neighbors discovered, invoke callback if available:
            if (this.onNeighborDiscovery && this.onNeighborDiscovery instanceof Function)
            {
                this.onNeighborDiscovery(node);
            }
        }
    }

    function hasTraversed(id, traversed)
    {
        return traversed.find(function(traversedId) { return traversedId == id}) != undefined;
    }

    function isCurrentlyStacked(id, stack)
    {
        return stack.find(function(stackedId) { return stackedId == id}) != undefined;
    }
}

function Node(id, neighbors)
{
    this.id = id;
    this.neighbors = neighbors;
}

function GridGraph()
{
    this.nodes = [];
    this.state = GraphState.state.ready;
    this.columns;
    this.rows;

    GridGraph.prototype.create = function(columns, rows)
    {
        this.columns = columns;
        this.rows = rows;

        var nodes = [];
        if (columns > 0 && rows > 0)
        {
            var cells = columns * rows;

            for (i = 1; i < cells + 1; i++)
            {
                var node = new Node(i, []);

                // Link top/bottom nodes:
                // If id - columns is greater than 0, link with node in above row (id + columns):
                if (node.id - columns > 0)
                {
                    node.neighbors.push(node.id - columns);
                }

                // Link side nodes:
                switch (node.id % columns)
                {
                    // If column mod id = 0, link left
                    case(0):
                        node.neighbors.push(node.id - 1);
                        break;
                    // Else If column mod id = columns - 1, link right
                    case(1):
                        node.neighbors.push(node.id + 1);
                        break;
                    // Else link both left and right
                    default:
                        node.neighbors.push(node.id - 1);
                        node.neighbors.push(node.id + 1);
                }

                // If id + columns is less than number of cells, link with node in below row:
                // This is placed at the bottom so the largest neighbor gets added last (sorted)
                if (node.id + columns <= cells)
                {
                    node.neighbors.push(node.id + columns);
                }

                nodes.push(node);
            }
        }

        this.nodes = nodes;
        return this;
    }
}

// Graph state for interacting with the graph:
function GraphState()
{
}
GraphState.state = Object.freeze({"painting":1,  "removing":2, "ready":3 });
