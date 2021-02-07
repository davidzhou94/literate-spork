class Settings {
	// https://htmlcolorcodes.com/
	static backgroundColor = 0x72b9ea;
	static lightColor = 0xffffff;
	static ambientLightColor = 0x333333;
	static pointColor = 0xff0000;

	static earthRadius = 1;
	static pointRadius = 0.01;
	static rotationSpeedY = 0.002;
	static rotationX = 0.58;
	static rotationY = 0;
	static cameraZ = 3;

	static newFrame() {
		Settings.rotationY += Settings.rotationSpeedY
	}
}

var camera = createCamera();
var renderer = createRenderer();
var scene = createSceneWithLighting();

var sphereGroup = new THREE.Group();
sphereGroup.add(createEarthSphere());
sphereGroup.add(createPoint(42.34, -71.04)); // Boston
scene.add(sphereGroup);

// https://www.w3schools.com/jsref/met_element_addeventlistener.asp
window.addEventListener('resize', onResize, false);

animate();

function animate() {
	requestAnimationFrame(animate);
	Settings.newFrame();
	sphereGroup.rotation.y = Settings.rotationY;
	sphereGroup.rotation.x = Settings.rotationX;
	camera.position.z = Settings.cameraZ;
	renderer.render(scene, camera);
}

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function createRenderer() {
	let renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('scene').appendChild(renderer.domElement);
	return renderer;
}

function createCamera() {
	let aspectRatio = window.innerWidth / window.innerHeight;
	var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 50);
	camera.position.z = Settings.cameraZ;
	return camera;
}

function createSceneWithLighting() {
	let scene = new THREE.Scene();
	scene.background = new THREE.Color(Settings.backgroundColor);
	var light = new THREE.DirectionalLight(Settings.lightColor, 1);
	light.position.set(200, 0, 200);
	scene.add(light);
	scene.add(new THREE.AmbientLight(Settings.ambientLightColor));
	return scene;
}

function createEarthSphere() {
	var geometry = new THREE.SphereGeometry(1, 32, 32);
	var loader = new THREE.TextureLoader();
	var texture = loader.load("images/2_no_clouds_4k.jpg")
	var meshMaterial = new THREE.MeshPhongMaterial({map: texture});

	return new THREE.Mesh(geometry, meshMaterial)
}

function createPoint(latitude, longitude) {
	let sphere = new THREE.SphereGeometry(0.01, 9, 9);
	let {x, y, z} = geoCoordinateToXyz(latitude, longitude);
	sphere.translate(x, y, z);
	let pointMaterial = new THREE.MeshBasicMaterial({color: Settings.pointColor});
	return new THREE.Mesh(sphere, pointMaterial);
}

function geoCoordinateToXyz(latitude, longitude) {
	const globeRadius = 1 + 0.005
	longitude = -1 * (longitude * Math.PI) / 180;
	latitude = (latitude * Math.PI) / 180;
	const radius = Math.cos(latitude) * globeRadius;

	return {
		x: Math.cos(longitude) * radius,
		y: Math.sin(latitude) * globeRadius,
		z: Math.sin(longitude) * radius
	};
}

function addPointToGlobe(latitude, longitude) {
	sphereGroup.add(createPoint(latitude, longitude));
}
