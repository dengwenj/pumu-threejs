import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * 透视投影相机的投影规律是远小近大
 * fov 改变，增加相机视角 fov, 视椎体范围更大
 */

const scene = new THREE.Scene()

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5
})

// 点光源
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(200, 500, 300)
scene.add(pointLight)

const box = new THREE.BoxGeometry(100, 100, 100)

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const mesh = new THREE.Mesh(box, material)
    mesh.position.set(i * 200, 0, j * 200)
    scene.add(mesh)
  }
}

const width = innerWidth
const height = innerHeight
// 创建透视投影相机，视椎体
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 8000)
camera.position.set(2000, 2000, 2000)
// camera.lookAt(0, 0, 0)
camera.lookAt(1000, 0, 1000)
// 注意相机控件OrbitControls会影响lookAt设置，注意手动设置OrbitControls的目标参数

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)
// 注意相机控件OrbitControls会影响lookAt设置，注意手动设置OrbitControls的目标参数
orbitControls.target.set(1000, 0, 1000)
orbitControls.addEventListener('change', () => {
  renderer.render(scene, camera)
})
