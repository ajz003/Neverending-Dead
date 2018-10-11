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

    var drinkPotion = new Howl({
        src: ['../assets/audio/drink-potion.mp3'],
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

    var nope = new Howl({
        src: ['../assets/audio/nope.mp3'],
        volume: 0.3
    });

    var levelUpSound = new Howl({
        src: ['../assets/audio/level-up.mp3'],
        volume: 0.2
    });

    var michaelWelcome1 = new Howl({
        src: ['../assets/audio/michael-welcome.wav', '../assets/audio/michael-welcome.mp3'],
        volume: 0.9
    });

    var michaelCompliment1 = new Howl({
        src: ['../assets/audio/michael-compliment1.wav', '../assets/audio/michael-compliment1.mp3'],
        volume: 0.9
    });

    var michaelCompliment2 = new Howl({
        src: ['../assets/audio/michael-compliment2.wav', '../assets/audio/michael-compliment2.mp3'],
        volume: 0.9
    });

    var michaelSad = new Howl({
        src: ['../assets/audio/michael-sad.wav', '../assets/audio/michael-sad.mp3'],
        volume: 0.9
    });

    var michaelAngry1 = new Howl({
        src: ['../assets/audio/michael-angry1.wav', '../assets/audio/michael-angry1.mp3'],
        volume: 1.0
    });

    var michaelCongratz2 = new Howl({
        src: ['../assets/audio/michael-congratz-2.wav', '../assets/audio/michael-congratz-2.mp3'],
        volume: 1.0
    });

    var michaelCd1 = new Howl({
        src: ['../assets/audio/michael-cooldown-1.wav', '../assets/audio/michael-cooldown-1.mp3'],
        volume: 1.0
    });

    var michaelCd4 = new Howl({
        src: ['../assets/audio/michael-cooldown-4.wav', '../assets/audio/michael-cooldown-4.mp3'],
        volume: 1.0
    });

    var michaelAddict = new Howl({
        src: ['../assets/audio/michael-addict.wav', '../assets/audio/michael-addict.mp3'],
        volume: 1.0
    });

    var michaelNoMoney = new Howl({
        src: ['../assets/audio/michael-no-money.mp3'],
        volume: 1.0
    });

    // character outfit values
    var hats = 0;
    var torso = 0;
    var leg = 0;
    var wings = 0;


    // initial stat values
    let myName = "";
    let myAttack = 25;
    let myHealth = 300;
    let myImg;

    let myPotions = 3;
    let enemyName = "";
    let enemyImg = "";
    let enemyHealth;
    let enemyAttack;
    let myMaxHealth = myHealth;
    let enemyMaxHealth = enemyHealth;
    let isDefeated = false;

    // Shop Costs
    const healingPotCost = 100;
    const proteinPotCost = 300;
    const luckyStabCost = 500;
    const bleedingAttackCost = 600;

    let playerGold = 0;

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
        onCD: false,
        ticksLeft: 0,
        ticksLeftCD: 0,
        damage: 0
    }

    let luckyCD = {
        onCD: false,
        ticksLeft: 0
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

    // Starting potions
    $("#potion-btn").html(`Drink a Potion (${myPotions})`);

    // character creation logic

    $("#head").on("click", function () {
        hats = hats + 1;
        if (hats === 12) {
            hats = 0;
        }
        console.log(hats);
        document.getElementById("insert-avatar").innerHTML = `<img class="image animated flip" id="avatar-image" src="/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}">`;
    });

    $("#torso").on("click", function () {
        torso = torso + 1;
        if (torso === 3) {
            torso = 0;
        }
        console.log(torso);
        document.getElementById("insert-avatar").innerHTML = `<img class="image animated flip" id="avatar-image" src="/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}">`;
    });

    $("#leg").on("click", function () {
        leg = leg + 1;
        if (leg === 5) {
            leg = 0;
        }
        console.log(leg);
        document.getElementById("insert-avatar").innerHTML = `<img class="image animated flip" id="avatar-image" src="/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}">`;
    });

    $("#wings").on("click", function () {
        wings = wings + 1;
        if (wings === 3) {
            wings = 0;
        }
        console.log(wings);
        document.getElementById("insert-avatar").innerHTML = `<img class="image animated flip" id="avatar-image" src="/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}">`;
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
            michaelAngry1.stop();
            michaelAngry1.play();
            return;
        } else {
            michaelAngry1.stop();
            createSound.play();





            // if (myImg === "") {
            //     $("#img-invalid").css("visibility", "visible");
            //     return;
            // }
            // document.getElementById("insert-avatar").innerHTML = `<img src=>`;
            // if (myImg !== "") {
            //     $("#my-image").attr("src", `/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}`)
            // };


            spawnEnemy();

            $(`.player-gold`).html(`${playerGold}&nbsp<i class="fas fa-coins"></i>`);
            $("#potion-btn").html(`Drink a Potion (${myPotions})`);
            $("#my-image").attr("src", `/test?hat=${hats}&torso=${torso}&leg=${leg}&wings=${wings}`);
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
            deathLogic();
            hpBarUpdate();
            $("#console-log-1").append(`<p>You drank a healing potion, you have ` + myPotions + ` potions left.</p>`);
            $("#potion-btn").html(`Drink a Potion (${myPotions})`);
            scrollToBottom();
        } else if (isDefeated === false && myPotions === 0) {
            michaelAddict.stop(); // Prevent spam and overlapping sounds
            michaelAddict.play();
            $("#console-log-1").append(`<p>You don't have any more potions!</p>`);
            scrollToBottom();
        }
    });

    $("#lucky-stab-btn").click(function () {
        if (isDefeated === false && luckyCD.onCD === false) {
            round++;
            attackLogic("Lucky Stab");
            deathLogic();
            hpBarUpdate();
            scrollToBottom();
        } else {
            michaelCompliment1.stop();
            michaelCd1.play();
        }
    });

    $("#bleed-attack-btn").click(function () {
        if (isDefeated === false && enemyBleeding.onCD === false) {
            round++;
            attackLogic("Bleeding Attack");
            deathLogic();
            hpBarUpdate();
            scrollToBottom();
        } else {
            michaelCompliment1.stop();
            michaelCd4.play();
        }
    });


    // -------------------- Button Delay

    $(".button").click(function () {

        $(".button").css("pointer-events", "none");
        setTimeout(function () { 
            $(".button").css("pointer-events", "auto");
            $(".locked-btn").css("pointer-events", "none"); 
        }, 1000)

    })

    $(".locked-btn").css("pointer-events", "none");

    // -------------------- Shop
    $(`.player-gold`).html(`${playerGold}&nbsp<i class="fas fa-coins"></i>`);
    $(`#potion-price`).html(`&nbsp${healingPotCost}&nbsp<i class="fas fa-coins"></i>`);
    $(`#protein-price`).html(`&nbsp${proteinPotCost}&nbsp<i class="fas fa-coins"></i>`);
    $(`#stab-price`).html(`&nbsp${luckyStabCost}&nbsp<i class="fas fa-coins"></i>`);
    $(`#bleeding-price`).html(`&nbsp${bleedingAttackCost}&nbsp<i class="fas fa-coins"></i>`);

    $(document).on("click", ".shop-option", function () {
        let shopOption = $(this).attr("id");
        let isChoiceMade = false;
        switch (shopOption) {

            case "buy-pot-btn":
                if (playerGold >= healingPotCost) {
                    myPotions++;
                    $("#console-log-1").append(`<p>You take a moment to buy a revitalizing potion.</p>`);
                    $("#potion-btn").html(`Drink a Potion (${myPotions})`)
                    coinFlip.play();
                    michaelWelcome1.stop();
                    michaelCompliment2.play();
                    playerGold -= healingPotCost;
                    $(`.player-gold`).html(`${playerGold}&nbsp<i class="fas fa-coins"></i>`);
                    isChoiceMade = true;
                    break;
                } else {
                    michaelWelcome1.stop();
                    michaelNoMoney.stop();
                    michaelNoMoney.play();
                    $("#console-log-1").append(`<p>You don't have enough gold.</p>`);
                    break;
                }

            case "buy-protein-btn":
                if (playerGold >= proteinPotCost) {
                    $("#console-log-1").append(`<p>You chug your pre-fight protein potion and gain ${myAttack * 0.5} attack! LET'S GOOOOO!!</p>`);
                    coinFlip.play();
                    michaelWelcome1.stop();
                    michaelCompliment2.play();
                    playerGold -= proteinPotCost;
                    $(`.player-gold`).html(`${playerGold}&nbsp<i class="fas fa-coins"></i>`);
                    myAttack = Math.round(myAttack * 1.5);
                    $("#my-attack").text(myAttack);
                    isChoiceMade = true;
                    break;
                } else {
                    michaelWelcome1.stop();
                    michaelNoMoney.stop();
                    michaelNoMoney.play();
                    $("#console-log-1").append(`<p>You don't have enough gold.</p>`);
                    break;
                }

            case "learn-lucky-btn":
                if (playerGold >= luckyStabCost) {
                    $("#console-log-1").append(`<p>You learn the secrets of Lucky Stab. Lucky you!</p>`);
                    coinFlip.play();
                    $("#learn-lucky-btn").hide();
                    $("#lucky-stab-btn").show();
                    michaelWelcome1.stop();
                    michaelCompliment1.play();
                    playerGold -= luckyStabCost;
                    $(`.player-gold`).html(`${playerGold}&nbsp<i class="fas fa-coins"></i>`);
                    isChoiceMade = true;
                } else {
                    michaelWelcome1.stop();
                    michaelNoMoney.stop();
                    michaelNoMoney.play();
                    $("#console-log-1").append(`<p>You don't have enough gold.</p>`);
                }
                break;

            case "learn-bleed-btn":
                if (playerGold >= bleedingAttackCost) {
                    $("#console-log-1").append(`<p>You learn the secrets of Bleeding Attack. Bloody good!</p>`);
                    coinFlip.play();
                    $("#learn-bleed-btn").hide();
                    $("#bleed-attack-btn").show();
                    michaelWelcome1.stop();
                    michaelCompliment1.play();
                    playerGold -= bleedingAttackCost;
                    $(`.player-gold`).html(`${playerGold}&nbsp<i class="fas fa-coins"></i>`);
                    isChoiceMade = true;
                    break;
                } else {
                    michaelWelcome1.stop();
                    michaelNoMoney.stop();
                    michaelNoMoney.play();
                    $("#console-log-1").append(`<p>You don't have enough gold.</p>`);
                    break;
                }

            case "cancel-buy-btn":
                nope.play();
                michaelWelcome1.stop();
                michaelNoMoney.stop();
                michaelSad.play();
                isChoiceMade = true;
                break;
        }
        if (isChoiceMade === true) {
            spawnEnemy();

            $('.shop').addClass('animated slideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(".shop").hide();
                $(this).removeClass('animated slideOutUp');
            });

            scrollToBottom();
        }
        console.log("Player gold after: " + playerGold)
    });

    // -------------------- Restart


    $(document).on("click", "#restart-btn", function restart() {
        $("#lose-screen").hide();
        $("#win-screen").hide();
        $("#character-creator").show();
        $(`#character-hp-bar`).removeClass(`is-warning`).removeClass('is-danger').addClass(`is-success`);
        position = 0;
        myMaxHealth = 300;
        $(`#character-hp-bar`).attr(`max`, `${myMaxHealth}`);
        myHealth = myMaxHealth;
        myAttack = 25;
        round = 0;
        myPotions = 3;
        playerGold = 0;
        isDefeated = false;
        isLuckyLearned = false;
        $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
        $(`#character-hp-bar`).attr(`value`, `${myHealth}`);
        $("#console-log-1").empty();
        $("#learn-bleed-btn").show();
        $("#learn-lucky-btn").show();
        michaelCongratz2.stop();
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
                // If this enemy exists, fill page with its stat
                enemyName = data.name;
                enemyImg = data.img;
                document.getElementById("enemy-pic").innerHTML = `<img src="/test?hat=${data.hat}&torso=${data.torso}&leg=${data.leg}&wings=${data.wings}">`
                enemyHealth = data.hp;
                enemyAttack = data.attack;
                enemyMaxHealth = enemyHealth;
                enemyBleeding.status = false;
                enemyBleeding.ticksLeft = 0;
                enemyBleeding.damage = 0;

                $('#enemy-box').addClass('animated jackInTheBox').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('animated jackInTheBox');
                });

                console.log("The data.boss value is " + data.boss);

                if (data.boss === 1) {
                    document.getElementById("enemy-pic").innerHTML = `<img src="/boss">`
                };

                if (position + 1 === enemyCount) {
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

        if (luckyCD.onCD === true) {
            luckyCD.ticksLeft--;
            $("#lucky-stab-btn").css("opacity", (-luckyCD.ticksLeft / 3) + 1)
        }
        if (luckyCD.ticksLeft === 0) {
            luckyCD.onCD = false;
        }

        if (enemyBleeding.onCD === true) {
            enemyBleeding.ticksLeftCD--;
            console.log(enemyBleeding.ticksLeftCD)
            $("#bleed-attack-btn").css("opacity", (-enemyBleeding.ticksLeftCD / 3) + 1)
        }
        if (enemyBleeding.ticksLeftCD === 0) {
            enemyBleeding.onCD = false;
        }



        // ability logic
        if (ability === "Lucky Stab") {
            if (luckyCD.onCD === false) {
                luckyCD.onCD = true;
                luckyCD.ticksLeft = 3;
                $("#lucky-stab-btn").css("opacity", 0.1)
                var myCrit = Math.random();

                if (myCrit > myCritRate) {
                    myNewAttack = myAttack * 0.5;
                    missLuckyStab.play();
                    myCritNote = `<p>You awkwardly maneuver your attack.</p>`;
                }
                else {
                    myCritMod = 2;
                    luckyStabSound.play();
                    myCritNote = `<p id="critical-hit">CRITICAL HIT!</p>
                                <p>You manage to target a gap in their armor.</p>`;
                    if (ability === "Lucky Stab") {
                        myCritMod = 10;
                    }

                }
            }
        }

        if (ability === "Healing Potion") {
            myNewAttack = 0;
            myHealth += myMaxHealth * 0.5;
            if (myHealth > myMaxHealth) {
                myHealth = myMaxHealth
            }
            hpBarUpdate();
            drinkPotion.play();
            myCritNote = `<p>You take a moment to drink a revitalizing potion.</p>`;
        }

        if (ability === "Bleeding Attack") {
            if (enemyBleeding.onCD === false) {
                enemyBleeding.onCD = true;
                enemyBleeding.ticksLeft = 3;
                enemyBleeding.ticksLeftCD = 3;
                // var myCrit = Math.random();
                bleedingAttackSound.play();
                myNewAttack = myAttack;
                enemyBleeding.damage = Math.floor(myNewAttack * 0.25);
                console.log(enemyBleeding);
                myCritNote = "";
                myCritNote += `<p>You slash their flesh, causing <span id="enemy-name">${enemyName}</span> to bleed each round for <span class="damage-numbers">${enemyBleeding.damage}</span> damage for the next <span class="damage-numbers">${enemyBleeding.ticksLeft}</span> round(s).</p>`;
                enemyBleeding.status = true;
                $("#bleed-attack-btn").css("opacity", 0.1)
            }
        }

        // status check
        // if (myCrit <= myBleedRate) { 
        if (enemyBleeding.status === true) {
            bonusDamage += enemyBleeding.damage;
            enemyBleeding.ticksLeft--;
            bleedingOutSound.play();
            if (enemyBleeding.ticksLeft === 0) {
                enemyBleeding.status = false;
                myCritNote += `<p><span id="enemy-name">${enemyName}</span> bleeds for <span class="damage-numbers">${enemyBleeding.damage}</span> damage.<span id="enemy-name"> ${enemyName}</span> is no longer bleeding.</p>`;
            } else {
                myCritNote += `<p><span id="enemy-name">${enemyName}</span> bleeds for <span class="damage-numbers">${enemyBleeding.damage}</span> damage.</p>`;
            }
        };

        // }

        let totalAttack = myNewAttack * myCritMod + bonusDamage;
        // Actual attack happens here. 
        enemyHealth -= totalAttack;

        // Attack animation
        if (totalAttack > 0) {

            $('#player-box').addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated bounce')
            });

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
        if (position !== enemyCount) {
            myAttack = Math.round(myAttack * 1.5);
            $("#my-attack").text(myAttack);
            myMaxHealth = Math.round(myMaxHealth * 1.25);
            hpBarUpdate();
            levelUpSound.play();
        }
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
                hat: hats,
                torso: torso,
                leg: leg,
                wings: wings,
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

            // Gold rewards
            playerGold += 100 + Math.round(enemyMaxHealth / 5) + Math.round(enemyAttack / 2);
            $(`.player-gold`).html(`${playerGold}&nbsp<i class="fas fa-coins"></i>`);

            $("#console-log-1").append(`<p>You have defeated ${enemyName}!</p>`);
            $("#console-log-1").append(`<p>You've leveled up! Your max health is now <span class="damage-numbers">${myMaxHealth}</span> and your attack is now <span class="damage-numbers">${myAttack}</span>!</p>\n<br>`);

            $('#enemy-box').addClass('animated hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated hinge');
                $("#enemy-image").attr("src", "assets/img/seamless-skulls.jpg");


                // hides the game and shows the winscreen
                if (position === enemyCount) {
                    bgm.stop();
                    lastBossBgm.stop();
                    victorySound.play();
                    michaelWelcome1.stop();
                    michaelCompliment1.stop();
                    michaelCompliment2.stop();
                    michaelSad.stop();
                    levelUpSound.stop();
                    becomeLichKing();
                    $("#game-screen").hide();
                    $("#win-screen").show();
                    michaelCongratz2.play();
                } else {
                    $(".shop").show();
                    console.log("Player Gold: " + playerGold);
                    $(".shop").addClass('animated slideInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass('animated slideInDown');

                        $("#enemy-image").attr("src", "assets/img/seamless-skulls.jpg");

                        michaelWelcome1.play();

                    });
                }
            });

            // Sets current round when new enemy spawns
            round = 0

            enemyBleeding = {
                status: false,
                onCD: false,
                ticksLeft: 0,
                ticksLeftCD: 0,
                damage: 0
            }
            luckyCD = {
                onCD: false,
                ticksLeft: 0
            }

            $("#lucky-stab-btn").css("opacity", 1)
            $("#bleed-attack-btn").css("opacity", 1)

        };

    }

    let hpBarUpdate = function hpBarUpdate() {

        // Updates player's & enemy's hp bars as they damage each other
        if (enemyHealth < 0) {
            $(`#enemy-hp-bar`).attr(`value`, `0`);
        } else {
            $(`#enemy-hp-bar`).attr(`value`, `${enemyHealth}`);
        }

        if (myHealth < 0) {
            $(`#character-hp-bar`).attr(`value`, `0`);
        } else {
            $(`#character-hp-bar`).attr(`value`, `${myHealth}`);
        }

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

        if (myHealth > (myMaxHealth * 0.3)) {
            $(`#character-hp-bar`).removeClass(`is-danger`).addClass(`is-warning`);
            if (myHealth > (myMaxHealth * 0.5)) {
                $(`#character-hp-bar`).removeClass(`is-warning`).addClass(`is-success`);
            }
        }

        if (enemyHealth <= (enemyMaxHealth * 0.5)) {
            $(`#enemy-hp-bar`).removeClass(`is-success`).addClass(`is-warning`);
            if (enemyHealth <= (enemyMaxHealth * 0.3)) {
                $(`#enemy-hp-bar`).removeClass(`is-warning`).addClass(`is-danger`);
            }
        };
    }

    function becomeLichKing() {
        // Send the POST request to add character to DB
        let newChar = {
            name: myName,
            hat: hats,
            torso: torso,
            leg: leg,
            wings: wings,
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