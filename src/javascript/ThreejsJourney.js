import gsap from "gsap";

export default class ThreejsJourney {
  constructor(_options) {
    // 配置选项
    this.config = _options.config; // 配置
    this.time = _options.time; // 时间管理
    this.world = _options.world; // 世界对象

    // 设置初始化
    this.$container = document.querySelector(".js-threejs-journey"); // 主容器
    this.$messages = [...this.$container.querySelectorAll(".js-message")]; // 消息元素
    this.$yes = this.$container.querySelector(".js-yes"); // "是"按钮
    this.$no = this.$container.querySelector(".js-no"); // "否"按钮
    this.step = 0; // 当前步骤
    this.maxStep = this.$messages.length - 1; // 最大步骤数
    this.seenCount =
      window.localStorage.getItem("threejsJourneySeenCount") || 0; // 已查看次数
    this.seenCount = parseInt(this.seenCount);
    this.shown = false; // 是否已显示
    this.traveledDistance = 0; // 累计移动距离
    this.minTraveledDistance =
      (this.config.debug ? 5 : 75) * (this.seenCount + 1); // 触发显示的最小距离
    this.prevent = !!window.localStorage.getItem("threejsJourneyPrevent"); // 是否禁止显示

    if (this.config.debug) this.start(); // 调试模式下直接开始

    if (this.prevent) return; // 如果禁止显示，则退出

    this.setYesNo(); // 设置"是/否"按钮事件
    this.setLog(); // 设置日志输出

    this.time.on("tick", () => {
      if (this.world.physics) {
        this.traveledDistance += this.world.physics.car.forwardSpeed; // 更新移动距离

        // 如果满足条件且未显示，则开始动画
        if (
          !this.config.touch &&
          !this.shown &&
          this.traveledDistance > this.minTraveledDistance
        ) {
          this.start();
        }
      }
    });
  }

  setYesNo() {
    // 点击事件
    this.$yes.addEventListener("click", () => {
      gsap.delayedCall(2, () => {
        this.hide(); // 延迟2秒隐藏
      });
      window.localStorage.setItem("threejsJourneyPrevent", 1); // 设置本地存储，防止再次显示
    });

    this.$no.addEventListener("click", () => {
      this.next(); // 切换到下一步

      gsap.delayedCall(5, () => {
        this.hide(); // 延迟5秒隐藏
      });
    });

    // 悬停事件
    this.$yes.addEventListener("mouseenter", () => {
      this.$container.classList.remove("is-hover-none");
      this.$container.classList.remove("is-hover-no");
      this.$container.classList.add("is-hover-yes"); // 添加"悬停在是按钮"样式
    });

    this.$no.addEventListener("mouseenter", () => {
      this.$container.classList.remove("is-hover-none");
      this.$container.classList.add("is-hover-no"); // 添加"悬停在否按钮"样式
      this.$container.classList.remove("is-hover-yes");
    });

    this.$yes.addEventListener("mouseleave", () => {
      this.$container.classList.add("is-hover-none"); // 添加"未悬停"样式
      this.$container.classList.remove("is-hover-no");
      this.$container.classList.remove("is-hover-yes");
    });

    this.$no.addEventListener("mouseleave", () => {
      this.$container.classList.add("is-hover-none"); // 添加"未悬停"样式
      this.$container.classList.remove("is-hover-no");
      this.$container.classList.remove("is-hover-yes");
    });
  }

  setLog() {
    // 可选：输出日志的图案信息
    //         console.log(
    //             `%c
    // ▶ ...
    // `,
    //             'color: #705df2;'
    //         )
  }

  hide() {
    for (const _$message of this.$messages) {
      _$message.classList.remove("is-visible"); // 隐藏消息
    }

    gsap.delayedCall(0.5, () => {
      this.$container.classList.remove("is-active"); // 移除激活状态
    });
  }

  start() {
    this.$container.classList.add("is-active"); // 激活容器

    window.requestAnimationFrame(() => {
      this.next(); // 切换到下一步

      // 自动播放消息切换
      gsap.delayedCall(4, () => {
        this.next();
      });
      gsap.delayedCall(7, () => {
        this.next();
      });
    });

    this.shown = true; // 标记已显示

    window.localStorage.setItem(
      "threejsJourneySeenCount",
      this.seenCount + 1
    ); // 更新本地存储已查看次数
  }

  updateMessages() {
    let i = 0;

    // 设置消息可见性
    for (const _$message of this.$messages) {
      if (i < this.step) _$message.classList.add("is-visible"); // 显示当前步骤的消息

      i++;
    }

    // 设置消息位置
    this.$messages.reverse(); // 反转消息顺序

    let height = 0;
    i = this.maxStep;
    for (const _$message of this.$messages) {
      const messageHeight = _$message.offsetHeight; // 获取消息高度
      if (i < this.step) {
        _$message.style.transform = `translateY(${-height}px)`; // 设置位移
        height += messageHeight + 20;
      } else {
        _$message.style.transform = `translateY(${messageHeight}px)`; // 设置偏移
      }

      i--;
    }

    this.$messages.reverse(); // 恢复消息顺序
  }

  next() {
    if (this.step > this.maxStep) return; // 如果超过最大步骤数，则退出

    this.step++; // 增加当前步骤

    this.updateMessages(); // 更新消息状态
  }
}
