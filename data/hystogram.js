/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// Hystogram Visualization

// Display data in histogram format

(function (visualizations, global) {
    "use strict";
    // The hystogram is an emitter.
    var hystogram = new Emitter();
    visualizations.hystogram = hystogram;
    hystogram.name = "hystogram";

    var width = 750,
        height = 750;
    var force, vis;

    // There are three phases for a visualization life-cycle:
    // init does initialization and receives the existing set of connections
    // connection notifies of a new connection that matches existing filter
    // remove lets the visualization know it is about to be switched out so it can clean up
    hystogram.on('init', onInit);
    // graph.on('connection', onConnection);
    hystogram.on('remove', onRemove);
    hystogram.on('reset', onReset);

    function onRemove() {
        // var startTime = Date.now();
        if (force) {
            force.stop();
            force = null;
        }
        resetCanvas();
        document.querySelector(".filter-display").classList.add("hidden");
        // console.log('it took %s ms to remove graph view', Date.now() - startTime);
    }

    function onReset() {
        onRemove();
        aggregate.emit('load', global.allConnections);
    }

    function onInit() {
        // console.log('graph::onInit()');
        // console.log('initializing graph from %s connections', filteredAggregate.nodes.length);
        // Handles all of the panning and scaling.
        vis = d3.select(vizcanvas);
        // A D3 visualization has a two main components, data-shaping, and setting up the D3 callbacks
        // This binds our data to the D3 visualization and sets up the callbacks
        initHystogram();
        aggregate.on('update', onUpdate);
        // Differenct visualizations may have different viewBoxes, so make sure we use the right one
        vizcanvas.setAttribute('viewBox', [0, 0, width, height].join(' '));
        // console.log('graph::onInit end');
        document.querySelector(".filter-display").classList.remove("hidden");
    }

    function initHystogram() {
        // Initialize D3 layout and bind data
        // console.log('initGraph()');
        console.log("INIT HYSTOGRAM");
    }

    function updateHystogram() {

    }

    // FIXME: Move this out of visualization so multiple visualizations can use it.
    function resetCanvas() {
        // You will still need to remove timer events
        var parent = vizcanvas.parentNode;
        var newcanvas = vizcanvas.cloneNode(false);
        var vizcanvasDefs = document.querySelector(".vizcanvas defs").cloneNode(true);
        newcanvas.appendChild(vizcanvasDefs);
        parent.replaceChild(newcanvas, vizcanvas);
        vizcanvas = newcanvas;
        aggregate.off('update', onUpdate);
    }


})(visualizations, this);