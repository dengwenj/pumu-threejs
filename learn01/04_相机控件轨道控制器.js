import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景
const scene = new THREE.Scene()

// 创建网格模型材质，有些网格模型材质没有光源
const material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5
})

// 光源
const light = new THREE.PointLight(0xffffff, 1.0) // 点光源的颜色，第二个参数是光照强度
light.decay = 0.0 //设置光源不随距离衰减
light.position.set(300, 500, 200)
scene.add(light)

// 创建物体
const box = new THREE.BoxGeometry(100, 100, 100)

// 辅助线
const axes = new THREE.AxesHelper(150)
scene.add(axes)

// 创建网格模型
const mesh = new THREE.Mesh(box, material) // 放到网格模型中
// 网格模型的位置
mesh.position.set(0, 10, 0)

// 添加到场景中
scene.add(mesh)

// 创建一个透视投影相机
const camera = new THREE.PerspectiveCamera(45, 800 / 500, 1, 3000)
// 设置相机的位置
camera.position.set(200, 200, 200)
camera.lookAt(mesh.position) // 看到网格模型

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 500)
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)

/**
 * 相机控件轨道控制器 OrbitControls
 * 实现旋转缩放预览效果
 */
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.addEventListener('change', () => {
  console.log(camera.position);
  renderer.render(scene, camera)
})
