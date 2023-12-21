var rand = [];
var names = [];
var collision = false;
var count = 0;
function getRandom(array, allowCollision) {
    for (var i_1 = 0; i_1 < array.length; i_1++) {
        rand[i_1] = array[i_1];
    }
    while (collision == false) {
        //randomizer
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        if (allowCollision == false) {
            // for (let i=0; i<array.length; i++)
            //     if (rand[i] == array[i]){
            //         console.log("Collision detected", rand[i], "at index", i)
            //         count++
            //     }
            if (count == 0) {
                // console.log("No collisions")
                collision = true;
            }
            else {
                // console.log("Collision count:", count)
                count = 0;
                collision = false;
            }
        }
    }
    console.log("Shuffling. . .");
    if (allowCollision == false) {
        var allowCollision_1 = 'disabled';
        console.log("[Collision:", allowCollision_1, ']');
    }
    else {
        var allowCollision_2 = 'enabled';
        console.log("[Collision:", allowCollision_2, ']');
    }
    console.log('');
    for (var i_2 = 0; i_2 < array.length; i_2++) {
        console.log(array[i_2], " : ", rand[i_2]);
    }
    return;
}
names =
    // ['a', 'b', 'c', 'd', 'e']
    ['fishda', 'H2O',
        'lahatNgKlase10', 'COJ',
        'kekw', 'Tikoymasarap',
        'kangkong chips', 'Book',
        'Majin Buu', 'Gg',
        'Tito Boyet', 'Bogart',
        'kopi', 'uwianna',
        'Bigblackhawk', 'kamote',
        'Milk Tea', 'chalahedchala',
        'Polaris Express'];
getRandom(names, false);
