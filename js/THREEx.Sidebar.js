/** @namespace */
var THREEx = THREEx || {};

THREEx.Sidebar = function (viewportScene, viewportCamera) {
  this.viewportScene = viewportScene;
  this.viewportCamera = viewportCamera;
  this.scenes = [];

  let canvas;
  let renderer;
  let dragHandlers = [];

  const scope = this;

  this.init = function () {
    const sidebar = document.getElementById("sidebar");
    canvas = document.getElementById("canvas");

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    const objects = THREEx.Objects();

    objects.forEach((element) => {
      const scene = new THREE.Scene();

      const item = document.createElement("div");
      item.className = "item";

      const sceneElement = document.createElement("div");
      sceneElement.className = "itemScene";
      item.appendChild(sceneElement);

      scene.userData.element = sceneElement;

      sidebar.appendChild(item);

      const camera = new THREE.PerspectiveCamera(
        75,
        THREEx.Constants.SIDEBAR_WIDTH / THREEx.Constants.ITEM_HEIGHT,
        0.1,
        1000
      );
      camera.position.set(1, 2, 3);
      camera.lookAt(scene.position);
      scene.userData.camera = camera;

      const dragHandler = new THREEx.DragControls(
        scene,
        this.viewportScene,
        this.viewportCamera,
        sceneElement
      );

      scene.add(element);
      this.scenes.push(scene);
      dragHandlers.push(dragHandler);
    });
  };

  function updateSize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
    }
  }

  this.animate = function () {
    render();
    update();
  };

  function render() {
    updateSize();
    renderer.setClearColor(0xffffff);
    renderer.setScissorTest(false);
    renderer.clear();
    renderer.setClearColor(0xe0e0e0);
    renderer.setScissorTest(true);

    scope.scenes.forEach((scene) => {
      const element = scene.userData.element;
      const rect = element.getBoundingClientRect();

      // check if it's offscreen. If so skip it
      if (
        rect.bottom < 0 ||
        rect.top > renderer.domElement.clientHeight ||
        rect.right < 0 ||
        rect.left > renderer.domElement.clientWidth
      ) {
        return; // it's off screen
      }

      // set the viewport
      const width = rect.right - rect.left;
      const height = rect.bottom - rect.top;
      const left = rect.left;
      const bottom = renderer.domElement.clientHeight - rect.bottom;

      renderer.setViewport(left, bottom, width, height);
      renderer.setScissor(left, bottom, width, height);

      const camera = scene.userData.camera;

      renderer.render(scene, camera);
    });
  }

  function update() {
    dragHandlers.forEach((handler) => {
      handler.update();
    });
  }
};
