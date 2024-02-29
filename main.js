model_status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide()
}

function start_detection() {
    objmodel = ml5.objectDetector("cocossd", modeloaded);
    document.getElementById("status").innerHTML = "Status: Object detection started";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (model_status != "") {
        objmodel.detect(video, get_results);
        for (i = 0; i < objects.length; i++) {
            obj_name = objects[i].label;
            if(obj_name=="person"){
                document.getElementById("status").innerHTML = "status: baby found";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML = "status: baby not found";
                alarm.play();
            }
        }
        if(objects.length==0){
            document.getElementById("status").innerHTML = "status: baby not found";
            alarm.play();
        }
    }
}

function modeloaded() {
    console.log("model loaded!");
    model_status = true;
}

function get_results(e, r) {
    if (e) {
        console.error(e);
    }
    else {
        console.log(r);
        objects = r;
    }
}

function preload(){
    alarm=loadSound("alarm.mp3");
}