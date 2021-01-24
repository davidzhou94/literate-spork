var scene = new THREE.Scene();
// https://htmlcolorcodes.com/
scene.background = new THREE.Color(0x72b9ea)

var sceneElement = document.getElementById('scene');

var width  = window.innerWidth;
var height = window.innerHeight;

var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 50);
camera.position.z = 20;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
sceneElement.appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(200, 0, 200);
scene.add(light);

scene.add(new THREE.AmbientLight(0x333333));

var sphere = createEarthSphere();
sphere.rotation.x = 0.58;
scene.add(sphere)

var rotationSpeedY=0.002;

// https://www.w3schools.com/jsref/met_element_addeventlistener.asp
window.addEventListener('resize', onResize, false);

animate();

function animate() {
	requestAnimationFrame(animate);
  sphere.rotation.y += rotationSpeedY;
	renderer.render(scene, camera);
}

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function createEarthSphere() {
	var geometry = new THREE.SphereGeometry(9, 32, 32);
	var loader = new THREE.TextureLoader();
	var texture = loader.load("images/2_no_clouds_4k.jpg")
	var meshMaterial = new THREE.MeshPhongMaterial({map: texture});

	return new THREE.Mesh(geometry, meshMaterial)
}

function speedup() {
  rotationSpeedY *= 1.2;
}

function slowdown() {
  rotationSpeedY /= 1.2;
}

function tiltUp() {
	sphere.rotation.x += 0.02
}

function tiltDown() {
	sphere.rotation.x -= 0.02
}

function zoomin() {
  if (camera.position.z > 15){
    camera.position.z -= 5;
  }
}

function zoomout() {
  if (camera.position.z < 55){
  camera.position.z += 5;
  }
}
