/** @namespace */
var THREEx = THREEx || {};

THREEx.Objects = function () {
  let geometry;
  let material;
  let wireframe;
  const objects = [];

  //cube
  geometry = new THREE.BoxGeometry();
  material = new THREE.MeshBasicMaterial({ color: 0xba1818 });
  const cube = new THREE.Mesh(geometry, material);
  objects.push(cube);
  // cube's wireframe
  geometry = new THREE.EdgesGeometry(cube.geometry); // or WireframeGeometry
  material = new THREE.LineBasicMaterial({ color: 0xffffff });
  wireframe = new THREE.LineSegments(geometry, material);
  cube.add(wireframe);

  //sphere
  geometry = new THREE.SphereGeometry(1, 32, 16);
  material = new THREE.MeshBasicMaterial({ color: 0xba1818 });
  const sphere = new THREE.Mesh(geometry, material);
  objects.push(sphere);
  // sphere's wireframe
  geometry = new THREE.EdgesGeometry(sphere.geometry); // or WireframeGeometry
  material = new THREE.LineBasicMaterial({ color: 0xffffff });
  wireframe = new THREE.LineSegments(geometry, material);
  sphere.add(wireframe);

  //octahedron
  geometry = new THREE.OctahedronGeometry(1, 0);
  material = new THREE.MeshBasicMaterial({ color: 0xba1818 });
  const octahedron = new THREE.Mesh(geometry, material);
  objects.push(octahedron);
  // octahedron's wireframe
  geometry = new THREE.EdgesGeometry(octahedron.geometry); // or WireframeGeometry
  material = new THREE.LineBasicMaterial({ color: 0xffffff });
  wireframe = new THREE.LineSegments(geometry, material);
  octahedron.add(wireframe);

  return objects;
};
