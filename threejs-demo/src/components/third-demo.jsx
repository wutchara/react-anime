import React, { Component } from "react";

import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';

// https://threejsfundamentals.org/threejs/lessons/threejs-lights.html
// https://threejsfundamentals.org/threejs/lessons/threejs-load-obj.html

class ThridDemo extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('black');

    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#263238");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //add Camera
    this.camera = this.createCamera(width, height);
    // Change camera position
    this.camera.position.set(10, 10, 20);

    //Camera Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
    console.log('controls', controls);

    // load the platform
    {
      const planeSize = 40;
      const loader = new THREE.TextureLoader();
      const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      const repeats = planeSize / 2;
      texture.repeat.set(repeats, repeats);

      const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -.5;
      this.scene.add(mesh);
    }

    //LIGHTS
    this.createBlueLight();
    this.createDirectionLight();

    // Load object
    this.createObject();

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);

    this.renderScene();

    //start animation
    this.start();
  }

  createObject = () => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl("./assets/windmill/");
    mtlLoader.load('windmill.mtl', (mtl) => {
      mtl.preload();
      console.log('mtl', mtl);
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load('./assets/windmill/windmill.obj', (root) => {
        this.scene.add(root);
      }, xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }, error => { // called when loading has errors
        console.log("An error happened" + error);
      });
    }, xhr => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    }, error => { // called when loading has errors
      console.log("An error happened" + error);
    });
  }

  createBlueLight = () => {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    this.scene.add(light);
  }

  createDirectionLight = () => {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    this.scene.add(light);
    this.scene.add(light.target);
  }

  createCamera = (width, height) => {
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 20);

    return camera;
  }

  resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  renderScene = () => {
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  animate = () => {
    //Animate Models Here
    //ReDraw Scene with Camera and Scene Object

    //Rotate Models
    // if (this.cube) this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  render() {
    return (<div
      style={{ width: "800px", height: "800px" }}
      ref={mount => { this.mount = mount }}
    />)
  }
}

export default ThridDemo;