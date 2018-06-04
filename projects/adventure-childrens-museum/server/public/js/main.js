function addImg(id, path, className) {
    var img = document.createElement("img");
    img.id = id;
    img.src = path;
    if (className) {
        img.className += " " + className;
    }
    document.body.appendChild(img);    
}

$(document).ready(function() {
    if (Math.random() >= 0.3) {
        addImg("corner-fox", "img/fawkes_mouth_open.png");
    }
    
    addImg("cloud-1", "img/cloud1.png", "cloud");
    addImg("cloud-2", "img/cloud2.png", "cloud");
    addImg("cloud-3", "img/cloud3.png", "cloud");
    
    $('#caterpillar').click(function() {
        $(this).hide();
        $('#butterfly').show();
    });
});

