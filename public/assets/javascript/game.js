$(document).ready(function () {

    // May want to transform these as an object and put them in a separate JS file
    var bgm = new Howl({
        src: ['../assets/audio/bgm.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.2,
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
        volume: 0.5
    });

    var newMatchSound = new Howl({
        src: ['../assets/audio/new-match.mp3'],
        volume: 0.3
    });

    var coinFlip = new Howl({
        src: ['../assets/audio/coinflip.mp3'],
        volume: 0.3
    });

    // character outfit values
    var hats = 0;
    var torso = 0;
    var leg = 0;
    var wings = 0;
    var nope = new Howl({
        src: ['../assets/audio/nope.mp3'],
        volume: 0.3
    });

    var levelUpSound = new Howl({
        src: ['../assets/audio/level-up.mp3'],
        volume: 0.2
    });

    var michaelWelcome1 = new Howl({
        src: ['../assets/audio/michael-welcome1.mp3'],
        volume: 2.0
    });

    var michaelWelcome2 = new Howl({
        src: ['../assets/audio/michael-welcome2.mp3'],
        volume: 2.0
    });

    var michaelCompliment1 = new Howl({
        src: ['../assets/audio/michael-compliment1.mp3'],
        volume: 2.0
    });

    var michaelCompliment2 = new Howl({
        src: ['../assets/audio/michael-compliment2.mp3'],
        volume: 2.0
    });

    var michaelSad = new Howl({
        src: ['../assets/audio/michael-sad.mp3'],
        volume: 2.0
    });

    // initial stat values
    let myName = "";
    let myAttack = 150;
    let myHealth = 5000;
    let myImg;

    let myPotions = 3;
    let enemyName = "";
    let enemyImg = "";
    let enemyHealth;
    let enemyAttack;
    let myMaxHealth = myHealth;
    let enemyMaxHealth = enemyHealth;
    let isDefeated = false;

    let isLuckyLearned = false;
    let isBleedLearned = false;

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
    $(".levelup-box").hide();
    $(".shop").hide();

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

    $("#head").on("click", function () {
        hats = hats + 1;
        if (hats === 12) { hats = 0; }
        console.log(hats);
        document.getElementById("one").innerHTML = `<img src="/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}">`;
    });

    $("#torso").on("click", function () {
        torso = torso + 1;
        if (torso === 3) { torso = 0; }
        console.log(torso);
        document.getElementById("one").innerHTML = `<img src="/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}">`;
    });

    $("#leg").on("click", function () {
        leg = leg + 1;
        if (leg === 5) { leg = 0; }
        console.log(leg);
        document.getElementById("one").innerHTML = `<img src="/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}">`;
    });

    $("#wings").on("click", function () {
        wings = wings + 1;
        if (wings === 3) { wings = 0; }
        console.log(wings);
        document.getElementById("one").innerHTML = `<img src="/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}">`;
    });

    $("#create-btn").click(function (event) {
        
        myName = $("#input-name").val().trim();
        // myImg = $("#input-imageUrl").val().trim();

        $("#name-invalid").css("visibility", "hidden");
        $("#img-invalid").css("visibility", "hidden");

        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        if (myName === "") {
            $("#name-invalid").css("visibility", "visible");
            return;
        } else {
        createSound.play();




        // if (myImg === "") {
        //     $("#img-invalid").css("visibility", "visible");
        //     return;
        // }
        // document.getElementById("one").innerHTML = `<img src=>`;
        // if (myImg !== "") {
        //     $("#my-image").attr("src", `/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}`)
        // };

        spawnEnemy();
        $("#my-image").attr("src", `/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}`)
        $("#my-name").text(myName);
        $("#my-health").text(myHealth);
        $("#my-attack").text(myAttack);
        $("#enemy-health").text(enemyHealth);
        $("#enemy-attack").text(enemyAttack);
        $("#enemy-name").text(enemyName);
        $("#character-creator").hide();
        $("#lucky-stab-btn").hide();
        $("#bleed-attack-btn").hide();
        $("#game-screen").show();
        }
    });

    // ----------------------- Combat

    var round = 0;

    // Attack button calls attack function
    $("#attack-btn").click(function () {
        if (isDefeated === false) {
            round++;
            attackLogic();
            attackSound.play();
            deathLogic();
            hpBarUpdate();
            scrollToBottom();
        }
    });

    $("#potion-btn").click(function () {
        if (isDefeated === false && myPotions > 0) {
            myPotions--;
            round++;
            attackLogic("Healing Potion");
            // attackSound.play(); Make this the potion drinking sound
            deathLogic();
            hpBarUpdate();
            $("#console-log-1").append(`<p>You drank a healing potion, you have ` + myPotions + ` potions left.</p>`);
            scrollToBottom();
        } else if (isDefeated === false && myPotions === 0) {
            $("#console-log-1").append(`<p>You don't have any more potions!</p>`);
            scrollToBottom();
        }
    });

    $("#lucky-stab-btn").click(function () {
        if (isDefeated === false && isLuckyLearned === true) {
            round++;
            attackLogic("Lucky Stab");
            deathLogic();
            hpBarUpdate();
            scrollToBottom();
        } else if (isLuckyLearned === false) {
            $("#console-log-1").append(`<p>You haven't learned Lucky Stab yet!</p>`);
            scrollToBottom();
        }
    });

    $("#bleed-attack-btn").click(function () {
        if (isDefeated === false && isBleedLearned === true) {
            round++;
            attackLogic("Bleeding Attack");
            deathLogic();
            hpBarUpdate();
            scrollToBottom();
        } else if (isBleedLearned === false) {
            $("#console-log-1").append(`<p>You haven't learned Bleeding Attack yet!</p>`);
            scrollToBottom();
        }
    });

    // -------------------- Shop

    $(document).on("click", ".shop-option", function () {
        let shopOption = $(this).attr("id");
        switch (shopOption) {

            case "buy-pot-btn":
                myPotions++;
                $("#console-log-1").append(`<p>You take a moment to buy a revitalizing potion.</p>`);
                coinFlip.play();
                michaelWelcome1.stop();
                michaelCompliment2.play();
                break;

            case "buy-protein-btn":
                $("#console-log-1").append(`<p>You chug your pre-fight protein potion and gain ${myAttack * 0.5} attack! LET'S GOOOOO!!</p>`);
                coinFlip.play();
                michaelWelcome1.stop();
                michaelCompliment2.play();
                myAttack = Math.round(myAttack * 1.5);
                $("#my-attack").text(myAttack);
                break;

            case "learn-lucky-btn":
                if (isLuckyLearned === true) {
                    $("#console-log-1").append(`<p>You've already learned Lucky Stab.</p>`);
                    break;
                } else {
                    isLuckyLearned = true;
                    $("#console-log-1").append(`<p>You learn the secrets of Lucky Stab. Lucky you!</p>`);
                    coinFlip.play();
                    $("#learn-lucky-btn").hide();
                    $("#lucky-stab-btn").show();
                    michaelWelcome1.stop();
                    michaelCompliment1.play();
                }
                break;

            case "learn-bleed-btn":
                if (isBleedLearned === true) {
                    $("#console-log-1").append(`<p>You've already learned Bleeding Attack.</p>`);
                    break;
                } else {
                    isBleedLearned = true;
                    $("#console-log-1").append(`<p>You learn the secrets of Bleeding Attack. Bloody good!</p>`);
                    coinFlip.play();
                    $("#learn-bleed-btn").hide();
                    $("#bleed-attack-btn").show();
                    michaelWelcome1.stop();
                    michaelCompliment1.play();
                }
                break;

            case "cancel-buy-btn":
                nope.play();
                michaelWelcome1.stop();
                michaelSad.play();
                break;
        }

        spawnEnemy();
        // $(".shop").hide();
        $('.shop').addClass('animated slideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            // Animation bug
            $(".shop").hide();
            $(this).removeClass('animated slideOutUp');


            // Smooth animation but then it breaks the game after selecting an option
            // $(this).removeClass('animated slideOutUp');
            // $(this).hide();
        });

        scrollToBottom();
    });

    // -------------------- Restart


    $(document).on("click", "#restart-btn", function () {
        $("#lose-screen").hide();
        $("#win-screen").hide(); // Not working
        $("#character-creator").show();
        $(`#character-hp-bar`).removeClass(`is-warning`).removeClass('is-danger').addClass(`is-success`);
        position = 0;
        myMaxHealth = 5000;
        $(`#character-hp-bar`).attr(`max`, `${myMaxHealth}`);
        myHealth = myMaxHealth;
        myAttack = 200;
        enemyHealth = 100;
        enemyAttack = 20;
        round = 0;
        myPotions = 3;
        isDefeated = false;
        isLuckyLearned = false;
        $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
        $(`#character-hp-bar`).attr(`value`, `${myHealth}`);
        $("#console-log-1").empty();
        $("#learn-bleed-btn").show();
        $("#learn-lucky-btn").show();
        newMatchSound.play();
        bgm.play();
    })

    // -------------------- Functions

    let spawnEnemy = function () {

        $.get("/api/enemy/count", function (data) {
            enemyCount = data;
        });

        $.get("/api/enemy/" + position, function (data) {
            if (data) {
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

                if (position === enemyCount) {
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
                isDefeated = false;
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

        if (ability === "Healing Potion") {
            myNewAttack = 0;
            myHealth += myMaxHealth * 0.5;
            if (myHealth > myMaxHealth) {
                myHealth = myMaxHealth
            }
            hpBarUpdate();
            myCritNote = `<p>You take a moment to drink a revitalizing potion.</p>`;
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

        let totalAttack = myNewAttack * myCritMod + bonusDamage;
        // Actual attack happens here. 
        enemyHealth -= totalAttack;

        // Attack animation
        if (totalAttack > 0) {
            $('#enemy-box').addClass('animated wobble').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated wobble')
            });
        };


            // update console lines
            $("#console-log-1").append(`<p id="round">Round ${round}</p>`)
                .append(myCritNote)
                .append(`\n<p class="damage-numbers">&#9876 <span id="player-name">You</span> inflict <span class="damage-numbers">${myNewAttack * myCritMod}</span> damage.</p>\n`)
                .append(`\n<p class="damage-numbers">&#9876 <span id="enemy-name">${enemyName}</span> counterattacks, inflicting <span class="damage-numbers">${enemyAttack}</span> damage!</p>\n<br>`);

        // check if enemy survived my attack
        if (enemyHealth > 0) {
            // reduce my health by enemyAttack
            myHealth -= enemyAttack;
        }
    }

    let scrollToBottom = function scrollToBottom() {


        var elem = document.getElementById(`console-box`);
        elem.scrollTop = elem.scrollHeight;

    };

    function levelUp() {
        myAttack = Math.round(myAttack * 2);
        $("#my-attack").text(myAttack);
        myMaxHealth = Math.round(myMaxHealth * 1.25);
        hpBarUpdate();
        levelUpSound.play();
    }


    let deathLogic = function deathLogic() {
        myDeathLogic();
        enemyDeathLogic();
    }

    let myDeathLogic = function myDeathLogic() {

        // after enemy counter-attack, check if my characer died
        if (myHealth <= 0) {
            isDefeated = true;
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

    function enemyDeathLogic() {
        // check if enemy died before he counter-attacks
        if (enemyHealth <= 0) {
            isDefeated = true;
            levelUp();

            $("#console-log-1").append(`<p>You have defeated ${enemyName}!</p>`);
            $("#console-log-1").append(`<p>You've leveled up! Your max health is now ${myMaxHealth} and your attack is now ${myAttack}!</p>\n<br>`);

            $('#enemy-box').addClass('animated hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated hinge');
                $("#enemy-image").attr("src", "assets/img/seamless-skulls.jpg");


                // hides the game and shows the winscreen
                if (position === enemyCount) {
                    bgm.stop();
                    lastBossBgm.stop();
                    victorySound.play();
                    michaelWelcome1.stop();
                    michaelWelcome2.stop();
                    michaelCompliment1.stop();
                    michaelCompliment2.stop();
                    michaelSad.stop();
                    levelUpSound.stop();
                    becomeLichKing();
                    $("#game-screen").hide();
                    $("#win-screen").show();
                } else {
                    $(".shop").show();
                    $(".shop").addClass('animated slideInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass('animated slideInDown');
                        $("#enemy-image").attr("src", "assets/img/seamless-skulls.jpg");
                        setTimeout(function () {
                            michaelWelcome1.play();
                        }, 700);
                    })
                }

            });

            // Sets current round when new enemy spawns
            round = 0



        };

    }

    let hpBarUpdate = function hpBarUpdate() {

        // Updates player's & enemy's hp bars as they damage each other
        $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
        $(`#character-hp-bar`).attr(`value`, `${myHealth}`);
        $(`#character-hp-bar`).attr(`max`, `${myMaxHealth}`);

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

    function becomeLichKing () {
          // Send the POST request to add character to DB
          let newChar = {
            name: myName,
            img: myImg,
            hp: myMaxHealth,
            attack: myAttack,
            position: position + 1

        };
        $.ajax("/api/enemy", {
            type: "POST",
            data: newChar
        }).then(
            function () {
                console.log("Added " + myName + " to the database");
            }
        );

    }



});