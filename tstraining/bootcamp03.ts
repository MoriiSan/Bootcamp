let rand:Array<string>=[]
let names:Array<string>=[]
let collision: boolean = false
let count: number = 0;
function getRandom(array:Array<string>, allowCollision:boolean){
    for (let i = 0; i < array.length; i++){
        rand[i] = array[i];
    }

    while (collision == false){
        //randomizer
        for (var i = array.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i+1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        if (allowCollision==false){
            // for (let i=0; i<array.length; i++)
            //     if (rand[i] == array[i]){
            //         console.log("Collision detected", rand[i], "at index", i)
            //         count++
            //     }
                if (count==0){
                    // console.log("No collisions")
                    collision=true
                }else{
                    // console.log("Collision count:", count)
                    count=0
                    collision=false
                }
        }
    }
    console.log("Shuffling. . .")
    if (allowCollision == false){
       let allowCollision = 'disabled';
       console.log("[Collision:", allowCollision, ']')
    }else{
        let allowCollision = 'enabled';
       console.log("[Collision:", allowCollision, ']')
    }
   
    console.log('')
    for(let i=0; i < array.length; i++){
        console.log(array[i]," : ", rand[i])
    }
    return
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

