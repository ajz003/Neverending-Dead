$(document).ready(function () {
    // initial stat values
    let myName = "";
    let myAttack = 15;
    let myHealth = 2000;
    let myImg;

    let enemyName = "";
    let enemyImg = "";
    let enemyHealth;
    let enemyAttack;
    let myMaxHealth = myHealth;
    let enemyMaxHealth = enemyHealth;

    let position = 0;

    // stat modifiers
    let myBleeding = {
        status: false,
        ticksLeft: 0,
        damage: 0
    }
    let enemyBleeding = {
        status: false,
        ticksLeft: 0,
        damage: 0
    }


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

        $("#name-invalid").css("visibility", "hidden");
        $("#img-invalid").css("visibility", "hidden");

        if (myName === "") {
            $("#name-invalid").css("visibility", "visible");
            return;
        }

        if (myImg === "") {
            $("#img-invalid").css("visibility", "visible");
            return;
        }

        if (myImg !== "") {
            $("#my-image").attr("src", myImg)
        };

        spawnEnemy();

        $("#my-name").text(myName);
        $("#my-health").text(myHealth);
        $("#my-attack").text(myAttack);
        $("#enemy-health").text(enemyHealth);
        $("#enemy-attack").text(enemyAttack);
        $("#enemy-name").text(enemyName);
        $("#character-creator").hide();
        $("#game-screen").show();

    });

    // ----------------------- Combat

    var round = 1;

    // Attack button calls attack function
    $("#attack-btn").click(function () {
        round++;
        attackLogic();
        console.log(round);
        myDeathLogic();
        enemyDeathLogic();
        hpBarUpdate();
        scrollToBottom();

    });


    $("#lucky-stab-btn").click(function () {
        round++;
        attackLogic("Lucky Stab");
        myDeathLogic();
        enemyDeathLogic();
        hpBarUpdate();
        scrollToBottom();

    });

    $("#bleed-attack-btn").click(function () {
        round++;
        attackLogic("Bleeding Attack");
        myDeathLogic();
        enemyDeathLogic();
        hpBarUpdate();
        scrollToBottom();

    });




    // -------------------- Functions

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
                enemyBleeding.status = false;
                enemyBleeding.ticksLeft = 0;
                enemyBleeding.damage = 0;

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

    let attackLogic = function attackLogic(ability) {
        let myNewAttack = myAttack;
        let bonusDamage = 0;
        let myCritRate = 0.20;
        let myCritMod = 1;

        let myCritNote = "";

        // let enemyCritRate = 0.5;
        // let enemyCrit = Math.random();
        // let enemyCritRate = 0.5;


        // ability logic
        if (ability === "Lucky Stab") {
            var myCrit = Math.random();
            myNewAttack = myAttack * 0.5;
        }

        if (ability === "Bleeding Attack") {
            var myCrit = Math.random();
            myNewAttack = myAttack;
            enemyBleeding.status = true;
            enemyBleeding.ticksLeft = 3;
            enemyBleeding.damage = myNewAttack;
            console.log(enemyBleeding);
        }

        // crit check
        if (myCrit <= myCritRate) {
            myCritMod = 2;
            myCritNote = "CRITICAL HIT!"
            if (ability === "Lucky Stab") {
                myCritMod = 10;
            }

        }

        // status check

        if (enemyBleeding.status === true) {

            bonusDamage += enemyBleeding.damage;
            enemyBleeding.ticksLeft--;
            myCritNote += "The enemy bled for " + enemyBleeding.damage + ". " + enemyBleeding.ticksLeft + " turns until normal."
            if (enemyBleeding.ticksLeft === 0) {
                enemyBleeding.status = false
            };
        };



        // Actual attack happens here. 
        enemyHealth -= myNewAttack * myCritMod + bonusDamage;


        // check if enemy survived my attack
        if (enemyHealth > 0) {
            // reduce my health by enemyAttack
            myHealth -= enemyAttack;

            // update console lines
            $("#console-log-1").append(timestamp)
                .append(`<p>\n${myCritNote}\n</p>`)
                .append(`\n<p>You attacked for ${myNewAttack * myCritMod} damage.</p>\n`)
                .append(`\n<p>The enemy hits you back for ${enemyAttack} damage!</p>\n<br>`);
        };
    }

    let scrollToBottom = function scrollToBottom() {
        var elem = document.getElementById(`console-box`);
        elem.scrollTop = elem.scrollHeight;
    };

    let myDeathLogic = function myDeathLogic() {

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
    }

    let enemyDeathLogic = function enemyDeathlogic() {
        // check if enemy died before he counter-attacks
        if (enemyHealth <= 0) {
            // hides the game and shows the winscreen
            if (enemyName === "Lich King") {
                $("#game-screen").hide();
                $("#win-screen").show();
            }
            spawnEnemy();

            // Sets current round back to 1 when new enemy spawns
            round = 1;
        };

    }

    let hpBarUpdate = function hpBarUpdate() {

        // Updates player's & enemy's hp bars as they damage each other
        $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
        $(`#character-hp-bar`).attr(`value`, `${myHealth}`);

        // if no one died, update the character stat boxes
        $('#enemy-health').text(enemyHealth);
        $('#my-health').text(myHealth);

        if (myHealth <= (myMaxHealth * 0.5)) {
            $(`#character-hp-bar`).removeClass(`is-success`).addClass(`is-warning`);
            if (myHealth <= (myMaxHealth * 0.3)) {
                $(`#character-hp-bar`).removeClass(`is-warning`).addClass(`is-danger`);
            };
        };

        if (enemyHealth <= (enemyMaxHealth * 0.5)) {
            $(`#enemy-hp-bar`).removeClass(`is-success`).addClass(`is-warning`);
            if (enemyHealth <= (enemyMaxHealth * 0.3)) {
                $(`#enemy-hp-bar`).removeClass(`is-warning`).addClass(`is-danger`);
            }
        };
    }

    let timestamp = function timeStamp() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        return `<p id="timestamp">${h}:${m}:${s}</p>`
    }

    $("#restart-btn").click(function () {
        $("#lose-screen").hide();
        $("#character-creator").show();
        $(`#character-hp-bar`).removeClass(`is-warning`).removeClass('is-danger').addClass(`is-success`);
        position = 0;
        myHealth = 100;
        myAttack = 15;
        myMaxHealth = myHealth;
        enemyHealth = 100;
        enemyAttack = 20;
        $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
        $(`#character-hp-bar`).attr(`value`, `${myHealth}`);
    })
});