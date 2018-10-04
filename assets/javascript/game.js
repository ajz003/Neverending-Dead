// initial stat values
let myName = "";
let myAttack = 30;
let myHealth = 100;
let myImg;
let enemyName = "Morty";
let enemyHealth = 100;
let enemyAttack = 10;


// hide the gameover and winscreen when the game starts
$("#lose-screen").hide();
$("#win-screen").hide();

// sets DOM text to initial values
$("#my-health").text(myHealth);
$("#my-attack").text(myAttack);
$("#enemy-health").text(enemyHealth);
$("#enemy-attack").text(enemyAttack);
$("#enemy-name").text(enemyName);

// Updates player's & enemy's hp bars when the battle starts
$(`#character-hp-bar`).attr(`value`, `${myHealth}`);
$(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);


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

    $("#character-creator").hide();
    $("#game-screen").show();

});




// Attack button calls attack function
$("#attack-btn").click(function () {

    // Reduce enemy health by myAttack value
    enemyHealth -= myAttack;

    // check if enemy died before he counter-attacks
    if (enemyHealth <= 0) {

        // hides the game and shows the winscreen
        $("#game-screen").hide();
        $("#win-screen").show();
    };

    if (enemyHealth > (enemyHealth * 0.5)) {
        $(`#enemy-hp-bar`).removeClass(`is-success`).addClass(`is-warning`);
        // if (enemyHealth > (enemyHealth * 0.3)) {
        //     $(`#enemy-hp-bar`).removeClass(`is-warning`).addClass(`is-danger`);
        // }
    }

    if (myHealth > (myHealth * 0.5)) {
        $(`#character-hp-bar`).removeClass(`is-success`).addClass(`is-warning`);
        // if (enemyHealth > (enemyHealth * 0.3)) {
        //     $(`#character-hp-bar`).removeClass(`is-warning`).addClass(`is-danger`);
        // }
    }

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

    // Updates player's & enemy's hp bars as they damage each other
    $(`#character-hp-bar`).attr(`value`, `${myHealth}`);
    $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);

    // if no one died, update the character stat boxes
    $('#enemy-health').text(enemyHealth);
    $('#my-health').text(myHealth);

});












