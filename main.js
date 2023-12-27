import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import './styles.css'

// to disaply anything, u need 3 things: scene, camera, and renderer

// set scene specs. a scene is like a container holding objects, cameras, and lights
const scene = new THREE.Scene();

// set camera specs
// there are multiple types of cameras in three.js: array, cube, orthographic, perspective, stereo
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

// set size of renderer
// makes the magic happen. makes everything visible to user
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// more settings
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);
camera.lookAt(0,0,0);

// to render an object in 3d, we need a set of points to define the object, a material to colour the object,
// and a mesh to combine the points and material into a polygon in x dimensions needed.

// basicaly we need:
// geometry (points), material (colour/texture), lighting to see object

// rendering a cube:
// const cube_geometry = new THREE.BoxGeometry(1,1,1);
// const cube_mtrl = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(cube_geometry, cube_mtrl);
// scene.add(cube);

// rendering a torus:
const torus_geometry = new THREE.TorusGeometry(10,3,16,100);
const torus_material = new THREE.MeshStandardMaterial({color: 0xff6347})
const torus = new THREE.Mesh(torus_geometry, torus_material);

// creating light sources:
const pointLightSource = new THREE.PointLight(0xffffff);
const ambientLightSource = new THREE.AmbientLight(0xffffff);
pointLightSource.position.set(5,5,5);

// help visualize sources/objects:
const lightHelper = new THREE.PointLightHelper(pointLightSource);
const gridHelper = new THREE.GridHelper(200,50);

// adding objects to scene after creation
scene.add(pointLightSource, ambientLightSource, torus);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// rendering a scene:
// renders every screen refresh (60Hz etc), and pauses when user is not on browser tab
function animate(){
    requestAnimationFrame(animate);
    
    // animating cube:
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    controls.update();

    renderer.render(scene,camera);
}

function addStars(){
    const star_geometry = new THREE.SphereGeometry(0.25);
    const star_material = new THREE.sphere 
}

animate();
