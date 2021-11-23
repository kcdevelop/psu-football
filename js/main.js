$(document).ready(function() {

    var win = $(window);
    var menuStatus;
    var schedule = $(".schedule-wrap");
    var games = $(".schedule-block .section-title a");
    var jsonUrl = "data/teams.json";
    var gameType;
    var gameSchd;
    var email = $('input[name="email"]');
    var emailValue;
    var apiForm = "http://api.informal.hzdg.com/forms/dcce40c601fa495d9b1eae4d4ef77023";
    var formData;
    var dataPrep;
    var emRegex = /\b[a-z0-9._%+-]+(@)[a-zA-Z0-9.-]+\.+[a-z]{2,4}\b/;

    // Ajax request to pull game schedule datahttp://127.0.0.1/images/hero.jpg

    function scheduleCtl(data) {

        schedule.stop().animate({

            opacity: 0

        }, function() {

            $.ajax({
                dataType: "json",
                url: jsonUrl,
                data: "games",
                error: function() {

                    gameSchd = '<article class="schedule-pod">' + '\n' +

                    '<div class="left-top pull-left">' + '\n' +
                    '<h2>' + "There are no results for your selection."+ '</h2>' + '\n' +
                    '</div>' + '\n' +
                    '</article>';

                    schedule.append(gameSchd);
                },
                success: function(games) {

                    schedule.empty();

                    for(var n = 0; n < 12; n++) {

                        if(games.team[n].status == data) {

                            opening = '<article class="schedule-pod">' + '\n';

                            teamImg = '<div class="left-top pull-left">' + '\n' + '<div id="' + games.team[n].id + '"' + 'class="icon-wrap"><img class="img-responsive pull-left" src="' + games.team[n].logo + '" alt="' + games.team[n].team + '" /></div>' + '\n';

                            title =   '<h2>' + games.team[n].team + '</h2>' + '\n';

                            detials =  '<p class="details"><span>' + games.team[n].date + '</span>' + games.team[n].event + '</p>' + '\n' + '</div>' + '\n';

                            place = '<div class="right-bottom pull-right">' + '\n' + '<p class="details"><span>' + games.team[n].place + '</span>' + games.team[n].time + '</p>' + '\n' + '</div>' + '\n';

                            closing = '</article>';

                            gameSchd = opening + teamImg + title + detials + place + closing;

                            schedule.append(gameSchd);

                        } else {}

                    }

                    schedule.stop().animate({

                        opacity: 1

                    });
                }
            });
        });
    }
    // Sets Home/Away schedules event

    games.on("click", function(event) {

        event.preventDefault();

        gameType = $(this).attr("data-game");

        switch(gameType) {
            case'home':
            $('a[data-game="away"]').removeClass("active-blue").addClass("inactive-white");
            $('a[data-game="home"]').removeClass("inactive-white").addClass("active-blue");
            break;
            case 'away':
            $('a[data-game="home"]').removeClass("active-blue").addClass("inactive-white");
            $('a[data-game="away"]').removeClass("inactive-white").addClass("active-blue");
            break;
            default:
            $('a[data-game="home"]').removeClass("active-blue inactive-white");
            $('a[data-game="away"]').removeClass("active-blue inactive-white");
        }

        scheduleCtl(gameType);
    });

    // Sets intial schedule to home on load

    scheduleCtl("home");

    // Mobile Menu Manual Reveal

    $(".mobile-menu-icon").on("click", function() {

        menuStatus = $(".container").hasClass("active-menu");

        if(menuStatus != true) {

            $("body").css("backgroundColor", "#002d62");

            $("header, .container").stop().animate({
                left: "-196px"
            }, function() {
                $(".mobile-menu-wrap").stop().fadeIn(500).css("zIndex", "");

            });

            $(".container").addClass("accent active-menu");

        } else {}
    });

     // Mobile Menu Manual Hide

    $(".close-btn").on("click", function() {

        menuStatus = $(".container").hasClass("active-menu");

        if(menuStatus == true) {

            $("header, .container").stop().animate({
                left: "0px"
            }, function() {
                $(".mobile-menu-wrap").stop().fadeOut(100);
                $("body").css("backgroundColor", "#ffffff");
            });

            $(".container").removeClass("accent active-menu");

        } else {}
    });

    // Mobile Menu Auto Hide

    win.resize(function() {

        var testWin = win.width();
        menuStatus = $(".container").hasClass("active-menu");

        if(testWin > 920 && menuStatus == true) {

            $("header, .container").stop().animate({
                left: "0px"
            }, function() {
                $(".mobile-menu-wrap").stop().fadeOut(100);
                $("body").css("backgroundColor", "#ffffff");
            }, 0);

            $(".container").removeClass("accent active-menu");

        } else {}
    });

    // Ajax Email Submission

    $("#email-cta").submit(function(event) {

        event.preventDefault();

        emailValue = $(this).find('input[name="email"]').val();
        formData = $(this);
        dataPrep = formData.serialize();

        if(emailValue.match(emRegex)) {
            $.ajax({
                url: apiForm,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: dataPrep,
                dataType: 'jsonp',
                error: function() {

                    if($(".cta-block-last-success").hasClass("success")) { 
                        $(".cta-block-last-success").removeClass("success"); 
                    }
                    $(".cta-block-last-success").addClass("error");
                    $(".cta-block-last").css("display", "block");

                },
                success: function() {

                    if($(".cta-block-last-success").hasClass("error")) { 
                        $(".cta-block-last-success").removeClass("error"); 
                    }
                    $(".cta-block-last-success").addClass("success");
                    $(".cta-block-last").css("display", "none");
                }
            });

        } else {
            $('input[name="email"]').addClass("error");
        }
    });
});
