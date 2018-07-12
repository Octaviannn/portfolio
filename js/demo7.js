/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */

/**
 * Equation of a line.
 */
const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
    return m * currentVal + b;
};

const distanceThreshold = {min: 0, max: 100};

/**************** Link1 ("nation") ****************/
const link2 = document.getElementById('link2');
const tooltip1 = link2.querySelector('.tooltip__line');
const linkLineInterval = {from: 0, to: 1};
new Nearby(link2, {
    onProgress: (distance) => {
        const scale = lineEq(linkLineInterval.from, linkLineInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(tooltip1, 0.5, {
            ease: 'Expo.easeOut',
            scaleX: `${Math.max(Math.min(scale,linkLineInterval.to),linkLineInterval.from)}`
        });
    }
});



/**************** Link3 ("wilderness") ****************/
const link3 = document.getElementById('link3');
const tooltipWave = link3.querySelector('.tooltip__wave > span');
const waveInterval = {from: 1, to: 15};

const tweenWave = TweenMax.to(tooltipWave, 15, {
    ease: 'Linear.easeNone',
    repeat: -1,
    yoyo: false,
    x: '50%',
    paused: true
});

let stateWave= 'paused';
new Nearby(link3, {
    onProgress: (distance) => {
        const time = lineEq(waveInterval.from, waveInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        tweenWave.timeScale(Math.min(Math.max(time,waveInterval.from),waveInterval.to));

        if ( distance < distanceThreshold.max && distance >= distanceThreshold.min && stateWave !== 'running' ) {
            tweenWave.play();
            stateWave = 'running';
        }
        else if ( (distance > distanceThreshold.max || distance < distanceThreshold.min) && stateWave !== 'paused' ) {
            tweenWave.pause();
            stateWave = 'paused';
        }
    }
});

/**************** Link1 ("nation") ****************/
/*const link2 = document.getElementById('link2');
const tooltip1 = link2.querySelector('.tooltip__line2');
const linkLineInterval = {from: 0, to: 1};
new Nearby(link2, {
    onProgress: (distance) => {
        const scale = lineEq(linkLineInterval.from, linkLineInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(tooltip1, 0.5, {
            ease: 'Expo.easeOut',
            scaleX: `${Math.max(Math.min(scale,linkLineInterval.to),linkLineInterval.from)}`
        });
    }
});*/
