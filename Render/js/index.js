import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js";
// import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";
import { Fire } from "./Fire.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.outputEncoding = THREE.sRGBEncoding;

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("grey");

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Solid_grey.svg"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  //trying to figure out lighting :o Plis help
  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = new THREE.Vector3()
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf",
      (gltf) => {
        const root = gltf.scene;
        root.scale.set(0.1, 0.1, 0.1);
        scene.add(root);

        root.position.set(0, 0, 0);
        // compute the box that contains all the stuff
        // from root and below
        const box = new THREE.Box3().setFromObject(root);

        console.log(box.min, box.max);

        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());

        // set the camera to frame the box
        frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

        // update the Trackball controls to handle the new size
        controls.maxDistance = boxSize * 10;
        controls.target.copy(boxCenter);
        controls.update();
      }
    );
  }

  {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf",
      (gltf) => {
        const root2 = gltf.scene;
        root2.scale.set(0.1, 0.1, 0.1);
        scene.add(root2);

        root2.position.set(0, 0, 190);
      }
    );
  }

  {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf",
      (gltf) => {
        const root3 = gltf.scene;
        root3.scale.set(0.1, 0.1, 0.1);
        scene.add(root3);

        root3.position.set(190, 0, 0);
      }
    );
  }

  {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf",
      (gltf) => {
        const root3 = gltf.scene;
        root3.scale.set(0.1, 0.1, 0.1);
        scene.add(root3);

        root3.position.set(190, 0, 190);
      }
    );
  }

  //__________________________________________________
  //City 2
  // {
  //   const objLoader = new OBJLoader2();
  //   objLoader.load("./assets/CITY_1/CITY_1.obj", (root) => {
  //     root.scale.set(3, 3, 3);
  //     root.
  //     console.log(root);
  //     scene.add(root);

  //     root.position.set(0, 0, 0);

  //     // compute the box that contains all the stuff
  //     // from root and below
  //     const box = new THREE.Box3().setFromObject(root);

  //     const boxSize = box.getSize(new THREE.Vector3()).length();
  //     const boxCenter = box.getCenter(new THREE.Vector3());

  //     // set the camera to frame the box
  //     frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

  //     // update the Trackball controls to handle the new size
  //     controls.maxDistance = boxSize * 10;
  //     controls.target.copy(boxCenter);
  //     controls.update();
  //   });
  // }
  // let doll_root;
  // {
  //   const gltfLoader2 = new GLTFLoader();
  //   gltfLoader2.load("./assets/anime_model/scene.gltf", (gltf) => {
  //     doll_root = gltf.scene;
  //     scene.add(doll_root);

  //     doll_root.position.set(0.1, 5, 0);
  //   });
  // }
  // let bike;
  // {
  //   const gltfLoader3 = new GLTFLoader();
  //   gltfLoader3.load("./assets/locomotive/scene.gltf", (gltf) => {
  //     bike = gltf.scene;
  //     bike.scale.set(0.001, 0.001, 0.001);
  //     scene.add(bike);

  //     bike.position.set(0, 18, 0);
  //   });
  // }

  function createObjectLocomotive() {}

  function getWorldCoords(e) {
    var rect = canvas.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    var mouse = new THREE.Vector3();
    mouse.x = (x / canvas.clientWidth) * 2 - 1;
    mouse.y = -(y / canvas.clientHeight) * 2 + 1;
    mouse.z = 0.5;
    mouse.unproject(camera);
    mouse.sub(camera.position).normalize();
    var distance = -camera.position.z / mouse.z,
      scaled = mouse.multiplyScalar(distance),
      coords = camera.position.clone().add(scaled);
    console.log(coords);
    // translator(doll_root);
  }

  canvas.addEventListener("click", getWorldCoords);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  /*
  coords = {
    x: '1',
    y: '1',
    z: '1'
  }

  */

  let translate_var = 4;
  function translator(obj, coords) {
    obj.position.set(0, 0, translate_var);
    translate_var += 4;
    // obj.position.set(0, 200, 0);
  }

  /*

  rot_params -->  Type string, state the direction of turn eg. left

*/

  function rotator(obj, rot_params) {
    if (rot_params == "left") {
      obj.rotation.set(0, Math.PI / 2, 0);
    } else {
      obj.rotation.set(0, -Math.PI / 2, 0);
    }
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
