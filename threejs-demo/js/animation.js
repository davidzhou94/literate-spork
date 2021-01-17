var scene = new THREE.Scene();
// https://htmlcolorcodes.com/
scene.background = new THREE.Color(0x72b9ea)

var sceneElement = document.getElementById('scene');

var width  = window.innerWidth;
var height = window.innerHeight;

var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 50);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
sceneElement.appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(100, 0, 200);
scene.add(light);

var geometry = new THREE.SphereGeometry(9, 32, 16);

var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
var meshMaterial = new THREE.MeshPhongMaterial({ color: 0xea727d, emissive: 0x582b2f, side: THREE.DoubleSide, flatShading: true });

var sphere = new THREE.Group();

sphere.add(new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial));
sphere.add(new THREE.Mesh(geometry, meshMaterial));

scene.add(sphere);

// https://www.w3schools.com/jsref/met_element_addeventlistener.asp
window.addEventListener('resize', onResize, false);

animate();

function animate() {
	requestAnimationFrame(animate);

  sphere.rotation.x += 0.008;
  sphere.rotation.y += 0.004;

	renderer.render(scene, camera);
}

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
