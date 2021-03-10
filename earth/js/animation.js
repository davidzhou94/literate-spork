// ------ Marker object ------------------------------------------------



function Marker() {
    THREE.Object3D.call(this);

    var radius = 0.005;
    var sphereRadius = 0.02;
    var height = 0.05;

    var material = new THREE.MeshPhongMaterial({ color: 0xbab68f });

    var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
    cone.position.y = height * 0.5;
    cone.rotation.x = Math.PI;

    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
    sphere.position.y = height * 0.95 + sphereRadius;

    this.add(cone, sphere);
}

Marker.prototype = Object.create(THREE.Object3D.prototype);

// ------ Earth object -------------------------------------------------

function Earth(radius, texture) {
    THREE.Object3D.call(this);

    this.userData.radius = radius;

    var earth = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, 64.0, 48.0),
        new THREE.MeshPhongMaterial({
            map: texture
        })
    );

    this.add(earth);
}

Earth.prototype = Object.create(THREE.Object3D.prototype);

Earth.prototype.createMarker = function (lat, lon) {
    var marker = new Marker();

    var latRad = lat * (Math.PI / 180);
    var lonRad = -lon * (Math.PI / 180);
    var r = this.userData.radius;

    marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(lonRad) * r);
    marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);

    this.add(marker);
};

// ------ Three.js code ------------------------------------------------

var scene, camera, renderer;
var controls;

init();

function init() {
    console.log("heythere")

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
    camera.position.set(0.0, 1.5, 3.0);

    renderer = new THREE.WebGLRenderer({ antialias: true });

    var width  = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);

    var sceneElement = document.getElementById('scene');
    sceneElement.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1.0;
    controls.enablePan = false;

    var ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    var direcitonal = new THREE.DirectionalLight(0xffffff, 0.5);
    direcitonal.position.set(5.0, 2.0, 5.0).normalize();
    scene.add(direcitonal);

    // just some code for the loading
    var manager = createLoader(renderer.domElement, animate);

    var texLoader = new THREE.TextureLoader(manager).setCrossOrigin(true);

    var texture = texLoader.load("images/2_no_clouds_4k.jpg");
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // var loader = new THREE.TextureLoader();
	// var texture = loader.load("images/2_no_clouds_4k.jpg")
    var earth = new Earth(1.0, texture);


    earth.createMarker(42.358056, -71.063611); // Boston
    var boston = earth.createMarker(42.3918, -71.0328); // Chelsea




    scene.add(earth);


/* Start of Drin's for clickable point*/
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove( event ) {

    	// calculate mouse position in normalized device coordinates
    	// (-1 to +1) for both components

    	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    }

    function render() {

    	// update the picking ray with the camera and mouse position
    	raycaster.setFromCamera( mouse, camera );

    	// calculate objects intersecting the picking ray
    	const intersects = raycaster.intersectObjects( scene.children );

    	for ( let i = 0; i < intersects.length; i ++ ) {

    		intersects[ i ].object.material.color.set( 0xff0000 );

    	}

    	renderer.render( scene, camera );

    }

    window.addEventListener( 'mousemove', onMouseMove, false );

    window.requestAnimationFrame(render);

    function setPickPosition(event) {
       const pos = getCanvasRelativePosition(event);
       pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
       pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
     }

    function getCanvasRelativePosition(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * canvas.width  / rect.width,
        y: (event.clientY - rect.top ) * canvas.height / rect.height,
  };
}


    window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('mouseout', clearPickPosition);


/*end of Drin's mess up*/


    window.addEventListener('resize', onResize);
    onResize();
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}
