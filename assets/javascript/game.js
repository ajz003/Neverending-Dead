// initial stat values
let myAttack = 30;
let myHealth = 100;
let enemyHealth = 100;
let enemyAttack = 10;


// hide the gameover and winscreen when the game starts
$("#gameover").hide();
$("#winscreen").hide();

// sets DOM text to initial values
$("#myHealth").text(myHealth);
$("#myAttack").text(myAttack);
$("#enemyHealth").text(enemyHealth);
$("#enemyAttack").text(enemyAttack);

// Attack logic


// Attack button calls attack function
$("#attackButton").on("click", function () {

    // Reduce enemy health by myAttack value
    enemyHealth -= myAttack;

    // check if enemy died before he counter-attacks
    if (enemyHealth <= 0) {

        // hides the game and shows the winscreen
        $("#gameDiv").hide();
        $("#winscreen").show();
    };

    // check if enemy survived my attack
    if (enemyHealth > 0) {

        // reduce my health by enemyAttack
        myHealth -= enemyAttack;

        // update console lines
        $(".console1").text("You attacked for " + myAttack + " damage!");
        $(".console2").text("Your opponent hit back for " + enemyAttack + " damage!");

    };

    // after enemy counter-attack, check if my characer died
    if (myHealth <= 0) {

        // hides the game and shows the gameover screen
        $("#gameDiv").hide();
        $("#gameover").show();
    };

    // if no one died, update the character stat boxes
    $('#enemyHealth').text(enemyHealth);
    $('#myHealth').text(myHealth);

});










