// initial stat values
let myAttack = 30;
let myHealth = 100;
let killCount = 0;

let enemyHealth = 100;
let enemyAttack = 10;


$("#gameover").hide();
$("#winscreen").hide();

// // sets text to initial values
$("#myHealth").text(myHealth);
$("#myAttack").text(myAttack);

$("#enemyHealth").text(enemyHealth);
$("#enemyAttack").text(enemyAttack);



$("#attackButton").on("click", function () {

    $(".console1").text("You attacked for " + myAttack + " damage!")

    enemyHealth -= myAttack;

    $(".myOpp").find('span.charHealth').text(enemyHealth);


    if (enemyHealth <= 0) {
        $(".myOpp").remove();
            $("#gameDiv").hide();
            $("#winscreen").show();
    };


    if (enemyHealth >= 0) {
        myHealth -= enemyAttack;
        $(".console2").text("Your opponent hit back for " + enemyAttack + " damage!")
    };



    if (myHealth <= 0) {
        $("#gameDiv").hide();
        $("#gameover").show();
    };
    $(".myChar").find('span.charHealth').text(myHealth);
    $(".myChar").find('span.charAttack').text(myAttack);


});
















