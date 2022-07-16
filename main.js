peter_pan_song = "";
harry_potter_song = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
song_peter_pan = "";
scorerightWrist = 0;
song_harry_potter = "";

function setup()
{
    canvas = createCanvas(600, 650);
    canvas.center(); 
    video = createCapture(VIDEO);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 530);

    fill("#1ff095");
    stroke("#bd1c3a");

    song_peter_pan = peter_pan_song.isPlaying();
    console.log("Peter Pan Song = "+song_peter_pan);

    song_harry_potter = harry_potter_song.isPlaying();
    console.log("Harry Potter Theme Song = "+song_harry_potter);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        harry_potter_song.stop();
        if(song_peter_pan == false){
        peter_pan_song.play();
        }
    }
    else{
        document.getElementById("song_id").innerHTML = "Song Name : Peter Pan Song";
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        peter_pan_song.stop();
        if(song_harry_potter == false){
        harry_potter_song.play();
        }
    }
    else{
        document.getElementById("song_id").innerHTML = "Song Name : Harry Potter Theme Song";
    }
}

function preload()
{
    peter_pan_song = loadSound("music2.mp3");
    harry_potter_song = loadSound("music.mp3");
}

function modelLoaded()
{
    console.log("PoseNet Is Initialized");
}

function gotPoses(results)
{
    if(results.lenght > 0)
    {
        console.log(results);

        scoreleftWrist = results[9].pose.keypoints;
        console.log("leftWrist_Score = "+scoreleftWrist);

        scorerightWrist = results[10].pose.keypoints;
        console.log("rightWrist_Score = "+scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + "leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + "rightWrist_y = " + rightWrist_y);
    }
}