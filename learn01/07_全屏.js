import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 创建场景
const scene = new THREE.Scene()

// 创建网格光源材质
const material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5
})

// 创建光源
const pointLight = new THREE.PointLight(0xffffff, 1.0)
pointLight.position.set(300, 400, 200)
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
scene.add(pointLightHelper)

// 辅助线
const axesHelper = new THREE.AxesHelper(150)
scene.add(axesHelper)

// 创建几何体
const box = new THREE.BoxGeometry(100, 100, 100)

// 创建网格
const mesh = new THREE.Mesh(box, material)
// 网格位置
mesh.position.set(0, 10, 0)

// 添加至场景
scene.add(mesh)

// 动态设置画布宽高
const width = window.innerWidth
const height = window.innerHeight

// 创建透明投影相机
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000)
// 相机的位置
camera.position.set(200, 200, 200)
// 参照物
camera.lookAt(mesh.position)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)

orbitControls.addEventListener('change', () => {
  renderer.render(scene, camera)
})

// 视口发生变化
window.onresize = function() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}