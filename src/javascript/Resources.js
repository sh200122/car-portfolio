import * as THREE from "three";
import Loader from "./Utils/Loader.js";
import EventEmitter from "./Utils/EventEmitter.js";

export default class Resources extends EventEmitter {
  constructor() {
    super();

    this.loader = new Loader(); // 初始化加载器
    this.items = {}; // 存储加载的资源

    this.loader.load([
      // Matcaps 材质贴图
      {
        name: "matcapBeige",
        source: "./models/matcaps/beige.png",
        type: "texture", // 纹理类型
      },
      {
        name: "matcapBlack",
        source: "./models/matcaps/black.png",
        type: "texture",
      },
      {
        name: "matcapOrange",
        source: "./models/matcaps/orange.png",
        type: "texture",
      },
      {
        name: "matcapRed",
        source: "./models/matcaps/red.png",
        type: "texture",
      },
      {
        name: "matcapWhite",
        source: "./models/matcaps/white.png",
        type: "texture",
      },
      {
        name: "matcapGreen",
        source: "./models/matcaps/green.png",
        type: "texture",
      },
      {
        name: "matcapBrown",
        source: "./models/matcaps/brown.png",
        type: "texture",
      },
      {
        name: "matcapGray",
        source: "./models/matcaps/gray.png",
        type: "texture",
      },
      {
        name: "matcapEmeraldGreen",
        source: "./models/matcaps/emeraldGreen.png",
        type: "texture",
      },
      {
        name: "matcapPurple",
        source: "./models/matcaps/purple.png",
        type: "texture",
      },
      {
        name: "matcapBlue",
        source: "./models/matcaps/blue.png",
        type: "texture",
      },
      {
        name: "matcapYellow",
        source: "./models/matcaps/yellow.png",
        type: "texture",
      },
      {
        name: "matcapMetal",
        source: "./models/matcaps/metal.png",
        type: "texture",
      },
      // Intro 场景资源
      { name: "introStaticBase", source: "./models/intro/static/base.glb" },
      {
        name: "introStaticCollision",
        source: "./models/intro/static/collision.glb",
      },
      {
        name: "introStaticFloorShadow",
        source: "./models/intro/static/floorShadow.png",
        type: "texture",
      },
      {
        name: "introInstructionsLabels",
        source: "./models/intro/instructions/labels.glb",
      },
      {
        name: "introInstructionsArrows",
        source: "./models/intro/instructions/arrows.png",
        type: "texture",
      },
      {
        name: "introInstructionsControls",
        source: "./models/intro/instructions/controls.png",
        type: "texture",
      },
      {
        name: "introInstructionsOther",
        source: "./models/intro/instructions/other.png",
        type: "texture",
      },
      { name: "introArrowKeyBase", source: "./models/intro/arrowKey/base.glb" },
      {
        name: "introArrowKeyCollision",
        source: "./models/intro/arrowKey/collision.glb",
      },

      {
        name: "introCreativeCollision",
        source: "./models/intro/creative/collision.glb",
      },
      { name: "introDevBase", source: "./models/intro/dev/base.glb" },
      { name: "introDevCollision", source: "./models/intro/dev/collision.glb" },
      {
        name: "crossroadsStaticBase",
        source: "./models/crossroads/static/base.glb",
      },
      {
        name: "crossroadsStaticCollision",
        source: "./models/crossroads/static/collision.glb",
      },
      {
        name: "crossroadsStaticFloorShadow",
        source: "./models/crossroads/static/floorShadow.png",
        type: "texture",
      },
      // Car default 默认汽车模型
      { name: "carDefaultChassis", source: "./models/car/default/chassis.glb" },
      { name: "carDefaultWheel", source: "./models/car/default/wheel.glb" },
      {
        name: "carDefaultBackLightsBrake",
        source: "./models/car/default/backLightsBrake.glb",
      },
      {
        name: "carDefaultBackLightsReverse",
        source: "./models/car/default/backLightsReverse.glb",
      },
      { name: "carDefaultAntena", source: "./models/car/default/antena.glb" },
      // Car CyberTruck 赛博卡车模型
      {
        name: "carCyberTruckChassis",
        source: "./models/car/cyberTruck/chassis.glb",
      },
      {
        name: "carCyberTruckWheel",
        source: "./models/car/cyberTruck/wheel.glb",
      },
      {
        name: "carCyberTruckBackLightsBrake",
        source: "./models/car/cyberTruck/backLightsBrake.glb",
      },
      {
        name: "carCyberTruckBackLightsReverse",
        source: "./models/car/cyberTruck/backLightsReverse.glb",
      },
      {
        name: "carCyberTruckAntena",
        source: "./models/car/cyberTruck/antena.glb",
      },
      // Project 项目相关资源
      {
        name: "projectsBoardStructure",
        source: "./models/projects/board/structure.glb",
      },
      {
        name: "projectsBoardCollision",
        source: "./models/projects/board/collision.glb",
      },
      {
        name: "projectsBoardStructureFloorShadow",
        source: "./models/projects/board/floorShadow.png",
        type: "texture",
      },
      {
        name: "projectsBoardPlane",
        source: "./models/projects/board/plane.glb",
      },
      {
        name: "projectsLuniFloor",
        source: "./models/projects/luni/1.png",
        type: "texture",
      },
      {
        name: "projectsBonhomme10ansFloor",
        source: "./models/projects/bonhomme10ans/1.png",
        type: "texture",
      },
      {
        name: "projectsThreejsJourneyFloor",
        source: "./models/projects/threejsJourney/floorTexture.webp",
        type: "texture",
      },
      {
        name: "projectsMadboxFloor",
        source: "./models/projects/madbox/5.png",
        type: "texture",
      },
      {
        name: "projectsScoutFloor",
        source: "./models/projects/scout/5.png",
        type: "texture",
      },
      {
        name: "projectsChartogneFloor",
        source: "./models/projects/chartogne/floorTexture.png",
        type: "texture",
      },
      {
        name: "projectsCitrixRedbullFloor",
        source: "./models/projects/citrixRedbull/floorTexture.png",
        type: "texture",
      },
      {
        name: "projectsPriorHoldingsFloor",
        source: "./models/projects/priorHoldings/floorTexture.png",
        type: "texture",
      },
      {
        name: "projectsOranoFloor",
        source: "./models/projects/orano/5.png",
        type: "texture",
      },
      // Information 信息面板资源
      {
        name: "informationStaticBase",
        source: "./models/information/static/base.glb",
      },
      {
        name: "informationStaticCollision",
        source: "./models/information/static/collision.glb",
      },
      {
        name: "informationStaticFloorShadow",
        source: "./models/information/static/floorShadow.png",
        type: "texture",
      },
      {
        name: "informationBaguetteBase",
        source: "./models/information/baguette/base.glb",
      },
      {
        name: "informationBaguetteCollision",
        source: "./models/information/baguette/collision.glb",
      },
      {
        name: "informationContactTwitterLabel",
        source: "./models/information/static/contactTwitterLabel.png",
        type: "texture",
      },
      {
        name: "informationContactGithubLabel",
        source: "./models/information/static/contactGithubLabel.png",
        type: "texture",
      },
      {
        name: "informationContactLinkedinLabel",
        source: "./models/information/static/contactLinkedinLabel.png",
        type: "texture",
      },
      {
        name: "informationContactMailLabel",
        source: "./models/information/static/contactMailLabel.png",
        type: "texture",
      },
      {
        name: "informationActivities",
        source: "./models/information/static/activities.png",
        type: "texture",
      },
      // Playground 操作场地资源
      {
        name: "playgroundStaticBase",
        source: "./models/playground/static/base.glb",
      },
      {
        name: "playgroundStaticCollision",
        source: "./models/playground/static/collision.glb",
      },
      {
        name: "playgroundStaticFloorShadow",
        source: "./models/playground/static/floorShadow.png",
        type: "texture",
      },
      // Brick 砖块资源
      { name: "brickBase", source: "./models/brick/base.glb" },
      { name: "brickCollision", source: "./models/brick/collision.glb" },
      // Horn 喇叭资源
      { name: "hornBase", source: "./models/horn/base.glb" },
      { name: "hornCollision", source: "./models/horn/collision.glb" },
      // Webby trophy 奖杯资源
      { name: "webbyTrophyBase", source: "./models/webbyTrophy/base.glb" },
      {
        name: "webbyTrophyCollision",
        source: "./models/webbyTrophy/collision.glb",
      },
      // Lemon 柠檬资源
      { name: "lemonBase", source: "./models/lemon/base.glb" },
      { name: "lemonCollision", source: "./models/lemon/collision.glb" },
      // Bowling ball 保龄球资源
      { name: "bowlingBallBase", source: "./models/bowlingBall/base.glb" },
      {
        name: "bowlingBallCollision",
        source: "./models/bowlingBall/collision.glb",
      },
      // Bowling pin 保龄球瓶资源
      { name: "bowlingPinBase", source: "./models/bowlingPin/base.glb" },
      {
        name: "bowlingPinCollision",
        source: "./models/bowlingPin/collision.glb",
      },
      // Areas 区域资源
      {
        name: "areaKeyEnter",
        source: "./models/area/keyEnter.png",
        type: "texture",
      },
      { name: "areaEnter", source: "./models/area/enter.png", type: "texture" },
      { name: "areaOpen", source: "./models/area/open.png", type: "texture" },
      { name: "areaReset", source: "./models/area/reset.png", type: "texture" },
      {
        name: "areaQuestionMark",
        source: "./models/area/questionMark.png",
        type: "texture",
      },
      // Tiles 瓦片资源
      { name: "tilesABase", source: "./models/tiles/a/base.glb" },
      { name: "tilesACollision", source: "./models/tiles/a/collision.glb" },
      { name: "tilesBBase", source: "./models/tiles/b/base.glb" },
      { name: "tilesBCollision", source: "./models/tiles/b/collision.glb" },
      { name: "tilesCBase", source: "./models/tiles/c/base.glb" },
      { name: "tilesCCollision", source: "./models/tiles/c/collision.glb" },
      { name: "tilesDBase", source: "./models/tiles/d/base.glb" },
      { name: "tilesDCollision", source: "./models/tiles/d/collision.glb" },
      { name: "tilesEBase", source: "./models/tiles/e/base.glb" },
      { name: "tilesECollision", source: "./models/tiles/e/collision.glb" },
      // Konami 彩蛋资源
      {
        name: "konamiLabel",
        source: "./models/konami/label.png",
        type: "texture",
      },
      {
        name: "konamiLabelTouch",
        source: "./models/konami/label-touch.png",
        type: "texture",
      },
      // Wigs 假发资源
      { name: "wig1", source: "./models/wigs/wig1.glb" },
      { name: "wig2", source: "./models/wigs/wig2.glb" },
      { name: "wig3", source: "./models/wigs/wig3.glb" },
      { name: "wig4", source: "./models/wigs/wig4.glb" },
    ]);

    this.loader.on("fileEnd", (_resource, _data) => {
      this.items[_resource.name] = _data; // 存储加载完成的资源

      // 如果是纹理类型，创建Three.js纹理对象
      if (_resource.type === "texture") {
        const texture = new THREE.Texture(_data);
        texture.needsUpdate = true;

        this.items[`${_resource.name}Texture`] = texture; // 将纹理对象存储到资源中
      }

      // 触发加载进度事件
      this.trigger("progress", [this.loader.loaded / this.loader.toLoad]);
    });

    this.loader.on("end", () => {
      // 触发加载完成事件
      this.trigger("ready");
    });
  }
}
