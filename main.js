import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import './styles.css'

// to display anything, u need 3 things: scene, camera, and renderer

// set scene specs. a scene is like a container holding objects, cameras, and lights
const scene = new THREE.Scene();

// set camera specs
// there are multiple types of cameras in three.js: array, cube, orthographic, perspective, stereo
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

// set size of renderer
// makes the magic happen. makes everything visible to user
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')},);


// more settings
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.setSize(window.innerWidth,window.innerHeight);
// renderer.autoClear = false;
// renderer.setClearColor(0x000000, 0.0);

// document.body.appendChild(renderer.domElement);
camera.position.setZ(400);

// to render an object in 3d, we need a set of points to define the object, a material to colour the object,
// and a mesh to combine the points and material into a polygon in x dimensions needed.

// basicaly we need:
// geometry (points), material (colour/texture), lighting to see object

// cube:
const cube_geometry = new THREE.BoxGeometry(1,1,1);
const cube_mtrl = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(cube_geometry, cube_mtrl);

// torus:
const torus_geometry = new THREE.TorusGeometry(10,3,16,100);
const torus_material = new THREE.MeshStandardMaterial({color: 0xff6347})
const torus = new THREE.Mesh(torus_geometry, torus_material);

// star:
const star_geometry = new THREE.SphereGeometry(0.25);
const star_material = new THREE.MeshStandardMaterial({color: 0xffffff})

// light sources:
const pointLightSource = new THREE.PointLight(0xffffff);
const ambientLightSource = new THREE.AmbientLight(0xffffff);
pointLightSource.position.set(5,5,5);

// help visualize sources/objects:
const lightHelper = new THREE.PointLightHelper(pointLightSource);
const gridHelper = new THREE.GridHelper(200,50);

// user controls
const controls = new OrbitControls(camera, renderer.domElement);

// rendering a scene:
function animate(){
    // renders every screen refresh (60Hz etc), and pauses when user is not on browser tab
    requestAnimationFrame(animate);
    
    // animating cube:
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

function addStar(){
    const star = new THREE.Mesh(star_geometry, star_material);
    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star)
}

// adding objects to scene after creation
scene.add(pointLightSource, ambientLightSource);
scene.add(torus);
scene.add(lightHelper, gridHelper);

Array(200).fill().forEach(addStar);
animate();

// background
const starfieldTexture = new THREE.TextureLoader().load('./assets/Starfield.png');
scene.background = starfieldTexture;