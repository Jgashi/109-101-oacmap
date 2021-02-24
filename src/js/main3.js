import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'style.scss';

// import 'three.module';
// import 'stats.module';
// import 'dat.gui.module';
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
let controls, water, sun, sky, mesh;
let waternormals = require('waternormals.jpg');
let url = waternormals;

init();
animate();

function init() {

  container = document.getElementById( 'container' );

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
  camera.position.set( 0, 0, 0 );

  //

  sun = new THREE.Vector3();

  // Water

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

  // Skybox

  sky = new Sky();
  sky.scale.setScalar( 10000 );
  scene.add( sky );

  const skyUniforms = sky.material.uniforms;

  skyUniforms[ 'turbidity' ].value = 1;
  skyUniforms[ 'rayleigh' ].value = 1;
  skyUniforms[ 'mieCoefficient' ].value = 0.005;
  skyUniforms[ 'mieDirectionalG' ].value = 0.8;
  // skyUniforms[ 'up' ].value = 0.8;

  const parameters = {
    inclination: 0.495,
    azimuth: 0.3243,
    // inclination: 0.3717,
    // azimuth: 0.0356,
    x: 0,
    y: 1,
    z: 0,
  };

  const pmremGenerator = new THREE.PMREMGenerator( renderer );

  function updateSun() {

    const theta = Math.PI * ( parameters.inclination - 0.5 );
    const phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

    sun.x = Math.cos( phi );
    sun.y = Math.sin( phi ) * Math.sin( theta );
    sun.z = Math.sin( phi ) * Math.cos( theta );


    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    sun.set(parameters.x, parameters.y, parameters.z);
    sky.material.uniforms[ 'up' ].value.copy( sun );

    scene.environment = pmremGenerator.fromScene( sky ).texture;

  }

  updateSun();

  //

  // const geometry = new THREE.BoxGeometry( 30, 30, 30 );
  // const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

  // mesh = new THREE.Mesh( geometry, material );
  // scene.add( mesh );

  //

  controls = new OrbitControls( camera, renderer.domElement );
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set( 0, 10, 0 );
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;
  controls.update();

  //

  // stats = new Stats();
  // container.appendChild( stats.dom );

  // GUI

  const gui = new GUI();

  const folderSky = gui.addFolder( 'Sky' );
  folderSky.add( parameters, 'inclination', 0, 0.5, 0.0001 ).onChange( updateSun );
  folderSky.add( parameters, 'azimuth', 0, 1, 0.0001 ).onChange( updateSun );
  folderSky.add( parameters, 'x', -500, 500, 0.1 ).onChange( updateSun );
  folderSky.add( parameters, 'y', 0, 1, 0.1 ).onChange( updateSun );
  folderSky.add( parameters, 'z', -500, 500, 0.1 ).onChange( updateSun );
  // folderSky.open();

  const waterUniforms = water.material.uniforms;

  const folderWater = gui.addFolder( 'Water' );
  folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
  folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
  folderWater.add( waterUniforms.alpha, 'value', 0.9, 1, .001 ).name( 'alpha' );
  // folderWater.open();

  //

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

  // const time = performance.now() * 0.001;

  // mesh.position.y = Math.sin( time ) * 20 + 5;
  // mesh.rotation.x = time * 0.5;
  // mesh.rotation.z = time * 0.51;

  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

  renderer.render( scene, camera );

}

import 'index';



