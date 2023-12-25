import { 
  AmbientLight, 
  AxesHelper, 
  BoxGeometry, 
  DirectionalLight, 
  DirectionalLightHelper, 
  Mesh, 
  MeshLambertMaterial, 
  PerspectiveCamera, 
  PointLight, 
  PointLightHelper, 
  Scene, 
  WebGLRenderer 
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

/**
 * 计算渲染帧率FPS
 */
const stats = new Stats()
document.body.appendChild(stats.domElement)

// 创建场景
const scene = new Scene()

// 创建网格材质，有光材质
const material = new MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5
})

// 创建几何体
const box = new BoxGeometry(100, 100, 100)

// 创建网格
const mesh = new Mesh(box, material)
// 网格位置
mesh.position.set(0, 10, 0)
// 添加到场景
scene.add(mesh)

// 创建点光源
const pointLight = new PointLight(0xffffff, 1)
// 点光源位置
pointLight.position.set(200, 300, 100)
// 添加到场景
scene.add(pointLight)

// 创建点光源辅助
const pointLightH = new PointLightHelper(pointLight, 10)
scene.add(pointLightH)

// 创建辅助线 xyz
const axes = new AxesHelper(200)
// 添加到场景
scene.add(axes)

// 创建平行光
const directional = new DirectionalLight(0xffffff, 1)
directional.position.set(-100, -200, -100)
scene.add(directional)

// 创建平行光辅助
const directionalH = new DirectionalLightHelper(directional, 10, 0xff00ff)
scene.add(directionalH)

// 创建环境光
const ambient = new AmbientLight(0xffffff, 0.3)
ambient.position.set(0, 200, 100)
scene.add(ambient)

const width = innerWidth
const height = innerHeight
// 创建透明投影相机
const camera = new PerspectiveCamera(45, width / height, 1, 3000)
// 相机位置
camera.position.set(200, 200, 200)
// 参照物
camera.lookAt(0, 10, 0)

// 创建渲染器
const renderer = new WebGLRenderer()
renderer.setSize(width, height)
// renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)

function render() {
  stats.update()
  box.rotateY(0.01)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

// 相机监控器 旋转，缩放
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.target.set(0, 10, 0)
orbitControls.addEventListener('change', () => {
  // renderer.render(scene, camera)
})
