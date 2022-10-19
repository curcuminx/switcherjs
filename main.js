
BIGGER_THAN = 'BIGGER_THAN'
WHATEVER = 'WHATEVER'
    WHATEVER1 = 'WHATEVER1'
    WHATEVER2 = 'WHATEVER2'

const switcher_init = () => {
    let self = {
        utils: {
            switchable: (bool) => {
                return bool.toString()
            }
        },
        arr: [1,2,3,4,5,6,7,8,9],
        func1: (x) => {
            for(i=0; i < self.arr.length; i++) {
                const res = (self.arr[i] < x).toString();
                console.log(self[BIGGER_THAN][res]);
            }
        },
        func2: (y) => {

        },
        [BIGGER_THAN]: {
            true: "lt",
            false: "bt"
        },
        [WHATEVER]: {
            [WHATEVER1]: function () {},
            [WHATEVER2]: function () {}
        }
    };
    return self
}

(function () {
    const switcher = switcher_init()
    switcher.func1(4)
})();

// (function() {
//     console.log(switcher.true)
//     return
// })();