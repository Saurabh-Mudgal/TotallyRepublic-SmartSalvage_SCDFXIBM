var scene, camera, renderer;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspetiveCamera(40, window.innerWidth/window.innerHeight,1,5000);

    highlight = new THREE.AmbientLight (0x404040,100);
    scene.add(highlight);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var loader = new THREE.ObjectLoader();
    loader.load( "SinCity.json", function ( obj ) { scene.add( obj ); });

init()
