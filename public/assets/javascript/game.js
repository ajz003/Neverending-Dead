$(document).ready(function () {
    var bgm = new Howl({
        src: ['../assets/audio/bgm.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.3,
        onend: function () {
            console.log('Finished!');
        }
    });

    bgm.play();

    var attackSound = new Howl({
        src: ['../assets/audio/attack.mp3'],
        volume: 0.3
    });

    var createSound = new Howl({
        src: ['../assets/audio/create-character.mp3'],
        volume: 0.3
    });

    var luckyStabSound = new Howl({
        src: ['../assets/audio/lucky-stab.mp3'],
        volume: 0.3
    });

    var missLuckyStab = new Howl({
        src: ['../assets/audio/miss-lucky-stab.mp3'],
        volume: 0.3
    });

    var bleedingAttackSound = new Howl({
        src: ['../assets/audio/bleeding-attack.mp3'],
        volume: 0.3
    });

    var bleedingOutSound = new Howl({
        src: ['../assets/audio/bleeding-out.mp3'],
        volume: 0.3
    });

    var lastBossBgm = new Howl({
        src: ['../assets/audio/last-boss-bgm.mp3'],
        loop: true,
        volume: 0.3,
        onend: function () {
            console.log('Finished!');
        }
    });

    var gameOverSound = new Howl({
        src: ['../assets/audio/game-over.mp3'],
        volume: 0.3
    });

    var victorySound = new Howl({
        src: ['../assets/audio/victory.mp3'],
        volume: 0.3
    });

    var newMatchSound = new Howl({
        src: ['../assets/audio/new-match.mp3'],
        volume: 0.3
    });



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

    let enemyCount = 0;

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
    $(`#character-hp-bar`).attr(`max`, `${myMaxHealth}`);
    $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);

    // character creation logic
    $("#create-btn").click(function (event) {

        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        createSound.play();

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

    var round = 0;

    // Attack button calls attack function
    $("#attack-btn").click(function () {
        round++;
        attackLogic();
        attackSound.play();
        console.log(round);
        deathLogic();
        hpBarUpdate();
        scrollToBottom();

    });


    $("#lucky-stab-btn").click(function () {
        round++;
        attackLogic("Lucky Stab");
        deathLogic();
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



    // -------------------- Restart


    $("#restart-btn").click(function () {
        $("#lose-screen").hide();
        $("#character-creator").show();
        $(`#character-hp-bar`).removeClass(`is-warning`).removeClass('is-danger').addClass(`is-success`);
        position = 0;
        $(`#character-hp-bar`).attr(`max`, `${myMaxHealth}`);
        myHealth = myMaxHealth;
        myAttack = 15;
        enemyHealth = 100;
        enemyAttack = 20;
        round = 0;
        $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
        $(`#character-hp-bar`).attr(`value`, `${myHealth}`);
        $("#console-log-1").empty();
        newMatchSound.play();
        bgm.play();
    })

    // -------------------- Functions

    let spawnEnemy = function () {

        $.get("/api/enemy/count", function(data){
            console.log(data);
            enemyCount = data;
        });

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

                $('#enemy-box').addClass('animated jackInTheBox').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('animated jackInTheBox');
                });

                if (data.name === `Lich King`) {
                    bgm.stop();
                    lastBossBgm.stop();
                    lastBossBgm.play();
                };

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
        // let myBleedRate = 0.17;

        let myCritNote = "";

        // let enemyCritRate = 0.5;
        // let enemyCrit = Math.random();
        // let enemyCritRate = 0.5;


        // ability logic
        if (ability === "Lucky Stab") {
            var myCrit = Math.random();
            myNewAttack = myAttack * 0.5;
            missLuckyStab.play();
            myCritNote = `<p>You awkwardly maneuver your attack.</p>`;
        }

        if (ability === "Bleeding Attack") {
            var myCrit = Math.random();
            bleedingAttackSound.play();
            myNewAttack = myAttack;
            enemyBleeding.status = true;
            enemyBleeding.ticksLeft = 3;
            enemyBleeding.damage = myNewAttack;
            console.log(enemyBleeding);
        }

        // crit check
        if (myCrit <= myCritRate) {
            myCritMod = 2;
            luckyStabSound.play();
            myCritNote = `<p id="critical-hit">CRITICAL HIT!</p>
                            <p>You manage to target a gap in their armor.</p>`;
            if (ability === "Lucky Stab") {
                myCritMod = 10;
            }

        }

        // status check
        // if (myCrit <= myBleedRate) { 
        if (enemyBleeding.status === true) {
            bonusDamage += enemyBleeding.damage;
            enemyBleeding.ticksLeft--;
            bleedingOutSound.play();
            myCritNote = "";
            myCritNote += `<p>You slash their flesh, causing <span id="enemy-name">${enemyName}</span> to bleed for <span class="damage-numbers">${enemyBleeding.damage}</span> damage for the next <span class="damage-numbers">${enemyBleeding.ticksLeft}</span> round(s).</p>`;
            if (enemyBleeding.ticksLeft === 0) {
                enemyBleeding.status = false;
                myCritNote = "";
            };
        };
        // }


        // Actual attack happens here. 
        enemyHealth -= myNewAttack * myCritMod + bonusDamage;

        // Attack animation
        $('#enemy-box').addClass('animated wobble').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated wobble')
        });



        // check if enemy survived my attack
        if (enemyHealth > 0) {
            // reduce my health by enemyAttack
            myHealth -= enemyAttack;

            // update console lines
            $("#console-log-1").append(`<p id="round">Round ${round}</p>`)
                .append(myCritNote)
                .append(`\n<p class="damage-numbers">&#9876 <span id="player-name">You</span> inflict <span class="damage-numbers">${myNewAttack * myCritMod}</span> damage.</p>\n`)
                .append(`\n<p class="damage-numbers">&#9876 <span id="enemy-name">${enemyName}</span> counterattacks, inflicting you for <span class="damage-numbers">${enemyAttack}</span> damage!</p>\n<br>`);
        }
    }

    let scrollToBottom = function scrollToBottom() {


        var elem = document.getElementById(`console-box`);
        elem.scrollTop = elem.scrollHeight;
    };


    let deathLogic = function deathLogic() {
        myDeathLogic();
        enemyDeathLogic();
    }

    let myDeathLogic = function myDeathLogic() {

        // after enemy counter-attack, check if my characer died
        if (myHealth <= 0) {
            bgm.stop();
            lastBossBgm.stop();
            gameOverSound.play();
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
            $('#player-box').addClass('animated hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated hinge');
                $("#game-screen").hide();
                $("#lose-screen").show();
            });

        };
    }

    let enemyDeathLogic = function enemyDeathlogic() {
        // check if enemy died before he counter-attacks
        if (enemyHealth <= 0) {


            $("#console-log-1").append(`<p>You have defeated ${enemyName}!</p>\n<br>`);

            // hides the game and shows the winscreen
            if (position === enemyCount) {
                bgm.stop();
                lastBossBgm.stop();
                victorySound.play();
                $("#game-screen").hide();
                $("#win-screen").show();
            };

            $('#enemy-box').addClass('animated hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated hinge');
                spawnEnemy();
            });


            // Sets current round when new enemy spawns
            round = 0
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

    // let timestamp = function timeStamp() {
    //     var date = new Date();
    //     var h = date.getHours();
    //     var m = date.getMinutes();
    //     var s = date.getSeconds();
    //     return `<p id="timestamp">${h}:${m}:${s}</p>`
    // }

});