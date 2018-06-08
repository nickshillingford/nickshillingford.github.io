let svg = document.querySelector('svg');
let group = document.querySelector('#group');
let rough = new RoughSVG(svg);

let left = 'M777,753.75c2-1.68,4.8-1.84,5.89-4.93-4.19-2.19-8.65-.89-12.86-.72-8.66.36-14.94-2.95-17.08-9.71-2.67-8.43.63-18.48,7.37-22.5a18.24,18.24,0,0,1,9.88-2.58c16.74.08,33.47-.39,50.21-.38a99.11,99.11,0,0,1,16.82,1.44c5.82,1,9.77,4.57,11.09,10.67,2,9.08-1.3,21-13.85,21.85-12.15.85-24.27.5-36.41.71-3.2.06-5.72.27-8.18,3.29C786.74,754.7,781.6,754.22,777,753.75Z';
let right = 'M275.84,798.19c18.82.12,37.63.19,56.45.38,11.25.12,16.51,9.13,16.7,18.53.2,9.82-7.1,15.73-17.11,14.73a80.68,80.68,0,0,0-9-.26c-1.2,0-3.06-.63-3.38,1.11-.26,1.39,1.26,2.24,2.41,2.88a16.6,16.6,0,0,1,2.95,1.61c-5.12.15-10.42,1.17-13.9-4.39-1.25-2-3.63-1.24-5.57-1.27-11.82-.19-23.69.79-35.43-.88-12.31-1.76-18-14.73-11.5-25.5.43-.71.91-1.39,1.36-2.09C262.41,798.58,269.72,796.35,275.84,798.19Z';

let strokeWidth = 0.5;
let roughness = 0.25;
let fillWeight = 2.5;

let node1 = rough.path(left, {
  strokeWidth: strokeWidth,
  roughness: roughness,
  fillWeight: fillWeight,
  fill: '#1dacd6'
});

let node2 = rough.path(right, {
  strokeWidth: strokeWidth,
  roughness: roughness,
  fillWeight: fillWeight,
  fill: '#f780a1'
});

let node3 = rough.path(left, {
  strokeWidth: strokeWidth,
  roughness: roughness,
  fillWeight: fillWeight,
  fill: '#1cac78'
});

let node4 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
let node5 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
let node6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
let node7 = document.createElementNS('http://www.w3.org/2000/svg', 'text');

let nodes = [node1, node2, node3, node4, node5, node6, node7];
let contents = ['codepen', 'twitter', 'github', 'programmer'];
let colors = ['#ffffff', '#ffffff', '#ffffff', '#3b3b3b'];
let textNodes = [node4, node5, node6, node7];
let xPos = [471, 468, 473, 438];
let yPos = [345, 165, 515, 36];

for (var i = 0; i < textNodes.length; i++) {
  textNodes[i].setAttribute('class', 'textNode');
  textNodes[i].setAttribute('fill', colors[i]);
  textNodes[i].setAttribute('x', xPos[i]);
  textNodes[i].setAttribute('y', yPos[i]);
  textNodes[i].textContent = contents[i];
}

node1.setAttribute('transform', 'scale(2.5) translate(-600, -670)');
node2.setAttribute('transform', 'scale(2.5) translate(-100, -682)');
node3.setAttribute('transform', 'scale(2.5) translate(-600, -530)');

for (var i = 0; i < nodes.length; i++) {
  group.append(nodes[i]);
}

node4.addEventListener('click', function() {
  window.open('https://codepen.io/nshillingford/');
});

node5.addEventListener('click', function() {
  window.open('https://twitter.com/n_shillingford');
});

node6.addEventListener('click', function() {
  window.open('https://github.com/nickshillingford');
});
