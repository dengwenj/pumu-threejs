import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 创建场景
const scene = new THREE.Scene()

// 创建网格材质
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.5
})

// 光源
const pointLight = new THREE.PointLight(0xffffff, 1.0)
pointLight.position.set(300, 400, 200)
scene.add(pointLight)

// 点光源辅助观察
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
scene.add(pointLightHelper)

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

// 创建几何体
const box = new THREE.BoxGeometry(100, 100, 100)

// 创建网格模型
const mesh = new THREE.Mesh(box, material)
// 网格模型位置
mesh.position.set(0, 10, 0)

scene.add(mesh)

// 创建透视摄影相机
const camera = new THREE.PerspectiveCamera(45, 800 / 500, 1, 3000)
// 相机位置
camera.position.set(200, 200, 200)
// 相机照的参照物
camera.lookAt(mesh.position)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 500)
renderer.render(scene, camera)


// 相机控制器，旋转缩放
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.addEventListener('change', () => {
  renderer.render(scene, camera)
})

document.body.appendChild(renderer.domElement)
