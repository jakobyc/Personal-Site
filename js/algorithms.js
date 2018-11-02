function BreadthFirst()
{
    this.onNodeComplete;
    this.onCompletion;
    this.onNeighborDiscovery;
    this.beforeStart;

    // ids = Node IDs to ignore (marked as traversed):
    BreadthFirst.prototype.execute = function(nodes, startId, endId, ids)
    {
        // Before Start callback:
        if (this.beforeStart && this.beforeStart instanceof Function)
        {
            this.beforeStart();
        }

        // Store traversed nodes:
        var traversed = ids || [];
        
        // Queue for nodes:
        var queue = [];
        queue.push(startId);

        while (queue.length > 0)
        {
            var nextId = queue.shift();
            var nextNode = nodes.find(function(node) { return node.id == nextId});
            
            // If next node is found, queue neighbors:
            if (nextNode)
            {
                // If we haven't traversed this node yet, traverse it:
                if (!hasTraversed(nextId, traversed) && !isCurrentlyQueued(nextId, queue))
                {
                    queueNeighbors(queue, nextNode, traversed);
                
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
        if (this.onCompletion && this.onCompletion instanceof Function)
        {
            this.onCompletion(traversed);
        }
    }

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

    function isCurrentlyQueued(id, queue)
    {
        return queue.find(function(queuedId) { return queuedId == id}) != undefined;
    }
}

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

function Graph()
{
    this.nodes = [];
    this.state = GraphState.state.ready;

    Graph.prototype.createGridGraph = function(columns, rows)
    {
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
                if (node.id + columns < cells)
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
GraphState.state = Object.freeze({"painting":1,  "removing":2, "ready":3});
