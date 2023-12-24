import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

/**
 * 计算渲染帧率FPS
 */
const stats = new Stats()
document.body.appendChild(stats.domElement)

// 创建场景
const scene = new THREE.Scene()

// 创建网格材质
const material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5
})

// test
for (let i = 0; i < 1000; i++) {
  const box = new THREE.BoxGeometry(5, 5, 5)
  const m = new THREE.MeshLambertMaterial({
    color: 0xff0000
  })
  const mesh = new THREE.Mesh(box, m)
  const x = Math.random() * 100
  const y = Math.random() * 100
  const z = Math.random() * 100
  mesh.position.set(x, y, z)
  scene.add(mesh)
}

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
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000)
// 相机位置
camera.position.set(200, 200, 200)
// 相机照的参照物
camera.lookAt(mesh.position)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.render(scene, camera)

const clock = new THREE.Clock()
// 实现周期性循环执行
function render() {
  stats.update()
  const spt = clock.getDelta() * 1000
  console.log(spt, 'sptspt')
  // 渲染帧率
  console.log('渲染帧率', 1000 / spt)
  mesh.rotateY(0.01)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

// 相机控制器，旋转缩放
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.addEventListener('change', () => {
  // renderer.render(scene, camera)
})

document.body.appendChild(renderer.domElement)
