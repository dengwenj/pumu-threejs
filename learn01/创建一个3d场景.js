/**
 * 场景Scene、相机Camera、渲染器Renderer三个基本概念
 * 有着三个才能在页面上看见
 */
import * as THREE from 'three'

// 创建一个三维场景
const scene = new THREE.Scene()

// 物体形状 -> 几何体 Three.js提供了各种各样的几何体API，用来表示三维物体的几何形状。
// 长方体的长宽高都是 100
const geometry = new THREE.BoxGeometry(100, 100, 100)

// 物体外观：材质Material 如果你想定义物体的外观效果，比如颜色，就需要通过材质Material相关的API实现。
// 网络基础材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
})

// 物体：网格模型Mesh
// 实际生活中有各种各样的物体，在threejs中可以通过网格模型Mesh (opens new window)表示一个虚拟的物体，比如一个箱子
const mesh = new THREE.Mesh(geometry, material)
// 设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 10, 0)

// 在threejs中创建了一个表示物体的虚拟对象Mesh，需要通过.add()方法，把网格模型mesh添加到三维场景scene中。
scene.add(mesh)

// 定义相机输出画布的尺寸
const width = 800
const height = 500
// 创建一个透视投影相机
const camera = new THREE.PerspectiveCamera(45, width / height, 100, 3000)
// 确定相机的位置
camera.position.set(200, 200, 200)
// 相机的视线，参照物，观察目标点
// camera.lookAt(0, 100, 0) // 看到Y轴上的
camera.lookAt(mesh.position) // 看到网格模型

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 设置 canvas 画布的尺寸
renderer.setSize(800, 500)
// 开始渲染，类似照相机 咔，生成画布
renderer.render(scene, camera)
// 在网页上查看
// document.body.appendChild(renderer.domElement)
document.querySelector('.test').appendChild(renderer.domElement)