import * as THREE from 'three'
import * as dat from 'dat.gui'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import World from './World/index.js'
import Resources from './Resources.js'
import Camera from './Camera.js'
import ThreejsJourney from './ThreejsJourney.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import BlurPass from './Passes/Blur.js'
import GlowsPass from './Passes/Glows.js'

export default class Application
{
    /**
     * 构造函数
     */
    constructor(_options)
    {
        // 选项
        this.$canvas = _options.$canvas

        // 初始化
        this.time = new Time() // 时间管理器
        this.sizes = new Sizes() // 尺寸管理
        this.resources = new Resources() // 资源管理

        this.setConfig() // 配置设置
        this.setDebug() // 调试设置
        this.setRenderer() // 渲染器设置
        this.setCamera() // 摄像机设置
        this.setPasses() // 后处理设置
        this.setWorld() // 场景世界设置
        this.setTitle() // 动态标题设置
        this.setThreejsJourney() // Three.js交互设置
    }

    /**
     * 设置配置
     */
    setConfig()
    {
        this.config = {}
        this.config.debug = window.location.hash === '#debug' // 是否启用调试模式
        this.config.cyberTruck = window.location.hash === '#cybertruck' // 是否启用赛博卡车模型
        this.config.touch = false // 触摸模式标志

        // 监听触摸事件
        window.addEventListener('touchstart', () =>
        {
            this.config.touch = true
            this.world.controls.setTouch() // 启用触摸控制

            // 调整模糊效果强度
            this.passes.horizontalBlurPass.strength = 1
            this.passes.horizontalBlurPass.material.uniforms.uStrength.value = new THREE.Vector2(this.passes.horizontalBlurPass.strength, 0)
            this.passes.verticalBlurPass.strength = 1
            this.passes.verticalBlurPass.material.uniforms.uStrength.value = new THREE.Vector2(0, this.passes.verticalBlurPass.strength)
        }, { once: true })
    }

    /**
     * 设置调试工具
     */
    setDebug()
    {
        if(this.config.debug)
        {
            this.debug = new dat.GUI({ width: 420 }) // 调试面板
        }
    }

    /**
     * 设置渲染器
     */
    setRenderer()
    {
        // 创建场景
        this.scene = new THREE.Scene()

        // 初始化渲染器
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.$canvas, // 绑定的画布
            alpha: true, // 启用透明背景
            powerPreference: 'high-performance' // 优先使用高性能模式
        })
        this.renderer.setClearColor(0x000000, 1) // 设置背景颜色为黑色
        this.renderer.setPixelRatio(2) // 设置像素比
        this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height) // 设置渲染尺寸
        this.renderer.autoClear = false // 禁用自动清除渲染

        // 响应窗口大小调整
        this.sizes.on('resize', () =>
        {
            this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
        })
    }

    /**
     * 设置摄像机
     */
    setCamera()
    {
        this.camera = new Camera({
            time: this.time,
            sizes: this.sizes,
            renderer: this.renderer,
            debug: this.debug,
            config: this.config
        })

        this.scene.add(this.camera.container) // 将摄像机添加到场景

        this.time.on('tick', () =>
        {
            // 如果世界中存在车辆，则设置摄像机目标为车辆位置
            if(this.world && this.world.car)
            {
                this.camera.target.x = this.world.car.chassis.object.position.x
                this.camera.target.y = this.world.car.chassis.object.position.y
            }
        })
    }

    /**
     * 设置后处理效果
     */
    setPasses()
    {
        this.passes = {}

        // 调试工具
        if(this.debug)
        {
            this.passes.debugFolder = this.debug.addFolder('postprocess') // 后处理调试文件夹
        }

        // 创建后处理器
        this.passes.composer = new EffectComposer(this.renderer)

        // 渲染通道
        this.passes.renderPass = new RenderPass(this.scene, this.camera.instance)

        // 水平方向模糊效果
        this.passes.horizontalBlurPass = new ShaderPass(BlurPass)
        this.passes.horizontalBlurPass.strength = this.config.touch ? 0 : 1
        this.passes.horizontalBlurPass.material.uniforms.uResolution.value = new THREE.Vector2(this.sizes.viewport.width, this.sizes.viewport.height)
        this.passes.horizontalBlurPass.material.uniforms.uStrength.value = new THREE.Vector2(this.passes.horizontalBlurPass.strength, 0)

        // 垂直方向模糊效果
        this.passes.verticalBlurPass = new ShaderPass(BlurPass)
        this.passes.verticalBlurPass.strength = this.config.touch ? 0 : 1
        this.passes.verticalBlurPass.material.uniforms.uResolution.value = new THREE.Vector2(this.sizes.viewport.width, this.sizes.viewport.height)
        this.passes.verticalBlurPass.material.uniforms.uStrength.value = new THREE.Vector2(0, this.passes.verticalBlurPass.strength)

        // 调试模糊效果
        if(this.debug)
        {
            const folder = this.passes.debugFolder.addFolder('blur') // 模糊调试文件夹
            folder.open()

            folder.add(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, 'x').step(0.001).min(0).max(10)
            folder.add(this.passes.verticalBlurPass.material.uniforms.uStrength.value, 'y').step(0.001).min(0).max(10)
        }

        // 发光效果
        this.passes.glowsPass = new ShaderPass(GlowsPass)
        this.passes.glowsPass.color = '#ffcfe0' // 发光颜色
        this.passes.glowsPass.material.uniforms.uPosition.value = new THREE.Vector2(0, 0.25) // 发光位置
        this.passes.glowsPass.material.uniforms.uRadius.value = 0.7 // 发光半径
        this.passes.glowsPass.material.uniforms.uColor.value = new THREE.Color(this.passes.glowsPass.color)
        this.passes.glowsPass.material.uniforms.uColor.value.convertLinearToSRGB()
        this.passes.glowsPass.material.uniforms.uAlpha.value = 0.55 // 发光透明度

        // 调试发光效果
        if(this.debug)
        {
            const folder = this.passes.debugFolder.addFolder('glows') // 发光调试文件夹
            folder.open()

            folder.add(this.passes.glowsPass.material.uniforms.uPosition.value, 'x').step(0.001).min(- 1).max(2).name('positionX')
            folder.add(this.passes.glowsPass.material.uniforms.uPosition.value, 'y').step(0.001).min(- 1).max(2).name('positionY')
            folder.add(this.passes.glowsPass.material.uniforms.uRadius, 'value').step(0.001).min(0).max(2).name('radius')
            folder.addColor(this.passes.glowsPass, 'color').name('color').onChange(() =>
            {
                this.passes.glowsPass.material.uniforms.uColor.value = new THREE.Color(this.passes.glowsPass.color)
            })
            folder.add(this.passes.glowsPass.material.uniforms.uAlpha, 'value').step(0.001).min(0).max(1).name('alpha')
        }

        // 添加后处理效果
        this.passes.composer.addPass(this.passes.renderPass)
        this.passes.composer.addPass(this.passes.horizontalBlurPass)
        this.passes.composer.addPass(this.passes.verticalBlurPass)
        this.passes.composer.addPass(this.passes.glowsPass)

        // 每帧渲染
        this.time.on('tick', () =>
        {
            // 根据模糊强度启用或禁用模糊效果
            this.passes.horizontalBlurPass.enabled = this.passes.horizontalBlurPass.material.uniforms.uStrength.value.x > 0
            this.passes.verticalBlurPass.enabled = this.passes.verticalBlurPass.material.uniforms.uStrength.value.y > 0

            // 渲染后处理
            this.passes.composer.render()
        })

        // 响应窗口调整大小
        this.sizes.on('resize', () =>
        {
            this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
            this.passes.composer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
            this.passes.horizontalBlurPass.material.uniforms.uResolution.value.x = this.sizes.viewport.width
            this.passes.horizontalBlurPass.material.uniforms.uResolution.value.y = this.sizes.viewport.height
            this.passes.verticalBlurPass.material.uniforms.uResolution.value.x = this.sizes.viewport.width
            this.passes.verticalBlurPass.material.uniforms.uResolution.value.y = this.sizes.viewport.height
        })
    }

    /**
     * 设置场景世界
     */
    setWorld()
    {
        this.world = new World({
            config: this.config,
            debug: this.debug,
            resources: this.resources,
            time: this.time,
            sizes: this.sizes,
            camera: this.camera,
            scene: this.scene,
            renderer: this.renderer,
            passes: this.passes
        })
        this.scene.add(this.world.container)
    }

    /**
     * 设置动态标题
     */
    setTitle()
    {
        this.title = {}
        this.title.frequency = 300 // 更新频率
        this.title.width = 20 // 标题宽度
        this.title.position = 0 // 当前位置
        this.title.$element = document.querySelector('title') // 标题元素
        this.title.absolutePosition = Math.round(this.title.width * 0.25) // 初始绝对位置

        // 每帧更新标题位置
        this.time.on('tick', () =>
        {
            if(this.world.physics)
            {
                this.title.absolutePosition += this.world.physics.car.forwardSpeed

                if(this.title.absolutePosition < 0)
                {
                    this.title.absolutePosition = 0
                }
            }
        })

        // 定时更新标题内容
        window.setInterval(() =>
        {
            this.title.position = Math.round(this.title.absolutePosition % this.title.width)

            document.title = `${'_'.repeat(this.title.width - this.title.position)}🚗${'_'.repeat(this.title.position)}`
        }, this.title.frequency)
    }

    /**
     * 设置Three.js交互模块
     */
    setThreejsJourney()
    {
        this.threejsJourney = new ThreejsJourney({
            config: this.config,
            time: this.time,
            world: this.world
        })
    }

    /**
     * 销毁函数
     */
    destructor()
    {
        this.time.off('tick') // 移除时间监听
        this.sizes.off('resize') // 移除尺寸监听

        this.camera.orbitControls.dispose() // 释放摄像机控制
        this.renderer.dispose() // 释放渲染器资源
        this.debug.destroy() // 销毁调试工具
    }
}
