import * as THREE from 'three'

import Sizes from './Utils/Size';
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import assets from './Utils/assets';

import Camera from './Camera';
import Theme from './Theme'
import Renderer from './Renderer';
import World from './World/World';
import Preloader from './Preloader';
import Controls from './World/Controls';

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();


        this.preloader.on("enableControls", () => {
            this.controls = new Controls();
        })

        this.sizes.on("resize", () => {
            this.resize();
        });

        this.time.on("update", () => {
            this.update();
        });

    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
        this.world.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
        this.world.update();
        this.preloader.update();
        if (this.controls) {
            this.controls.update();
        }
    }


}