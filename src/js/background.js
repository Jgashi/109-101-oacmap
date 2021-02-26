import * as THREE from 'three.module.js';

import Stats from 'stats.module.js';

import { GUI } from 'dat.gui.module.js';
import { OrbitControls } from 'OrbitControls.js';
import { Water } from 'Water.js';
import { Sky } from 'Sky.js';

let container, stats;
let camera, scene, renderer;
let controls, water, sun, mesh;
let waternormals = require('waternormals.jpg');

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

  camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 5.6, 20000 );
  camera.position.set( 361.54240077539737, 156.87671495149928, 222.84064014519046 );

  //

  sun = new THREE.Vector3();

  // Water

  const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load( waternormals, function ( texture ) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      } ),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xff3000,
      waterColor: 0xe0e0,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
      side: THREE.DoubleSide,
      transparent: false,
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add( water );

  // Skybox

  const sky = new Sky();
  sky.scale.setScalar( 10000 );
  scene.add( sky );

  // const skyUniforms = sky.material.uniforms;
  // skyUniforms[ 'turbidity' ].value = 10;
  // skyUniforms[ 'rayleigh' ].value = 2;
  // skyUniforms[ 'mieCoefficient' ].value = 0.005;
  // skyUniforms[ 'mieDirectionalG' ].value = 0.8;

  const parameters = {
    inclination: 0.2835,    //0.3164
    azimuth: 0.2471,         //0.214
    turbidity: 0.6,         //3.5
    rayleigh: 0.772,        //0.123
    mieCoefficient: 0.067, //0.018,
    mieDirectionalG: 0.843, //0.835,
    sunColor: 0x441600,     //0xff3000
    groundColor: 0x1c1c1c,   //0x8c7ef
  };

  const pmremGenerator = new THREE.PMREMGenerator( renderer );

  function updateSun() {

    const uniforms = sky.material.uniforms;
    uniforms[ "turbidity" ].value = parameters.turbidity;
    uniforms[ "rayleigh" ].value = parameters.rayleigh;
    uniforms[ "mieCoefficient" ].value = parameters.mieCoefficient;
    uniforms[ "mieDirectionalG" ].value = parameters.mieDirectionalG;
    uniforms[ "sunColor" ].value.set( parameters.sunColor );
    uniforms[ "groundColor" ].value.set( parameters.groundColor );

    const theta = Math.PI * ( parameters.inclination - 0.5 );
    const phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

    sun.x = Math.cos( phi );
    sun.y = Math.sin( phi ) * Math.sin( theta );
    sun.z = Math.sin( phi ) * Math.cos( theta );

    uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    scene.environment = pmremGenerator.fromScene( sky ).texture;

  }

  updateSun();

  //

  const geometry = new THREE.BoxGeometry( 30, 30, 30 );
  const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  //

  controls = new OrbitControls( camera, renderer.domElement );
  // controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set( 85.34026459069244, 247.07375496107272, 2.284495622763312 );
  controls.minDistance = 4.0;
  controls.maxDistance = 20000.0;
  controls.update();

  //

  stats = new Stats();
  // container.appendChild( stats.dom );

  // GUI

  // const gui = new GUI();

  // const folderSky = gui.addFolder( 'Sky' );
  // gui.add( parameters, "turbidity", 0.0, 20.0, 0.1 ).onChange( updateSun );
  // gui.add( parameters, "rayleigh", 0.0, 4, 0.001 ).onChange( updateSun );
  // gui.add( parameters, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( updateSun );
  // gui.add( parameters, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( updateSun );
  // folderSky.add( parameters, 'inclination', 0, 0.5, 0.0001 ).onChange( updateSun );
  // folderSky.add( parameters, 'azimuth', 0, 1, 0.0001 ).onChange( updateSun );
  // gui.addColor( parameters, "sunColor" ).onChange( updateSun );
  // gui.addColor( parameters, "groundColor" ).onChange( updateSun );
  // folderSky.open();

  // const waterUniforms = water.material.uniforms;

  // const folderWater = gui.addFolder( 'Water' );
  // folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
  // folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
  // folderWater.add( waterUniforms.alpha, 'value', 0.0, 1, .001 ).name( 'alpha' );
  // folderWater.add( water.material, 'transparent' ).name( 'transparent' );
  // folderWater.open();

  // //

  // window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );
  render();
  stats.update();

}

function render() {

  const time = performance.now() * 0.001;

  mesh.position.y = Math.sin( time ) * 20 + 5;
  mesh.rotation.x = time * 0.5;
  mesh.rotation.z = time * 0.51;

  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

  renderer.render( scene, camera );

}
