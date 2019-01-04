import * as THREE from "three"
import "three/GLTFLoader"

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, 800 / 800, 0.1, 1000)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 50
camera.lookAt(scene.position)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 800)
renderer.setPixelRatio(1)
renderer.setClearColor(0xabcdef)


/*
const geometry = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16)
// geometry = new THREE.EdgesGeometry( geometry );
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
*/

const loader = new THREE.GLTFLoader().setPath( '/assets/earth-1/' );

let earth
loader.load('scene.gltf', (gltf) => {
  earth = window.earth = gltf.scene.children[0]
  // earth.scale.set(0.07, 0.07, 0.07)
  earth.scale.set(20, 20, 20)
  scene.add(gltf.scene)
})

const spot = new THREE.SpotLight(0xffffff)
spot.position.set(10, 10, 100)
spot.lookAt(scene.position)
scene.add(spot)

const render = () => {
  if (earth) {
    earth.rotation.z += 0.01
  }
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

document.body.appendChild(renderer.domElement)