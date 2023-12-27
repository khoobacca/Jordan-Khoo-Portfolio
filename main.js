import * as THREE from 'three';

// to disaply anything, i need 3 things: scene, camera, and renderer

// set scene specs
const scene = new THREE.Scene();

// set camera specs
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
camera.lookAt(0,0,0);

// set size of renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// to render an object in 3d, we need a set of points to define the object, a material to colour the object,
// and a mesh to combine the points and material into a polygon in x dimensions needed.

// rendering a cube:
const geometryCube = new THREE.BoxGeometry(1,1,1);
const materialCube = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometryCube,materialCube);
scene.add(cube);

// rendering a line:
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
const materialLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const line = new THREE.Line( geometryLine, materialLine );
//scene.add(line);


// rendering a scene:
// renders every screen refresh (60Hz etc), and pauses when user is not on browser tab
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);

    // animating cube:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();
