$(document).ready(function () {
    // initial stat values
    let myName = "";
    let myAttack = 15;
    let myHealth = 100;
    let myImg;

    let enemyName = "";
    let enemyImg = "";
    let enemyHealth;
    let enemyAttack;
    let myMaxHealth = myHealth;
    let enemyMaxHealth = enemyHealth;

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

    // Updates player's & enemy's hp bars when the battle starts
    $(`#character-hp-bar`).attr(`value`, `${myHealth}`);
    $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);


    // character creation logic
    $("#create-btn").click(function (event) {

        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        myName = $("#input-name").val().trim();
        myImg = $("#input-imageUrl").val().trim();

        if (myName === "") {
            $("#name-invalid").css("visibility", "visible");
            return;
        }

        if (myImg !== "") {
            $("#my-image").attr("src", myImg)
        };

        $("#my-name").text(myName);

        spawnEnemy();
        $("#character-creator").hide();
        $("#game-screen").show();
    });

    // Attack button calls attack function
    $("#attack-btn").click(function () {


        // check if enemy died before he counter-attacks
        if (enemyHealth <= 0) {
            spawnEnemy();
            // hides the game and shows the winscreen
            if (position > 2) {
                $("#game-screen").hide();
                $("#win-screen").show();
            }
        };

        let myCritRate = 0.75;
        let enemyCritRate = 0.5;


        let myCrit = Math.random();
        let enemyCrit = Math.random();

        let myCritMod = 1;
        let enemyCritMod = 1;

        let myCritNote = "";



        if (myCrit <= myCritRate) {
            myCritMod = 2;
            myCritNote = "CRITICAL HIT!"
        }

        // Reduce enemy health by myAttack value
        enemyHealth -= myAttack * myCritMod;



        // check if enemy died before he counter-attacks
        if (enemyHealth <= 0) {
            spawnEnemy();
            // hides the game and shows the winscreen
            if (position > 2) {
                $("#game-screen").hide();
                $("#win-screen").show();
            }
        };




        if (myHealth <= (myMaxHealth * 0.5)) {

            $(`#character-hp-bar`).removeClass(`is-success`).addClass(`is-warning`);
            if (myHealth <= (myMaxHealth * 0.3)) {
                $(`#character-hp-bar`).removeClass(`is-warning`).addClass(`is-danger`);




                if (enemyHealth <= (enemyMaxHealth * 0.5)) {
                    $(`#enemy-hp-bar`).removeClass(`is-success`).addClass(`is-warning`);
                    if (enemyHealth <= (enemyMaxHealth * 0.3)) {
                        $(`#enemy-hp-bar`).removeClass(`is-warning`).addClass(`is-danger`);
                    }
                };






            };

            $(`#character-hp-bar`).removeClass(`is-success`).addClass(`is-warning`);
            if (myHealth <= (myMaxHealth * 0.3)) {
                $(`#character-hp-bar`).removeClass(`is-warning`).addClass(`is-danger`);
            }
        };



        // check if enemy survived my attack
        if (enemyHealth > 0) {
            // reduce my health by enemyAttack
            myHealth -= enemyAttack;

            // update console lines
            $("#console-log-1").append(timestamp)
                .append(`<p>\n${myCritNote}\n</p>`)
                .append(`\n<p>You attacked for ${myAttack * myCritMod} damage.</p>\n`)
                .append(`\n<p>The enemy hits you back for ${enemyAttack} damage!</p>\n<br>`);

        };


        // after enemy counter-attack, check if my characer died
        if (myHealth <= 0) {


            // Send the POST request to add character to DB
            let newChar = {
                name: myName,
                img: myImg,
                hp: myMaxHealth,
                attack: myAttack,
                position: position

            };
            $.ajax("/api/enemy", {
                type: "POST",
                data: newChar
            }).then(
                function () {
                    console.log("Added " + myName + " to the database");
                }
            );

            // hides the game and shows the gameover screen
            $("#game-screen").hide();
            $("#lose-screen").show();

        };

        // Updates player's & enemy's hp bars as they damage each other
        $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
        $(`#character-hp-bar`).attr(`value`, `${myHealth}`);

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
                enemyMaxHealth = enemyHealth;

                $(`#enemy-hp-bar`).removeClass(`is-warning`).removeClass(`is-danger`).addClass(`is-success`);

                $("#enemy-health").text(enemyHealth);
                $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
                $(`#enemy-hp-bar`).attr(`max`, `${enemyMaxHealth}`);
                $("#enemy-attack").text(enemyAttack);
                $("#enemy-name").text(enemyName);
                $("#enemy-image").attr("src", enemyImg);
                position++;
            }
        })
    }

    let timestamp = function timeStamp() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        return `<p id="timestamp">${h}:${m}:${s}</p>`
    }
});