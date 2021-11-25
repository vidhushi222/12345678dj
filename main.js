leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
song="";
leftWrist_score=0;
leftWristy_number=0;
rightWrist_score=0;
function preload(){
song=loadSound("music.mp3");
}

function draw(){
image(video,0,0,600,500);
fill("#FFC0CB");
stroke("#FFC0CB");
if(rightWrist_score>0.2){


circle(rightWristx,rightWristy,20);
if(rightWristy>0 && rightWristy<=100){
    document.getElementById("speed").innerHTML="speed=0.5x";
    song.rate(0.5);
}
else if(rightWristy>100 && rightWristy<=200){
    document.getElementById("speed").innerHTML="speed=1x";
    song.rate(1);
}
else if(rightWristy>200 && rightWristy<=300){
    document.getElementById("speed").innerHTML="speed=1.5x";
    song.rate(1.5);
}
else if(rightWristy>300 && rightWristy<=400){
    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2);
}
else if(rightWristy>400 && rightWristy<=500){
    document.getElementById("speed").innerHTML="speed=2.5x";
    song.rate(2.5);
}
}
if(leftWrist_score >0.2){
circle(leftWristx,leftWristy,20);
leftWristy_number=floor(Number(leftWristy));
volume=leftWristy_number/500;
document.getElementById("volume").innerHTML="volume: "+volume;
song.setVolume(volume);
}}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelloaded);
poseNet.on('pose',gotPoses);
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1.5);
    
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWrist_score=results[0].pose.keypoints[9].score;
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y
        rightWrist_score=results[0].pose.keypoints[10].score;
    }
}


function modelloaded(){
    console.log("poseNet is initialized");
}
