import * as THREE from '../node_modules/three/build/three.module.js'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import * as dat from '../node_modules/dat.gui/build/dat.gui.module.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from '../node_modules/three/examples/jsm/controls/TransformControls.js';
import html2canvas from '../node_modules/html2canvas/dist/html2canvas.esm.js'
import  canvas2Image  from '../node_modules/canvas2image-2/canvas2image.js'

let INTERSECTED;//what intersects with the objects
var objects3D = [] //hold all intersectable objects
var raycaster = new THREE.Raycaster(); // create once ray
var mouse = new THREE.Vector2(); // create once
var camera;
var scene;
var renderer;
let intersects = []
var props = {}; //define methods in GUI
let mainGroup = new THREE.Object3D(); // group of draggable objects
let roomGroup = new THREE.Object3D(); // squareRoom
let roomGroup1 = new THREE.Object3D(); // Dyanmic
let intersects1 = []//second raycaster items for intersection
const raycaster1 = new THREE.Raycaster()//second raycaster
const sceneMeshes= [] //second raycaster objects to act on
const dir = new THREE.Vector3()

//resize
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

function init() {
    scene = new THREE.Scene()
    
    var box = getBox(0.1,0.1,0.1)
    box.position.y = -100
    scene.add(box)
    var selected = box
    objects3D.push(mainGroup);

    var roomParams = {
        x : 0,
        y: 0,
        z: 0
    }
    
    var introGuiControls = new function(){
        this.x = 0
        this.y = 0
        this.z = 0
        this.createRoom = {createRoom: function(){
            if(roomParams.x === roomParams.y && roomParams.x === roomParams.z){
                if(roomParams.x !== 0){
                    ('square')
                    //rooms.push(createSquareRoom(roomParams.x))
                    scene.add(createSquareRoom(roomParams.x))
                    scene.add( new THREE.GridHelper( roomParams.x, roomParams.x, 0x888888, 0x444444 ) );
                    introGui.hide()
                    gui.show()
                    camera.position.set(-11,11,-5)
                }else{
                    alert('please enter a valid number')
                }
            }else{
                if(roomParams.x !== 0 && roomParams.y !== 0 && roomParams.z !== 0){
                    //rooms.push(createDynamicRoom(roomParams.x,roomParams.y,roomParams.z))
                    scene.add(createDynamicRoom(roomParams.x,roomParams.y,roomParams.z))
                    introGui.hide()
                    ('different')
                    gui.show()
                    camera.position.set(-11,11,-5)
                    var f4 = gui.addFolder('Change room aspect')
                    f4.add(guiControls.changeRoomWall,"changeWall").name("First wall")
                    f4.add(guiControls.changeSecondRoomWall,"changeSecondWall").name("Second wall")
                }else{
                    alert('please enter a valid number')
                }
            }
        }}
    }
    //hold our methods in dat.gui
    var introGui = new dat.GUI()
    var i2 = introGui.addFolder("Create ROom")
    i2.open()
    i2.add(introGuiControls,"x",1,10).name("Length:").step(1).onChange(function(e){
        roomParams.x = e
    })
    i2.add(introGuiControls,"y",1,10).name("Width:").step(1).onChange(function(e){
        roomParams.y = e
    })
    i2.add(introGuiControls,"z",1,10).name("Height:").step(1).onChange(function(e){
        roomParams.z = e
    })
    i2.add(introGuiControls.createRoom,"createRoom")
    
    //////////////////////////////////////////////////////////////////
    
    //hold our methods in dat.gui
    var guiControls = new function() {
        this.color = box.material.color.getStyle();
        this.x = box.scale.x
        this.y = box.scale.y
        this.z = box.scale.z
        this.rotateLeft = {rotateLeft : function(){
            selected.rotation.y += Math.PI/2
        }}
        this.rotateRight = {rotateRight : function(){
            selected.rotation.y += -Math.PI/2
        }}
        this.selected = {delete: function(){
            removeSelected(selected)
        }}
        this.addBox = {addBox: function(){
            var newBox = getBox(0.2,0.2,0.2)
            newBox.position.y = 1
            objects3D.push(newBox)
            sceneMeshes.push(newBox)
            control.attach(newBox)
            scene.add(newBox)
        }}
        this.addSphere = {addSphere: function(){
            var newSphere = getSphere(0.2)
            newSphere.position.y = 1
            objects3D.push(newSphere)
            control.attach(newSphere)
            scene.add(newSphere)
        }}
        this.takeScreen = {takeScreen: function(){
            gui.hide()
            html2canvas(document.body).then(function(canvas){
                ('at least not here')
                return canvas2Image.saveAsPNG(canvas);
            })
            gui.show()
        }}
        this.modifyRoom = {modifyRoom: function(){
            introGui.show()
            introGui.add()
        }}
        this.changeRoomWall = { changeWall: function(){
            (scene.children[10].children[1])
            (scene.children[10])
            (scene.children)
            scene.children[10].children[1].position.z = -scene.children[10].children[1].position.z 
            camera.position.z = - camera.position.z
        }} 
        this.changeSecondRoomWall = { changeSecondWall: function(){
            scene.children[10].children[2].position.x = -scene.children[10].children[2].position.x 
            camera.position.x = - camera.position.x
        }}
        this.deleteBasic = {deleteBasic: function(){
            removeBasicObject(selected)
        }}
        this.xLeft = 0.5
        this.xRight = 0.5
        this.yLeft = 0.5
        this.yRight = 0.5
        this.zLeft = 0.5
        this.zRight = 0.5
    };
    
    var gui = new dat.GUI()
    gui.hide()

    //light
    var sphere = getSphere(0.001)
    var sphere1 = getSphere(0.001)
    var sphere2 = getSphere(0.001)
    var sphere3 = getSphere(0.001)
    var sphere4 = getSphere(0.001)
    var sphere5 = getSphere(0.001)
    var pointLight = getPointLight(1)
    var pointLight1 = getPointLight(1)
    var pointLight2 = getPointLight(1)
    var pointLight4 = getPointLight(1)
    var pointLight3 = getPointLight(1)
    var pointLight5 = getPointLight(1)
    sphere.add(pointLight)
    sphere1.add(pointLight1)
    sphere2.add(pointLight2)
    sphere3.add(pointLight3)
    sphere4.add(pointLight4)
    sphere5.add(pointLight5)
    sphere.position.y = 5
    pointLight.intensity = 1
    pointLight1.intensity = 0.5
    pointLight4.intensity = 0.5
    pointLight2.intensity = 0.5
    pointLight3.intensity = 0.5
    pointLight5.intensity = 0.5
    sphere1.position.y = -5
    sphere2.position.x = 5
    sphere2.position.y = 2.5
    sphere3.position.x = -5
    sphere3.position.y = 2.5
    sphere4.position.z = 5
    sphere5.position.z = -5
    scene.add(sphere)
    scene.add(sphere1)
    scene.add(sphere2)
    scene.add(sphere3)
    scene.add(sphere4)
    scene.add(sphere5)
    // objeect names
    props.addGUIObject = ''
    //load the gltf obj to scene
    let addObject = function(src, value){
        loader.load( src, function ( gltf ) {   
            var bbox = new THREE.Box3().setFromObject(gltf.scene);
            (bbox.getSize(new THREE.Vector3()))
            //gltf.scene.updateMatrixWorld(true)
            
            gltf.scene.children[0].material.color.setStyle(box.material.color.getStyle())
            gltf.scene.children[0].material = gltf.scene.children[0].material.clone() 
            gltf.scene.children[0].material.metalness = 0
            gltf.scene.children[0].rotation.y += Math.PI 
            gltf.scene.children[0].material.roughness = 0
            gltf.scene.children[0].up.set(0,0,0)
            gltf.scene.children[0].properties = {different:value, normalScale: bbox.getSize(new THREE.Vector3())}
            scene.add( gltf.scene );
            mainGroup.add(gltf.scene);
            scene.add(mainGroup);
        }, undefined, function ( error ) {
            
            console.error( error.message );
            
        } );
    }
    //mouse info
    var MouseControls = {
        LeftClick: "Pick object",
        MiddleClick: "Position object on floor",
        RightClick: "Rotate object"
    }
    //gui folders
    var f1 = gui.addFolder('Premade Objects')
    var f2 = gui.addFolder('Basic Objects')
    var f3 = gui.addFolder('Rotate Objects')
    var f5 = gui.addFolder('Adjust light')
    var f6 = gui.addFolder('Mouse controls')
    
    f1
    .addColor(guiControls, "color")
    .listen()
    .onChange(function(e) {
        selected.material.color.setStyle(e);
    });
    
    f1
    .add(guiControls, "x",0.1,5).step(0.1)
    .listen().name('Width')
    .onChange(function(e) {
        selected.scale.x = e/selected.properties.normalScale.x;
    });
    
    f1
    .add(guiControls, "y",0.1,5).step(0.1)
    .listen().name('Height')
    .onChange(function(e) {
        
        selected.scale.y = e/selected.properties.normalScale.y;

    });
    
    f1
    .add(guiControls, "z",0.1,5).step(0.1)
    .listen().name('Length')
    .onChange(function(e) {
        selected.scale.z = e/selected.properties.normalScale.z;
    });
    
    f1
    .add(guiControls.selected, "delete")
    .listen()
    
    
    //add objects to dat gui
    f1.add(props,'addGUIObject',
    ['3 Door Closet1','small Closet Near Bed','Standart Bed','3doors Small Closet','desk','single Bed','Open Closet','Half Opened Closet','Table 2','Table 3'])
    .name('Dormitory')
    .listen()
    .onChange(
        function(newValue) {
            (formatResizableObjectFolderName(newValue))    
            addObject(formatResizableObjectFolderName(newValue),true)
            
        });
    f1.add(props,'addGUIObject',
    ['fridge','Top 1x2','Top 2x2','corner','Double Horizontal Closet','Double Vertical Doors','Single Door Closet','3 Horizontal Doors','open 3 shelves'])
    .name('Kitchen')
    .listen()
    .onChange(
        function(newValue) {
            (formatStandartObjectFolderName(newValue))    
            addObject(formatStandartObjectFolderName(newValue),false)
            
        });
        //scene.children[10].children[1]
    f1.open()
    f2.add(guiControls.addBox,'addBox')
    f2.add(guiControls.addSphere,'addSphere')
    f2.add(guiControls.deleteBasic,'deleteBasic').name("delete")
    
    f3.add(guiControls.rotateLeft,"rotateLeft").name("left")
    .listen()
    f3.add(guiControls.rotateRight,"rotateRight").name('right')
    .listen()
    
    f5.add(guiControls,'xLeft',0.1,5).listen().name('up')
    .onChange(function(e){
        sphere.position.y = e
    }) 
    f5.add(guiControls,'xRight',-5,0).listen().name('down')
    .onChange(function(e){
        sphere1.position.y = e
    }) 
    f5.add(guiControls,'yLeft',-5,0).listen().name('right')
    .onChange(function(e){
        sphere2.position.x = e
    }) 
    f5.add(guiControls,'yRight',0.1,5).listen().name('left')
    .onChange(function(e){
        sphere3.position.x = e
    }) 
    f5.add(guiControls,'zLeft',0.1,5).listen().name('back')
    .onChange(function(e){
        sphere4.position.z = e
    }) 
    f5.add(guiControls,'zRight',-5,0).listen().name('front')
    .onChange(function(e){
        sphere5.position.z = e
    }) 
    f6.add(MouseControls,'LeftClick')
    f6.add(MouseControls,'MiddleClick',true)
    f6.add(MouseControls,'RightClick')
    
    f6.open()
    var f7 = gui.addFolder('Screenshot')
    f7.add(guiControls.takeScreen,"takeScreen")   
        
        //camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000)
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 0
        var loader = new GLTFLoader()
        renderer = new THREE.WebGLRenderer({
            preserveDrawingBuffer: true,
            setPixelRatio : 1,
            antialias: true
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor('rgb(120, 120, 120)')
        document.getElementById('webgl').appendChild(renderer.domElement)
        window.addEventListener('resize', onResize, false);
        
        
       //center
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x0000ff,
        })
        const points = []
        points[0] = new THREE.Vector3(-0.1, 0, 0)
        points[1] = new THREE.Vector3(0.1, 0, 0)
        let lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const xLine = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(xLine)
        points[0] = new THREE.Vector3(0, -0.1, 0)
        points[1] = new THREE.Vector3(0, 0.1, 0)
        lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const yLine = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(yLine)
        points[0] = new THREE.Vector3(0, 0, -0.1)
        points[1] = new THREE.Vector3(0, 0, 0.1)
        lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const zLine = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(zLine)
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
          }
          
    //orbit controls
    var controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 2;
    controls.maxDistance = 30;
    //cant go under y = 0!
    controls.addEventListener('change', function () {
        render()
        if(camera.position.y < 0){
            camera.position.y = 4
            controls.enabled = false
            delay(500).then(() => controls.enabled = true)   
        }
        xLine.position.copy(controls.target)
        yLine.position.copy(controls.target)
        zLine.position.copy(controls.target)
        
        raycaster1.set(
            controls.target,
            dir.subVectors(camera.position, controls.target).normalize()
        )
        ('controls',controls.target)
            
        intersects1 = raycaster1.intersectObjects(sceneMeshes, true)
        if (intersects1.length > 0) {
            if (
                intersects1[0].distance < controls.target.distanceTo(camera.position)
            ) {
                (controls.target)
                (intersects1)
                (intersects1[0].distance)
                camera.position.copy(intersects1[0].point)
        
            }
        }
    })   
    
        update(controls,control)
        controls.update();
            
        var control = new TransformControls( camera, renderer.domElement );
        control.addEventListener( 'change', ()=>{
            render()
        });
            
        control.addEventListener( 'dragging-changed', function ( event ) {
                
            controls.enabled = !event.value;
        } );
                
                          
    scene.add(control)
    document.addEventListener( 'mousemove', onMouseMove );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );

    function onDocumentMouseDown(event){
        switch (event.button){
            case 0: 
            mouse.x = ( (event.clientX -renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
            mouse.y = -( (event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            //detectCollisionCubes(plane,box)
            intersects = raycaster.intersectObjects(objects3D, true);
            (intersects)
            if(intersects.length > 0 ){
                INTERSECTED = intersects[ 0 ].object;
                (INTERSECTED)
                control.attach(INTERSECTED);
                scene.add(control);
                selected = INTERSECTED
                
                    //change dat.gui accordingly to selected object
                    guiControls.color = selected.material.color.getStyle();
                    (selected)
                    guiControls.x = selected.scale.x*selected.properties.normalScale.x
                    guiControls.y = selected.scale.y*selected.properties.normalScale.y
                    guiControls.z = selected.scale.z*selected.properties.normalScale.z
                    (selected)
                    (selected.properties.normalScale)
                    
                    this.selected = {delete: function(){
                        
                        removeSelected(selected)
                    }}
                    this.rotateLeft = {rotateLeft : function(){
                        selected.rotation.y += Math.PI/2
                    }}
                    this.rotateLeft = {rotateLeft : function(){
                        selected.rotation.y += -Math.PI/2
                    }}
                
                
                update(controls, control)
            } else{
                control.detach();
                scene.remove(control);
                ('dont')
            }
            break;
            case 1:
                ('middle')

                selected.position.y = (selected.scale.y*selected.properties.normalScale.y)/2
                
            break;
            case 2: 
                ('right click')
                selected.rotation.y += Math.PI/2
                  
        }
    }

    function onMouseMove( event ) {
        event.preventDefault();
    }
     
}

function render() {
    
	renderer.render( scene, camera );
    
}


let v = new THREE.Vector3();
// iterate over source elements        
for (let i = 0; i < sceneMeshes.length; i += 1) {
    let geometry = sceneMeshes[i].geometry;
    // if there's any with BufferGeometry generate vertices based on 
    if ( geometry instanceof THREE.BufferGeometry ) {
        const vertices = [];
        const positions = geometry.attributes.position.array;
                
        ('CollisionDetector BufferGeometry detected', geometry);

        for ( let k = 0; k < positions.length; k += 3 ) {
            v.set(positions[ k ],positions[ k + 1 ], positions[ k + 2 ]);
            vertices.push(v.clone()); // <---- Creates a copy!
        }
    }
}
function getBox(w,h,d){
    var geometry = new THREE.BoxGeometry(w ,h ,d)
    var material = new THREE.MeshBasicMaterial({
        color: 'rgb(120, 120, 120)'
    })

    return new THREE.Mesh(
        geometry,
        material
    )
     
}
function removeSelected(obj){
    for(let i in mainGroup.children){
        for(let j in mainGroup.children[i].children){
            if(mainGroup.children[i].children[j] === obj){
                (mainGroup.children[i])
                mainGroup.remove(mainGroup.children[i])
                scene.remove(mainGroup.children[i])
            }
        }
    }
}
function removeBasicObject(obj){

    for (let i in sceneMeshes){
        if(sceneMeshes[i] === obj){
            scene.remove(sceneMeshes[i])
            sceneMeshes.remove(sceneMeshes[i])
        }
    }
}


function getPlane(size1,size2){
    var geometry = new THREE.PlaneGeometry(size1,size2)
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120 ,120)',
        side: THREE.DoubleSide
    })

    var plane = new THREE.Mesh(
        geometry,
        material
    )
    return plane
}

function getSphere(size){
    var geometry = new THREE.SphereGeometry(size,24,24)
    var material = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 255 ,255)'
    })

    return new THREE.Mesh(
        geometry,
        material
    )
}

function getPointLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity)

    return light
}

//try to detect collision
function detectCollisionCubes(object1, object2){
    object1.geometry.computeBoundingBox(); //not needed if its already calculated
    object2.geometry.computeBoundingBox();
    object1.updateMatrixWorld();
    object2.updateMatrixWorld();
    
    var box1 = object1.geometry.boundingBox.clone();
    box1.applyMatrix4(object1.matrixWorld);
  
    var box2 = object2.geometry.boundingBox.clone();
    box2.applyMatrix4(object2.matrixWorld);
    return box1.intersectsBox(box2);
}

//x-lenght, y-height, z - width
function createSquareRoom(x){
    let firstWall = getPlane(x,x)
    let secondWall = getPlane(x,x)
    let thirdWall = getPlane(x,x)
    firstWall.rotation.x += Math.PI/2
    secondWall.rotation.y = Math.PI/2
    secondWall.position.x = x/2
    thirdWall.position.z = x/2
    secondWall.position.y = x/2
    thirdWall.position.y = x/2
    
    roomGroup.add(firstWall)   
    roomGroup.add(secondWall)   
    roomGroup.add(thirdWall) 
    return roomGroup
    
}

function createDynamicRoom(l,w,h){
    let firstWall = getPlane(l,w)
    let secondWall = getPlane(l,h)
    let thirdWall = getPlane(w,h)
    firstWall.rotation.x = Math.PI/2
    thirdWall.rotation.y = Math.PI/2
    secondWall.position.z = w/2
    secondWall.position.y = h/2
    thirdWall.position.x = l/2
    thirdWall.position.y = h/2
    roomGroup1.add(firstWall)   
    roomGroup1.add(secondWall)   
    roomGroup1.add(thirdWall)   
    return roomGroup1
}



function formatResizableObjectFolderName(objectName){
    
        objectName = objectName.replace(/ /g,"")
        return "assets/dorms/" + objectName + ".glb"
}
function formatStandartObjectFolderName(objectName){
    
    objectName = objectName.replace(/ /g,"")
    return "assets/kitchen/" + objectName + ".glb"
}

function update(controls,control){
    renderer.render(
        scene,
        camera
    )
    requestAnimationFrame(()=>{
        update(controls,control)
        
    })
}

init()