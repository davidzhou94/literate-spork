function speedup() {
  rotationSpeedX *= 1.2;
  rotationSpeedY *= 1.2;
}

function slowdown() {
  rotationSpeedX /= 1.2;
  rotationSpeedY /= 1.2;
  console.log(rotationSpeedX);
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
