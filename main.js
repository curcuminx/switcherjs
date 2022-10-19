const _ = require('lodash')

// where GROUP1 could be <data_entity> such as "users"
GROUP1 = 'GROUP1';
    // each function in this level corelates with the spcific entity (e.g. user authentication)
    BIGGER_THAN = 'BIGGER_THAN';
        // each logical case for each function will be enlisted in this level, such as "ACCESS_APPROVED"/"ACCESS_DENIED"
        EQ='EQ';
        NA='NA';
    OTHER_FUNC = 'OTHER_FUNC';
        THIRD_OPT = 'THIRD_OPT';
GROUP2 = 'GROUP2';
    HAS_ELMS = 'HAS_ELMS';

const switcher_init = () => {
    let self = {
        utils: {
            // s: (stuff, ...arg) => {
            //     // we could use ...args to make extend switchable to other data-types
            //     const res = typeof stuff;
            //     if(typeof stuff === Boolean)
            //         return stuff.toString()
            //     return (!!stuff).toString
            // },
            cr: (arr) => arr.reduce((condition, comp) => {
                return (comp || condition)
            }, false)
        },
        data: {
            // arr: [1,2,3,4,5,6,7,8,9],
            arr: [],
            arr2: []
        },
        _gc: () => {
            return (Case, ...args) => {
                // this is a global functionality group controller, return a function that is able to pick a controller,
                // take note that in each level only the first argument is used, this way the parameters reduced graduall
                // down to the actuall function in each functionality group and their controllers
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
            const { cr } = self.utils; // use conditions reducer
            const { arr } = self.data;
            let resArr = [];
            let res = (_.isEmpty(arr) && resArr.push(self[BIGGER_THAN][NA])); // ad-hoc conditional


            // falttend conditional
            _.forEach(arr, el => {
                // we can use the "switchable" util to make whatever result useful to the switcher
                flag = cr([,
                    (el > x && "true"), // Although we could use GT which is more meaningful
                    (el < x && "false"), // Same as here, we could use LT, no need for true/false
                    (el == x && EQ),
                    // this could be potentially much, much longer.
                ]);

                res = self[BIGGER_THAN][flag]
                resArr.push(res)
                console.log(res)
            })

            // an example for a self-provoking behaviour in a switcher
            // self._gc(GROUP2, HAS_ELMS, resArr)
            return resArr
        },
        [`${OTHER_FUNC}_func`]: (x) => { return },
        [BIGGER_THAN]: {
            // this way we have no longer need for "true" and "false". we can reduce each problem to types and consequences
            true: "gt",
            false: "lt",
            [EQ]: "eq",
            [NA]: "NA",
            // [fn]: () => {} // could lead to additional execution, otherwise we could just save the results
            // and use them to trigger other cases of the switcher.
         },
        // 2nd functionality group
        [`${GROUP2}_controller`]: (Case, ...args) => {
            return self[`${Case}_func`](...args);
        },
        [`${HAS_ELMS}_func`]: (arr) => {
            const { s } = self.utils
            const res = HAS_ELMS[!!arr];
            console.log(res)

            return res;
        },
        // binding function results to group
        [`${GROUP2}_${HAS_ELMS}`]: {
            true: "noice",
            false: ":("
        },
        // unbinding function results to group
        [`${HAS_ELMS}`]: {
            true: "noice",
            false: ":("
        }
    };
    return self
}

(function () {
    const switcher = switcher_init()._gc()
    console.log(switcher(GROUP1, BIGGER_THAN, 4))

    // switchers could be used to trigger each-other's functionality groups
    // (could be used with for developing API in different teams)
    const switcher2 = switcher_init()._gc()

})();