import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";
import { Fire } from "./Fire.js";

var params = {
  color1: "#ffffff",
  color2: "#ffa000",
  color3: "#000000",
  colorBias: 0.8,
  burnRate: 0.35,
  diffuse: 1.33,
  viscosity: 0.25,
  expansion: -0.25,
  swirl: 50.0,
  drag: 0.35,
  airSpeed: 12.0,
  windX: 0.0,
  windY: 0.75,
  speed: 500.0,
  massConservation: false,
};

let imageMesh;

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.autoClear = false;

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(50, 200000, 50);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(50, 0, 50);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("white");

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
  {
    //trying to figure out lighting :o Plis help

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

  var size = 1000;
  var divisions = 50;

  var gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

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

  {
    var imageLoader = new THREE.TextureLoader();

    // Load an image file into a custom material
    var material = new THREE.MeshLambertMaterial({
      map: imageLoader.load("./assets/fire_1.png"),
    });

    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new THREE.PlaneGeometry(10, 10 * 0.75);

    // combine our image geometry and material into a mesh
    imageMesh = new THREE.Mesh(geometry, material);

    // set the position of the image mesh in the x,y,z dimensions
    imageMesh.position.set(0, -1, 0);
    imageMesh.scale.set(4, 4, 4);

    imageMesh.rotation.set(-Math.PI / 2, 0, Math.PI / 2);

    // add the image to the scene
    scene.add(imageMesh);
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
  let doll_root;
  {
    const gltfLoader2 = new GLTFLoader();
    gltfLoader2.load("./assets/anime_model/scene.gltf", (gltf) => {
      doll_root = gltf.scene;
      scene.add(doll_root);

      doll_root.position.set(-130, 0, -130);
    });
  }
  let bike;
  {
    const gltfLoader3 = new GLTFLoader();
    gltfLoader3.load("./assets/AnyConv.com__bussss.gltf", (gltf) => {
      bike = gltf.scene;
      bike.scale.set(0.001, 0.001, 0.001);
      scene.add(bike);

      bike.position.set(0, 18, 0);
    });
  }

  let fire;

  // {
  //   const objLoader = new OBJLoader2();
  //   objLoader.load("./assets/uploads_files_61646_fire.obj", (fire) => {
  //     fire.scale.set(100, 100, 100);
  //     scene.add(fire);

  //     fire.position.set(0, 0, 0);
  //   });
  // }

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

  let translate_var = 2;
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

export function switchBuilding(pos) {
  pos = String(pos);
  switch (pos) {
    case "1":
      imageMesh.position.set(0, 40, 10);
      break;
    case "2":
      imageMesh.position.set(0, 40, 0);
      break;
    case "3":
      imageMesh.position.set(0, 40, 0);
      break;
    case "4":
      imageMesh.position.set(0, 40, 0);
      break;
    case "5":
      imageMesh.position.set(0, 40, 0);
      break;
    case "6":
      imageMesh.position.set(0, 40, 0);
      break;
    case "7":
      imageMesh.position.set(0, 40, 0);
      break;
    case "8":
      imageMesh.position.set(0, 40, 0);
      break;
    case "9":
      imageMesh.position.set(0, 40, 0);
      break;
    case "10":
      imageMesh.position.set(0, 40, 0);
      break;
    case "11":
      imageMesh.position.set(0, 40, 0);
      break;
    case "12":
      imageMesh.position.set(0, 40, 0);
      break;
    case "13":
      imageMesh.position.set(0, 40, 0);
      break;
    case "14":
      imageMesh.position.set(0, 40, 0);
      break;
    case "15":
      imageMesh.position.set(0, 40, 0);
      break;
    case "16":
      imageMesh.position.set(0, 40, 0);
      break;
    default:
      null;
  }
}

main();
