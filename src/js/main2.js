import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'style.scss';


import * as THREE from 'three.module.js';
// import Stats from 'stats.module.js';
import { GUI } from 'dat.gui.module.js';

import { OrbitControls } from 'OrbitControls.js';
import { Water } from 'Water.js';
import { Sky } from 'Sky.js';
import 'main.css';

// let container, stats;
let container;
let camera, scene, renderer;
let controls, water, sun, sky;
let waternormals = require('waternormals.jpg');
let url = waternormals;

init();
animate();

function initSky() {

  // Add Sky
  sky = new Sky();
  // sky.scale.setScalar( 450000 );
  sky.scale.setScalar( 10000 );
  scene.add( sky );

  sun = new THREE.Vector3();



  /// GUI

  const effectController = {
    turbidity: 0.4,
    rayleigh: 0.035,
    mieCoefficient: 0.043,
    mieDirectionalG: 0.984,
    inclination: 0.3123, // elevation / inclination
    azimuth: 0.2364, // Facing front,
    exposure: renderer.toneMappingExposure,
    sunColor: 0xff2d00,
    groundColor: 0xffffff,
  };

  function guiChanged() {

    const uniforms = sky.material.uniforms;
    uniforms[ "turbidity" ].value = effectController.turbidity;
    uniforms[ "rayleigh" ].value = effectController.rayleigh;
    uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
    uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;
    uniforms[ "sunColor" ].value.set( effectController.sunColor );
    uniforms[ "groundColor" ].value.set( effectController.groundColor );

    const theta = Math.PI * ( effectController.inclination - 0.5 );
    const phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

    sun.x = Math.cos( phi );
    sun.y = Math.sin( phi ) * Math.sin( theta );
    sun.z = Math.sin( phi ) * Math.cos( theta );

    uniforms[ "sunPosition" ].value.copy( sun );

    renderer.toneMappingExposure = effectController.exposure;
    renderer.render( scene, camera );

  }

  const gui = new GUI();

  gui.add( effectController, "turbidity", 0.0, 20.0, 0.1 ).onChange( guiChanged );
  gui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
  gui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
  gui.add( effectController, "exposure", 0, 1, 0.0001 ).onChange( guiChanged );
  gui.addColor( effectController, "sunColor" ).onChange( guiChanged );
  gui.addColor( effectController, "groundColor" ).onChange( guiChanged );

  guiChanged();

}

function initWater (){
    //Water
    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
    
    water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load( url, function ( texture ) {
  
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  
        } ),
        alpha: 1.0,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
      }
    );
    water.rotation.x = - Math.PI / 2;
  
    scene.add( water );
}

function init() {

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
  camera.position.set( 0, 100, 2000 );

  scene = new THREE.Scene();

  const helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
  scene.add( helper );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.outputEncoding = THREE.sRGBEncoding;
  //renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.5;
  container.appendChild( renderer.domElement );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  //controls.maxPolarAngle = Math.PI / 2;
  controls.enableZoom = false;
  controls.enablePan = false;

  initSky();
  initWater();
  animate();
  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );
  render();
  // stats.update();

}


function render() {

  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  renderer.render( scene, camera );
}

import 'index';



