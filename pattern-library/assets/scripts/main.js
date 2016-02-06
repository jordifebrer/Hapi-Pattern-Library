// Add path to global scripts
const globalScripts = [];

// Add path to component scripts
const componentScripts = [
    '../../components/example-component-2/scripts/main.js',
    '../../components/example-component/scripts/main.js'
];

// Require scripts
globalScripts.map(_ => require(_));
componentScripts(_ => require(_));
