import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import './styles.css'

var pi = Math.pi;

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
camera.position.setZ(20);

// to render an object in 3d, we need a set of points to define the object, a material to colour the object,
// and a mesh to combine the points and material into a polygon in x dimensions needed.

// basicaly we need:
// geometry (points), material (colour/texture), lighting to see object

// torus:
const torus_geometry = new THREE.TorusGeometry(10,3,16,100);
const torus_material = new THREE.MeshStandardMaterial({color: 0xff6347})
const torus = new THREE.Mesh(torus_geometry, torus_material);

// stars:
const star_geometry = new THREE.SphereGeometry(0.25);
const white_star_material = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0xffffeb})
const blue_star_material = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0x56fffc})
const yellow_star_material = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0xfa2a2a})

// planets:
// const planet1Texture = new THREE.TextureLoader().load('venus_texture.jpg');
const planet1Texture = new THREE.TextureLoader().load('venus_texture.jpg');
const planet2Texture = new THREE.TextureLoader().load('mars_texture.jpg');
const planet3Texture = new THREE.TextureLoader().load('neptune_texture.jpg');

const planet1 = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: planet1Texture,
    })
)

const planet2 = new THREE.Mesh(
    new THREE.SphereGeometry(5,32,32),
    new THREE.MeshStandardMaterial({
        map: planet2Texture,
    })
)

const planet3 = new THREE.Mesh(
    new THREE.SphereGeometry(4,32,32),
    new THREE.MeshStandardMaterial({
        map: planet3Texture,
    })
)

// light sources:
const pointLightSource = new THREE.PointLight(0xffffff);
const ambientLightSource = new THREE.AmbientLight(0xffffff);
pointLightSource.position.set(5,5,5);

// help visualize sources/objects:
const lightHelper = new THREE.PointLightHelper(pointLightSource);
const gridHelper = new THREE.GridHelper(200,50);

// user controls
const controls = new OrbitControls(camera, renderer.domElement);

function moonOrbit(){};

function ObjRotate(planet, x, y, z){
    planet.rotateOnAxis(new THREE.Vector3(x,y,z), 0.0025);
};

// rendering a scene:
function animate(){
    // renders every screen refresh (60Hz etc), and pauses when user is not on browser tab
    requestAnimationFrame(animate);
    
    ObjRotate(planet1, );
    ObjRotate(planet2, );
    ObjRotate(planet3, );

    controls.update();

    renderer.render(scene, camera);
}

function addWhiteStar(){
    const star = new THREE.Mesh(star_geometry, white_star_material);
    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

    star.position.set(x,y,z);
    scene.add(star)
}

function addBlueStar(){
    const star = new THREE.Mesh(star_geometry, blue_star_material);
    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

    star.position.set(x,y,z);
    scene.add(star)
}

function addYellowStar(){
    const star = new THREE.Mesh(star_geometry, yellow_star_material);
    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

    star.position.set(x,y,z);
    scene.add(star)
}

// adding objects to scene
scene.add(pointLightSource, ambientLightSource);
scene.add(lightHelper, gridHelper);

// planet rotations
scene.add(planet1, planet2, planet3);
planet1.position.set(3, 2, 0);
planet2.position.set(-4,-4, 30);
planet3.position.set(5, 3, 60);

planet1.rotateZ(-0.25);

planet2.rotateY(0.25);
planet2.rotateX(0.0125);

planet3.rotateZ(-0.25);
planet3.rotateX(-0.0125);

// stars
Array(300).fill().forEach(addWhiteStar);
Array(100).fill().forEach(addBlueStar);
Array(100).fill().forEach(addBlueStar);
animate();

// background
// const spaceBG = new THREE.TextureLoader().load('./assets/Starfield.png');
scene.background.colour(0x07074e);