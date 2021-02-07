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
	var texture = loader.load("images/2_no_clouds_4k.jpg");
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

// ------ Marker object ------------------------------------------------

function Marker() {
    THREE.Object3D.call(this);

    var radius = 0.05;
    var sphereRadius = 0.2;
    var height = 0.2;

    var material = new THREE.MeshPhongMaterial({ color: 0xbab68f });

    var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
    cone.position.y = height * 0.5;
    cone.rotation.x = Math.PI;

    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
    sphere.position.y = height * 0.95 + sphereRadius;

    this.add(cone, sphere);
}

Marker.prototype = Object.create(THREE.Object3D.prototype);

// ------ Earth marker -------------------------------------------------

 function createMarker (lat, lon) {
    var marker = new Marker();

    var latRad = lat * (Math.PI / 180);
    var lonRad = -lon * (Math.PI / 180);
//radius of MY earth----------------------------------------------------/
    var r = 9;

    marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(lonRad) * r);
    marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);

    scene.add(marker);
};

    createMarker(42.358056, -71.063611); // Boston
