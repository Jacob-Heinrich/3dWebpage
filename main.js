import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth,window.innerHeight);
camera.position.setZ(20);


renderer.render(scene, camera);

// Rotating Torus

const geometry = new THREE.TorusGeometry(10,1,16,100);
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry,material);


scene.add(torus);


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(4,0,14)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

 function addStar() {
   const geometry = new THREE.SphereGeometry(0.25,24,24);
   const material = new THREE.MeshStandardMaterial({color:0xffffff})
   const star = new THREE.Mesh( geometry, material);

   const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

   star.position.set(x, y, z);
   scene.add(star)
 }

 Array(400).fill().forEach(addStar)

 const spaceTexture = new THREE.TextureLoader().load('space.jpg');
 scene.background = spaceTexture;


 function moveCamera() {
   const t = document.body.getBoundingClientRect().top;
   uranus.rotation.x += 0.05;
   //uranus.rotation.y += 0.075;
   //uranus.rotation.z += 0.05;

   

   camera.position.z = t * -0.1;
   camera.position.x = t * -0.08;
   camera.rotation.y = t * -0.01;

 }

document.body.onscroll = moveCamera


// Animation to rotate Torus

 function animate() {
   requestAnimationFrame( animate);

     //torus.rotation.z += 0.05;
     torus.rotation.x += 0.001;
     torus.rotation.y += 0.005;

   
   
  

   controls.update();


   renderer.render( scene,camera );
 }

 animate()


// Uranus

 const uranusTexture = new THREE.TextureLoader().load('moon.jpg');

 const uranus = new THREE.Mesh(
   new THREE.SphereGeometry(3, 32, 32),
   new THREE.MeshStandardMaterial({
     map: uranusTexture,
   })
 );

scene.add(uranus);


 uranus.position.z = 0;
 uranus.position.y = 10;
uranus.position.setX(-10);


// Saturn

const saturnTexture = new THREE.TextureLoader().load('download.jpg');

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map:saturnTexture,
    })
);

scene.add(saturn)


// Pluto

const pluto = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: saturnTexture,
    })
);

scene.add(pluto);

pluto.position.z = -40;
pluto.position.y = 40;
pluto.position.x = -40;


// Neptune

const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: saturnTexture,
    })
);

scene.add(neptune);

neptune.position.z = -15;
neptune.position.y = 20;
neptune.position.x = -20;



