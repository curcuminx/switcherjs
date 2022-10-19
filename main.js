
GROUP1 = 'GROUP1';
    BIGGER_THAN = 'BIGGER_THAN';
        EQ='EQ';
        NA='NA';
    OTHER_FUNC = 'OTHER_FUNC';
        THIRD_OPT = 'THIRD_OPT';
GROUP2 = 'GROUP2';
    HAS_ELMS = 'HAS_ELMS';

const switcher_init = () => {
    let self = {
        utils: {
            s: (stuff, ...arg) => {
                // we could use ...args to make extend switchable to other data-types
                const res = typeof stuff;
                if(typeof stuff === Boolean)
                    return stuff.toString()
                return (!!stuff).toString
            }
        },
        data: {
            arr: [1,2,3,4,5,6,7,8,9],
            arr2: []
        },
        _gc: () => {
            return (Case, ...args) => {
                // this is a global functionality group controller, return a function that is able to pick a controller
                return self[`${Case}_controller`](...args)
            }
        },
        [`${GROUP1}_controller`]: (Case, ...args) => {
            // this function should be able to run whatever function in the "BIGGER_THAN" functionality group,
            // depending upon the the implementation, functions could be ran in whatever manner needed,
            // for example this section could be used to invoke several function one after another for certain types of triggers
            return self[`${Case}_func`](...args);
        },
        [`${BIGGER_THAN}_func`]: (x) => {
            const { arr } = self.data;
            let res;
            let resArr = [];

            for(i=0; i < arr.length; i++) {
                // we can use the "switchable" util to make whatever result useful to the switcher
                res = (!arr[i]);
                res = (!!arr[i] || arr[i] < x).toString();
                console.log(self[BIGGER_THAN][res])
                resArr.push(res)
            }

            // an example for a self-provoking behaviour in a switcher
            self._gc(GROUP2, HAS_ELMS, resArr)
        },
        [`${OTHER_FUNC}_func`]: (x) => { return },
        [BIGGER_THAN]: {
            true: "lt",
            false: "bt",
            [EQ]: "eq"
            [NA]: "NA"
    },
        // 2nd functionality group
        [`${GROUP2}_controller`]: (Case, ...args) => {
            return self[`${Case}_func`](...args);
        },
        [`${HAS_ELMS}_func`]: (arr) => {
            const { s } = self.utils
            const res = self[s(HAS_ELMS)];

            return res;
        },
        // binding function results to group
        [`${GROUP2}_${HAS_ELMS}`]: {
            true: "noice",
            false: ":(",
        },
        // unbinding function results to group
        [`${HAS_ELMS}`]: {
            true: "noice",
            false: ":(",
        }
    };
    return self
}

(function () {
    const switcher = switcher_init()._gc()
    switcher(GROUP1, BIGGER_THAN, 4)

    // switchers could be used to trigger each-other's functionality groups
    // (could be used with for developing API in different teams)
    const switcher2 = switcher_init()._gc()

})();

// (function() {
//     console.log(switcher.true)
//     return
// })();