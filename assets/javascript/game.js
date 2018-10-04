// initial stat values
let myName = "";
let myAttack = 30;
let myHealth = 100;
let myImg;
let enemyName = "";
let enemyImg = "";
let enemyHealth;
let enemyAttack;
let position = 0;

// hide the gameover and winscreen when the game starts
$("#lose-screen").hide();
$("#win-screen").hide();

// sets DOM text to initial values
$("#my-health").text(myHealth);
$("#my-attack").text(myAttack);
$("#enemy-health").text(enemyHealth);
$("#enemy-attack").text(enemyAttack);
$("#enemy-name").text(enemyName);

// character creation logic
$("#create-btn").click(function (event) {

    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    myName = $("#input-name").val().trim();
    myImg = $("#input-imageUrl").val().trim();
    if (myImg !== "") {
        $("#my-image").attr("src", myImg)
    };

    $("#my-name").text(myName);


    // // Send the POST request.
    // let newChar = {};
    // $.ajax("/api/create", {
    //     type: "POST",
    //     data: newChar
    // }).then(
    //     function () {
    //         console.log("created new character");
    //     }
    // );
    spawnEnemy();
    $("#character-creator").hide();
    $("#game-screen").show();

});


// Attack button calls attack function
$("#attack-btn").click(function () {

    // Reduce enemy health by myAttack value
    enemyHealth -= myAttack;

    // check if enemy died before he counter-attacks
    if (enemyHealth <= 0) {
        spawnEnemy();
        // hides the game and shows the winscreen
        if (position > 2) {
            $("#game-screen").hide();
            $("#win-screen").show();
        }
    };

    // check if enemy survived my attack
    if (enemyHealth > 0) {

        // reduce my health by enemyAttack
        myHealth -= enemyAttack;

        // update console lines
        $(".console-log-1").text("You attacked for " + myAttack + " damage!");
        $(".console-log-2").text("Your opponent hit back for " + enemyAttack + " damage!");

    };

    // after enemy counter-attack, check if my characer died
    if (myHealth <= 0) {

        // hides the game and shows the gameover screen
        $("#game-screen").hide();
        $("#lose-screen").show();
    };

    // if no one died, update the character stat boxes
    $('#enemy-health').text(enemyHealth);
    $('#my-health').text(myHealth);
});

let spawnEnemy = function () {
    $.get("/api/enemy/" + position, function (data) {
        if (data) {
            console.log(data.name);
            // If this enemy exists, fill page with its stats
            enemyName = data.name;
            enemyImg = data.img;
            enemyHealth = data.hp;
            enemyAttack = data.attack;
            $("#enemy-health").text(enemyHealth);
            $("#enemy-attack").text(enemyAttack);
            $("#enemy-name").text(enemyName);
            $("#enemy-image").attr("src", enemyImg);
            position++;
        }
    })
}