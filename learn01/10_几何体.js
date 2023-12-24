import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()

// 长方体
// const box = new THREE.BoxGeometry(100, 100, 100)
// 球体
// const box = new THREE.SphereGeometry(50)
// 圆柱
// const box = new THREE.CylinderGeometry(20, 50, 100)
// 矩形平面
const box = new THREE.PlaneGeometry(100, 40)
// 球形平面
// const box = new THREE.CircleGeometry(50)

const m = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide
})

const mesh = new THREE.Mesh(box, m)
scene.add(mesh)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(400, 200, 300)
scene.add(pointLight)

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(-100, -200, -100)
scene.add(directionalLight)
// 平行光辅助观察
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10)
scene.add(directionalLightHelper)

// 辅助线
const axesHelper = new THREE.AxesHelper(150)
scene.add(axesHelper)

const width = innerWidth
const height = innerHeight

// 创建相机
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)

orbitControls.addEventListener('change', () => {
  renderer.render(scene, camera)
})
