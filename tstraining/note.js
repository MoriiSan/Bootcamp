var SomeArr = [];
var OrgArray = [];
var CollCheck = 0;
var goods = false;
function RandomizeArr(AnArray, Collision) {
    for (var i_1 = 0; i_1 < AnArray.length; i_1++) {
        OrgArray[i_1] = AnArray[i_1];
    }
    while (goods == false) {
        console.log("Shuffling...");
        //RANDOMIZER1
        // AnArray.sort(() => (Math.random() > .5) ? 1 : -1);
        //RANDOMIZER1
        //RANDOMIZER2
        for (var i = AnArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = AnArray[i];
            AnArray[i] = AnArray[j];
            AnArray[j] = temp;
        }
        //RANDOMIZER2
        if (Collision == false) {
            for (var i_2 = 0; i_2 < AnArray.length; i_2++)
                if (OrgArray[i_2] == AnArray[i_2]) {
                    console.log("Collision Detected at", OrgArray[i_2], "at index [", i_2, "]");
                    CollCheck++;
                }
            if (CollCheck == 0) {
                console.log("No Collisions Detected");
                goods = true;
            }
            else {
                console.log("collcheck", CollCheck);
                CollCheck = 0;
                goods = false;
            }
        }
    }
    for (var i_3 = 0; i_3 < AnArray.length; i_3++) {
        console.log(AnArray[i_3], "to", OrgArray[i_3]);
    }
    return;
}
SomeArr = ["fishda", "H2OlahatNgKlase10", "COJ", "kekw", "Tikoymasarap", "kangkong chips", "Book", "Majin Buu", "Gg", "Tito Boyet", "Bogart", "kopi", "uwianna", "Bigblackhawk", "kamote", "Milk Tea", "chalahedchala", "Polaris Express"];
RandomizeArr(SomeArr, false);
