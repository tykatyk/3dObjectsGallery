let sidebarRenderer;
let canvas;
let scenes = [];
let dragHandlers = [];

function sidebar(mainScene, mainCamera, viewportWidth) {
  init();
  animate();

  function init() {
    const sidebar = document.getElementById("sidebar");
    canvas = document.getElementById("canvas");

    sidebarRenderer = new THREE.WebGLRenderer({
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
        mainScene,
        mainCamera,
        viewportWidth,
        sceneElement
      );

      scene.add(element);
      scenes.push(scene);
      dragHandlers.push(dragHandler);
    });
  }

  function updateSize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      sidebarRenderer.setSize(width, height, false);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
    update();
  }

  function render() {
    updateSize();
    sidebarRenderer.setClearColor(0xffffff);
    sidebarRenderer.setScissorTest(false);
    sidebarRenderer.clear();
    sidebarRenderer.setClearColor(0xe0e0e0);
    sidebarRenderer.setScissorTest(true);

    scenes.forEach((scene) => {
      const element = scene.userData.element;
      const rect = element.getBoundingClientRect();

      // check if it's offscreen. If so skip it
      if (
        rect.bottom < 0 ||
        rect.top > sidebarRenderer.domElement.clientHeight ||
        rect.right < 0 ||
        rect.left > sidebarRenderer.domElement.clientWidth
      ) {
        return; // it's off screen
      }

      // set the viewport
      const width = rect.right - rect.left;
      const height = rect.bottom - rect.top;
      const left = rect.left;
      const bottom = sidebarRenderer.domElement.clientHeight - rect.bottom;

      sidebarRenderer.setViewport(left, bottom, width, height);
      sidebarRenderer.setScissor(left, bottom, width, height);

      const camera = scene.userData.camera;

      sidebarRenderer.render(scene, camera);
    });
  }

  function update() {
    dragHandlers.forEach((handler) => {
      handler.update();
    });
  }
}
