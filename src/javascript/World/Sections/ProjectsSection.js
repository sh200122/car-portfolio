import * as THREE from "three";
import Project from "./Project";
import gsap from "gsap";

export default class ProjectsSection {
  constructor(_options) {
    // Options
    this.time = _options.time;
    this.resources = _options.resources;
    this.camera = _options.camera;
    this.passes = _options.passes;
    this.objects = _options.objects;
    this.areas = _options.areas;
    this.zones = _options.zones;
    this.tiles = _options.tiles;
    this.debug = _options.debug;
    this.x = _options.x;
    this.y = _options.y;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder("projects");
      this.debugFolder.open();
    }

    // Set up
    this.items = [];

    this.interDistance = 24;
    this.positionRandomess = 5;
    this.projectHalfWidth = 9;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.container.updateMatrix();

    this.setGeometries();
    this.setMeshes();
    this.setList();
    this.setZone();

    // Add all project from the list
    for (const _options of this.list) {
      this.add(_options);
    }
  }

  setGeometries() {
    this.geometries = {};
    this.geometries.floor = new THREE.PlaneGeometry(16, 8);
  }

  setMeshes() {
    this.meshes = {};

    // this.meshes.boardStructure = this.objects.getConvertedMesh(this.resources.items.projectsBoardStructure.scene.children, { floorShadowTexture: this.resources.items.projectsBoardStructureFloorShadowTexture })
    this.resources.items.areaOpenTexture.magFilter = THREE.NearestFilter;
    this.resources.items.areaOpenTexture.minFilter = THREE.LinearFilter;
    this.meshes.boardPlane =
      this.resources.items.projectsBoardPlane.scene.children[0];
    this.meshes.areaLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 0.5),
      new THREE.MeshBasicMaterial({
        transparent: true,
        depthWrite: false,
        color: 0xffffff,
        alphaMap: this.resources.items.areaOpenTexture,
      })
    );
    this.meshes.areaLabel.matrixAutoUpdate = false;
  }

  setList() {
    this.list = [
      {
        name: "citrixRedbull",
        imageSources: [
          "./models/projects/citrixRedbull/1.png",
          "./models/projects/citrixRedbull/2.png",
          "./models/projects/citrixRedbull/4.png",
          "./models/projects/citrixRedbull/5.png",
        ],
        floorTexture: this.resources.items.projectsCitrixRedbullFloorTexture,
        link: {
          href: "https://ahao-gpt.pages.dev/",
          x: -4.8,
          y: -4.4,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [
          { type: "awwwards", x: 3.95, y: 4.15 },
          { type: "fwa", x: 5.6, y: 4.15 },
          { type: "cssda", x: 7.2, y: 4.15 },
        ],
      },
      {
        name: "Three.js Journey",
        imageSources: [
          "./models/projects/threejsJourney/slideA.webp",
          "./models/projects/threejsJourney/slideB.webp",
          "./models/projects/threejsJourney/slideC.webp",
          "./models/projects/threejsJourney/slideD.webp",
        ],
        floorTexture: this.resources.items.projectsThreejsJourneyFloorTexture,
        link: {
          href: "https://sh200122.github.io/ahao-ahopping-pro",
          x: -4.8,
          y: -3,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [{ type: "fwa", x: 3.95, y: 4.15 }],
      },
      {
        name: "",
        imageSources: [
          "./models/projects/chartogne/slideA.jpg",
          "./models/projects/chartogne/slideB.jpg",
          "./models/projects/chartogne/slideC.jpg",
          "./models/projects/chartogne/slideD.jpg",
        ],
        floorTexture: this.resources.items.projectsChartogneFloorTexture,
        link: {
          href: "https://ahao-social-app.pages.dev",
          x: -4.8,
          y: -3.3,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [
          { type: "awwwards", x: 3.95, y: 4.15 },
          { type: "fwa", x: 5.6, y: 4.15 },
          { type: "cssda", x: 7.2, y: 4.15 },
        ],
      },
      {
        name: "Madbox",
        imageSources: [
          "./models/projects/madbox/1.png",
          "./models/projects/madbox/2.png",
          "./models/projects/madbox/3.png",
          "./models/projects/madbox/4.png",
        ],
        floorTexture: this.resources.items.projectsMadboxFloorTexture,
        link: {
          href: "https://ahao-chat.pages.dev/",
          x: -4.8,
          y: -4,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [
          { type: "awwwards", x: 3.95, y: 4.15 },
          { type: "fwa", x: 5.6, y: 4.15 },
        ],
      },
      {
        name: "Scout",
        imageSources: [
          "./models/projects/scout/1.png",
          "./models/projects/scout/2.png",
          "./models/projects/scout/3.png",
          "./models/projects/scout/4.png",
        ],
        floorTexture: this.resources.items.projectsScoutFloorTexture,
        link: {
          href: "https://mappin-6au.pages.dev/",
          x: -4.8,
          y: -3,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [],
      },
      {
        name: "orano",
        imageSources: [
          "./models/projects/orano/1.png",
          "./models/projects/orano/2.png",
          "./models/projects/orano/3.png",
          "./models/projects/orano/4.png",
        ],
        floorTexture: this.resources.items.projectsOranoFloorTexture,
        link: {
          href: "https://weather-app-4v8.pages.dev/",
          x: -4.8,
          y: -3.4,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [
          { type: "awwwards", x: 3.95, y: 4.15 },
          { type: "fwa", x: 5.6, y: 4.15 },
          { type: "cssda", x: 7.2, y: 4.15 },
        ],
      },
      // {
      //   name: "Luni.app",
      //   imageSources: [
      //     "./models/projects/luni/jvke1.png",
      //     "./models/projects/luni/jvke2.png",
      //     "./models/projects/luni/jvke3.png",
      //     "./models/projects/luni/jvke4.png",
      //   ],
      //   floorTexture: this.resources.items.projectsLuniFloorTexture,
      //   link: {
      //     href: "https://github.com/sh200122/practice",
      //     x: .8,
      //     y: -3,
      //     halfExtents: {
      //       x: 3.2,
      //       y: 1.5,
      //     },
      //   },
      //   distinctions: [
      //     { type: "awwwards", x: 3.95, y: 4.15 },
      //     { type: "fwa", x: 5.6, y: 4.15 },
      //   ],
      // },
      {
        name: "Bonhomme | 10 ans",
        imageSources: [
          "./models/projects/bonhomme10ans/2.png",
          "./models/projects/bonhomme10ans/3.png",
          "./models/projects/bonhomme10ans/4.png",
          "./models/projects/bonhomme10ans/5.png",
        ],
        floorTexture: this.resources.items.projectsBonhomme10ansFloorTexture,
        link: {
          href: "https://github.com/sh200122",
          x: .8,
          y: -3,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [
          { type: "awwwards", x: 3.95, y: 4.15 },
          { type: "fwa", x: 5.6, y: 4.15 },
        ],
      },
      // {
      //   name: "Zenly",
      //   imageSources: [
      //     "./models/projects/zenly/1.png",
      //     "./models/projects/zenly/2.png",
      //     "./models/projects/zenly/3.png",
      //     "./models/projects/zenly/4.png",
      //     "./models/projects/zenly/5.png",
      //   ],
      //   floorTexture: this.resources.items.projectsZenlyFloorTexture,
      //   link: {
      //     href: "https://ahao-gpt.pages.dev/",
      //     x: -4.8,
      //     y: -4.2,
      //     halfExtents: {
      //       x: 3.2,
      //       y: 1.5,
      //     },
      //   },
      //   distinctions: [
      //     { type: "awwwards", x: 3.95, y: 4.15 },
      //     { type: "fwa", x: 5.6, y: 4.15 },
      //     { type: "cssda", x: 7.2, y: 4.15 },
      //   ],
      // },
      // {
      //     name: 'priorHoldings',
      //     imageSources:
      //     [
      //         './models/projects/priorHoldings/slideA.jpg',
      //         './models/projects/priorHoldings/slideB.jpg',
      //         './models/projects/priorHoldings/slideC.jpg'
      //     ],
      //     floorTexture: this.resources.items.projectsPriorHoldingsFloorTexture,
      //     link:
      //     {
      //         href: 'https://prior.co.jp/discover/',
      //         x: - 4.8,
      //         y: - 3,
      //         halfExtents:
      //         {
      //             x: 3.2,
      //             y: 1.5
      //         }
      //     },
      //     distinctions:
      //     [
      //         { type: 'awwwards', x: 3.95, y: 4.15 },
      //         { type: 'fwa', x: 5.6, y: 4.15 },
      //         { type: 'cssda', x: 7.2, y: 4.15 }
      //     ]
      // },

      // {
      //     name: 'gleecChat',
      //     imageSources:
      //     [
      //         './models/projects/gleecChat/slideA.jpg',
      //         './models/projects/gleecChat/slideB.jpg',
      //         './models/projects/gleecChat/slideC.jpg',
      //         './models/projects/gleecChat/slideD.jpg'
      //     ],
      //     floorTexture: this.resources.items.projectsGleecChatFloorTexture,
      //     link:
      //     {
      //         href: 'http://gleec.imm-g-prod.com',
      //         x: - 4.8,
      //         y: - 3.4,
      //         halfExtents:
      //         {
      //             x: 3.2,
      //             y: 1.5
      //         }
      //     },
      //     distinctions:
      //     [
      //         { type: 'awwwards', x: 3.95, y: 4.15 },
      //         { type: 'fwa', x: 5.6, y: 4.15 },
      //         { type: 'cssda', x: 7.2, y: 4.15 }
      //     ]
      // },
      // {
      //     name: 'keppler',
      //     imageSources:
      //     [
      //         './models/projects/keppler/slideA.jpg',
      //         './models/projects/keppler/slideB.jpg',
      //         './models/projects/keppler/slideC.jpg'
      //     ],
      //     floorTexture: this.resources.items.projectsKepplerFloorTexture,
      //     link:
      //     {
      //         href: 'https://brunosimon.github.io/keppler/',
      //         x: 2.75,
      //         y: - 1.1,
      //         halfExtents:
      //         {
      //             x: 3.2,
      //             y: 1.5
      //         }
      //     },
      //     distinctions: []
      // }
    ];
  }

  setZone() {
    const totalWidth = this.list.length * (this.interDistance / 2);

    const zone = this.zones.add({
      position: {
        x: this.x + totalWidth - this.projectHalfWidth - 6,
        y: this.y,
      },
      halfExtents: { x: totalWidth, y: 12 },
      data: { cameraAngle: "projects" },
    });

    zone.on("in", (_data) => {
      this.camera.angle.set(_data.cameraAngle);
      gsap.to(
        this.passes.horizontalBlurPass.material.uniforms.uStrength.value,
        { x: 0, duration: 2 }
      );
      gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, {
        y: 0,
        duration: 2,
      });
    });

    zone.on("out", () => {
      this.camera.angle.set("default");
      gsap.to(
        this.passes.horizontalBlurPass.material.uniforms.uStrength.value,
        { x: this.passes.horizontalBlurPass.strength, duration: 2 }
      );
      gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, {
        y: this.passes.verticalBlurPass.strength,
        duration: 2,
      });
    });
  }

  add(_options) {
    const x = this.x + this.items.length * this.interDistance;
    let y = this.y;
    if (this.items.length > 0) {
      y += (Math.random() - 0.5) * this.positionRandomess;
    }

    // Create project
    const project = new Project({
      time: this.time,
      resources: this.resources,
      objects: this.objects,
      areas: this.areas,
      geometries: this.geometries,
      meshes: this.meshes,
      debug: this.debugFolder,
      x: x,
      y: y,
      ..._options,
    });

    this.container.add(project.container);

    // Add tiles
    if (this.items.length >= 1) {
      const previousProject = this.items[this.items.length - 1];
      const start = new THREE.Vector2(
        previousProject.x + this.projectHalfWidth,
        previousProject.y
      );
      const end = new THREE.Vector2(
        project.x - this.projectHalfWidth,
        project.y
      );
      const delta = end.clone().sub(start);
      this.tiles.add({
        start: start,
        delta: delta,
      });
    }

    // Save
    this.items.push(project);
  }
}
