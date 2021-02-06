function speedup() {
  Settings.rotationSpeedY *= 1.2;
}

function slowdown() {
  Settings.rotationSpeedY /= 1.2;
}

function tiltUp() {
	Settings.rotationX += 0.02
}

function tiltDown() {
	Settings.rotationX -= 0.02
}

function zoomin() {
  if (Settings.cameraZ > 1) {
    Settings.cameraZ -= 0.2;
  }
}

function zoomout() {
  if (Settings.cameraZ < 5) {
    Settings.cameraZ += 0.2;
  }
}
