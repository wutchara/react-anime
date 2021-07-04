import React, { Component } from "react";

import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';

class SecondDemo extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();

    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#263238");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //add Camera
    this.camera = this.createCamera(width, height);
    // Change camera position
    this.camera.position.x = 7;
    this.camera.position.y = 7;
    this.camera.position.z = 7;
    //Camera Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    console.log('controls', controls);

    //LIGHTS
    var lights = this.createLights();
    this.scene.add(...lights);

    this.cube = this.createCube(5);
    this.addTexture(this.cube);
    this.scene.add(this.cube);

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);

    //Loading 3d Models
    this.loadStaticObjectFile();

    //ADD Your 3D Models here
    this.renderScene();

    //start animation
    this.start();
  }

  loadStaticObjectFile() {
    var mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl("./assets/");
    mtlLoader.load("Handgun_obj.mtl", materials => {
      materials.preload();
      console.log("Material loaded", materials);
      //Load Object Now and Set Material
      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load("./assets/Handgun_obj.obj",
        object => {
          this.freedomMesh = object;
          this.freedomMesh.position.setY(3); //or  this
          // this.freedomMesh.scale.set(0.02, 0.02, 0.02);
          this.scene.add(this.freedomMesh);
        },
        xhr => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        error => {
          console.log("An error happened" + error);
        });
    });
  }

  createCamera = (width, height) => {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 5;

    return camera;
  }

  createLights = () => {
    var lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0); // #304ffe
    lights[1] = new THREE.PointLight(0xffffff, 1, 0); // #ffffff
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    return lights;
  }

  createCube = (size) => {
    // Add example Box
    const bufferCubegeometry = new THREE.BoxBufferGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00, // #ffff00
      // wireframe: true // display wireframe
    });
    return new THREE.Mesh(bufferCubegeometry, material);
  }

  addTexture = (cube) => {
    //LOAD texture from Web and on completion apply it on SPHERE
    new THREE.TextureLoader().load("https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      texture => {
        //Update Texture
        console.log("Load texture successfully");
        cube.material.map = texture;
        cube.material.needsUpdate = true;
      },
      xhr => {
        //Download Progress
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      error => {
        //Error CallBack
        console.log("An error happened" + error);
      }
    );
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    //Animate Models Here
    //ReDraw Scene with Camera and Scene Object

    //Rotate Models
    // if (this.cube) this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (<div
      style={{ width: "800px", height: "800px" }}
      ref={mount => { this.mount = mount }}
    />)
  }
}

export default SecondDemo;