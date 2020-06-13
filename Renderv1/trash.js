var scene, renderer, controls;
var camera;
var mesh;

function init() {

    var aspect = window.innerWidth / window.innerHeight;

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    camera = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 50;


    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(- 1, - 1, - 1);
    scene.add(light);

    var light = new THREE.AmbientLight(0x222222);
    scene.add(light);


    renderer = new THREE.WebGLRenderer();

    renderer.setSize(
        window.innerWidth, window.innerHeight
    );

    document.body.appendChild(renderer.domElement);

    renderer.setClearColor(0x00ffff, 1);

    renderer.gammaOutput = true;


    var loader = new THREE.GLTFLoader();

    loader.load(
        './assets/city_model/SinCity.glb',
        function (gltf) {
            mesh = gltf.scene;
            mesh.scale.set(0.1, 0.1, 0.1);
            scene.add(mesh);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        function (error) {
            console.log('Why no work');

        }
    );

    window.addEventListener('resize', onWindowResize, false);

    createControls(camera);
}

function createControls(camera) {

    controls = new THREE.TrackballControls(camera, renderer.domElement);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.keys = [65, 83, 68];

}

function onWindowResize() {

    var aspect = window.innerWidth / window.innerHeight;

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();

}

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    render();

}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}


init();
animate();


