const data = '{"Riddles":[{"riddle":"A powerful being, that can`t defeat a man, who doesn`t know his own voice.","answer":"siren"},{"riddle":"A walking mirror.","answer":"doppelganger"},{"riddle":"Be careful about your desires.","answer":"genie"},{"riddle":"A flame-breather.","answer":"salamander"},{"riddle":"Answer her or die.","answer":"sphinx"},{"riddle":"The most gruesome meal a man can have is its favourite.","answer":"wendigo"},{"riddle":"A flying death, that burns until life is born.","answer":"phoenix"},{"riddle":"His shining belongings are hidden on the edge of the seven colours.","answer":"leprechaun"}],"Greeting":["Welcome, traveler!","If it`s a knowledge you seek, it may be found in one of these scrolls.","Each scroll is sealed with a riddle about a mythical creature. Solve it to break the seal and acquire a grain of an ancient wisdom!","Beware though! Some of the scrolls contain power, that is beyond any mortal`s comprehension. Avoid those by all means."],"Rest":{"enter":"Here are the doors to the Ancient Library. Are you brave enough to enter?","replyPower":"I came here for power, not for some pity papers! I have no interest in solving riddles!","replyLearning":"I`m eager to learn and uncover the hidden mysteries, no matter the cost.","wrongScroll": "You shouldn`t have opened this scroll! Now your mind is flooded with forbidden knowledge, and your memory is erasing itself. Accept your fate and leave this place, lost soul.","closedDoors":"If so, you came to the wrong place! From now on the doors of the Ancient Library are forever closed for you.","giveUp": "I didn`t expect you to give up this soon, traveler. There won`t be a second chance for you to return here.","win": "The seal is broken and the knowledge is yours. Use it wisely.","loss": "The seal remains intact. It`s time for you to leave, traveler, you`re not ready yet."}}'

const parsedJSON = JSON.parse(data)

const riddles = parsedJSON.Riddles

const greeting = parsedJSON.Greeting

const rest = parsedJSON.Rest

let count = 0

let index

// -----------------------------------------------------------------------------------

$("#enter").text(rest.enter).click(function() {
    $(".outer").hide()
    $("#greeting").show()
    nextGr()
    $(".greetPhr").fadeIn(5000)
})

$(".skip button").click(function() {
    count++
    if (count <= greeting.length - 1) {
        nextGr()
    } else if (count == greeting.length) {
        $("#greeting").fadeOut(6000, () => $(".replyDiv").fadeIn(5000))
    } else {
        return
    }
})

$(".power").text(rest.replyPower).click(function() {
    $(".replyDiv").hide()
    $("body").addClass("bgChange")
    $("#final").show()
    $("#final div").text(rest.closedDoors).fadeIn(6000)
})

$(".learning").text(rest.replyLearning).click(function() {
    $(".replyDiv").hide()
    $("#scrollsOuter").show()
})

$(".scroll").click(function() {
    $("#scrollsOuter").hide()
    showRiddle()
})

$(".giveUp").click(function() {
    $("#final").show()
    $("#final div").text(rest.giveUp).fadeIn(6000)
    $(".inputOuter").hide()
    $("body").addClass("bgChange")
})

$(".break").click(function() {
    $(".inputOuter").hide()
    checkTheAnswer()
})

// -----------------------------------------------------------------------------------------

function nextGr () {
    $(".greetPhr").text(greeting[count])
}

function createRiddle(riddle) {
    return $(".seal").text(riddle)
}

function showRiddle() {
    let arr = riddles.slice()
    let num = Math.floor(Math.random() * 11)
    if (num <= arr.length - 1) {
       index = num
       $(".inputOuter").show()
       return createRiddle(arr[num].riddle)
    } else {
        $("body").addClass("bgChange")
        $("#final").show()
        return $("#final div").text(rest.wrongScroll).fadeIn(6000)
    }
}

function checkTheAnswer() {
    let guess = $("#answer").val().toLowerCase()
    let correct = riddles[index].answer
    if (guess == correct) {
        $("#final").show()
       return  $("#final div").text(rest.win).fadeIn(6000)
    } else {
        $("body").addClass("bgChange")
        $("#final").show()
        return $("#final div").text(rest.loss).fadeIn(6000)
    }
}

