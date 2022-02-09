/** @namespace */
var THREEx = THREEx || {};

THREEx.Viewport = function () {
  this.scene = null;
  this.camera = null;
  this.viewport = document.getElementById("viewport");
  this.width = this.viewport.offsetWidth;

  let renderer;
  let controls;

  const scope = this;

  this.init = function () {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / window.innerHeight,
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.width, window.innerHeight);

    this.viewport.appendChild(renderer.domElement);
    // EVENTS
    THREEx.WindowResize(renderer, this.camera, this.width);
    // CONTROLS
    controls = new THREE.OrbitControls(this.camera, renderer.domElement);

    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0.5, 4);
    this.scene.add(mesh);

    geometry = new THREE.SphereGeometry(1, 32, 16);
    material = new THREE.MeshBasicMaterial({ color: 0xba1818 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(4, 3, -1);
    this.scene.add(mesh);
    // spheres's wireframe
    geometry = new THREE.EdgesGeometry(mesh.geometry);
    material = new THREE.LineBasicMaterial({ color: 0xffffff });
    let wireframe = new THREE.LineSegments(geometry, material);
    mesh.add(wireframe);

    const grid = new THREE.GridHelper(100, 20);
    this.scene.add(grid);

    this.camera.position.set(0, 5, 15);
  };

  this.getScene = function () {
    return this.scene;
  };

  this.getCamera = function () {
    return this.camera;
  };

  this.getWidth = function () {
    return this.width;
  };

  this.animate = function () {
    render();
    update();
  };

  function render() {
    renderer.render(scope.scene, scope.camera);
  }

  function update() {
    controls.update();
  }
};
