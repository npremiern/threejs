import * as THREE from './module/three.module.js';

class App {
    constructor() {

        debugger;
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGL1Renderer({ antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        //this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));

    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        //camera.position.set( 500, 800, 1300 );
        //camera.lookAt( 0, 0, 0 );
        camera.position.z = 12;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);

        const ambientLight = new THREE.AmbientLight( 0x606060 );
        this._scene.add( ambientLight );        
    }

    _setupModel() {
        const geometry = new THREE.BoxGeometry(1,1,0);
        const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151});
        const cube = new THREE.Mesh(geometry, fillMaterial);

        const lineMeterial = new THREE.LineBasicMaterial({color:0xffff00});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMeterial
        );
        const group = new THREE.Group();
        group.add(cube);
        group.add(line);
        // const geometry = new THREE.BoxGeometry(1,1,1);
        // const material = new THREE.MeshPhongMaterial({color: 0x44a88});

        // const cube = new THREE.Mesh(geometry, material);

        this._scene.add(group);


        const gridHelper = new THREE.GridHelper( 1000, 20 );
		this._scene.add( gridHelper );
        this._cube = group;
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001;  // second unit
        // 자동회전
        //this._cube.rotation.x = time;
        //this._cube.rotation.y = time;
    }
}

window.onload = function() {
    new App();
}
