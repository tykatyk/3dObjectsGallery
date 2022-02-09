/** @namespace */
var THREEx = THREEx || {};

THREEx.DragControls = function (
  itemScene,
  viewportScene,
  viewportCamera,
  domElement
) {
  this.itemScene = itemScene;
  this.viewportScene = viewportScene;
  this.viewportCamera = viewportCamera;
  this.domElement = domElement;

  const states = { IDLE: -1, ACTIVE: 0, ADDED: 1 };
  const dragPosition = new THREE.Vector2();

  let state = states.IDLE;
  let object = null;

  this.update = function () {
    if (state === states.IDLE) return;
    if (dragPosition.x <= 0) return;

    const viewportWidth = document.getElementById("viewport").offsetWidth;

    const x = (dragPosition.x / viewportWidth) * 2 - 1;
    const y = -(dragPosition.y / window.innerHeight) * 2 + 1;
    const z = 0.5;

    let vectorMouse = new THREE.Vector3(x, y, z);
    vectorMouse.unproject(this.viewportCamera);
    vectorMouse.sub(this.viewportCamera.position).normalize();

    const distance = this.viewportCamera.position.z / vectorMouse.z;

    let position = new THREE.Vector3();
    position
      .copy(this.viewportCamera.position)
      .sub(vectorMouse.multiplyScalar(distance));

    if (state !== states.ADDED) {
      object = itemScene.children[0].clone();
      object.position.set(position.x, position.y, position.z);
      this.viewportScene.add(object);

      state = states.ADDED;
    }
    object.position.set(position.x, position.y, position.z);
  };

  function onMouseDown(event) {
    event.preventDefault();

    state = states.ACTIVE;

    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseup", onMouseUp, false);
  }

  function onMouseMove(event) {
    event.preventDefault();

    dragPosition.set(
      event.clientX - THREEx.Constants.SIDEBAR_WIDTH,
      event.clientY
    );
  }

  function onMouseUp(event) {
    state = states.IDLE;
    object = null;
    dragPosition.x = 0;
    dragPosition.y = 0;
    document.removeEventListener("mousemove", onMouseMove, false);
    document.removeEventListener("mouseup", onMouseUp, false);
  }

  this.domElement.addEventListener("mousedown", onMouseDown, false);
};
