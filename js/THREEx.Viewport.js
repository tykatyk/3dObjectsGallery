/** @namespace */
var THREEx = THREEx || {};

THREEx.Viewport = function () {
  let scene;
  let camera;
  let renderer;
  let controls;

  this.init = function () {
    scene = new THREE.Scene();

    const viewport = document.getElementById("viewport");
    const width = viewport.offsetWidth;

    camera = new THREE.PerspectiveCamera(
      45,
      width / window.innerHeight,
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, window.innerHeight);

    viewport.appendChild(renderer.domElement);

    // EVENTS
    THREEx.WindowResize(renderer, camera, width);

    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    addObjects();

    camera.position.set(0, 5, 30);
  };

  this.getScene = function () {
    return scene;
  };

  this.getCamera = function () {
    return camera;
  };

  this.animate = function () {
    render();
    update();
  };

  function addObjects() {
    let geometry, material, mesh, wireframe;

    //SKYBOX
    geometry = new THREE.BoxGeometry(500, 500, 500);
    material = new THREE.MeshBasicMaterial({
      color: 0x9999ff,
      side: THREE.BackSide,
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //CUBE
    geometry = new THREE.BoxGeometry();
    material = new THREE.MeshBasicMaterial({ color: 0xba1818 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0.5, 4);
    scene.add(mesh);
    // cube's wireframe
    geometry = new THREE.EdgesGeometry(mesh.geometry); // or WireframeGeometry
    material = new THREE.LineBasicMaterial({ color: 0xffffff });
    wireframe = new THREE.LineSegments(geometry, material);
    mesh.add(wireframe);

    //SPHERE
    geometry = new THREE.SphereGeometry(1, 32, 16);
    material = new THREE.MeshBasicMaterial({ color: 0xba1818 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(4, 3, -1);
    scene.add(mesh);
    // spheres's wireframe
    geometry = new THREE.EdgesGeometry(mesh.geometry);
    material = new THREE.LineBasicMaterial({ color: 0xffffff });
    wireframe = new THREE.LineSegments(geometry, material);
    mesh.add(wireframe);

    //GRID
    const grid = new THREE.GridHelper(100, 20);
    scene.add(grid);
  }

  function render() {
    renderer.render(scene, camera);
  }

  function update() {
    controls.update();
  }
};
