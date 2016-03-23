define(['lodash'], function (_) {
    'use strict';

    return {
        pickFromObj: pickFromObj,
        pickArrayFromObj: pickArrayFromObj
    };

    /**
     * Creates an object composed of the picked `object` properties.
     * Properties names from `object` that do not match any property
     * name from `base` are skipped from new object.
     * 
     * @param {Object} object The source object.
     * @param {Object} base The object used as reference.
     * @returns {Object} Returns the new object.
     * @example
     * 
     * var object = { 'user': 'fred', 'age': 40, 'address': '10th Main St.' };
     * var base = { 'user': '', 'age': 0 }
     *
     * util.pickFromObj(object, base);
     * // => { 'user': 'fred', 'age': 40 }
     */
    function pickFromObj(object, base) {
        var keys = _.keys(base);
        return _.pick(object, keys);
    }

    /**
     * Creates an array of objects composed of the picked properties from
     * each object from `array`. Properties names from object that do not
     * match any property name from `base` are skipped from new object.
     * 
     * @param {Array} array The source objects.
     * @param {Object} base The object used as reference.
     * @returns {Array} Returns the new objects.
     * @example
     * 
     * var object = [
     *  { 'user': 'fred', 'age': 40, 'address': '10th Main St.' },
     *  { 'user': 'john', 'age': 21, 'address': '50th Borough St.' },
     *  { 'user': 'dave', 'age': 63, 'address': '3th Second St.' }
     * ];
     * var base = { 'user': '', 'age': 0 }
     *
     * _.pick(object, base);
     * // => [ { 'user': 'fred', 'age': 40 },
     * //   { 'user': 'john', 'age': 21 },
     * //   { 'user': 'dave', 'age': 63 } ]
     */
    function pickArrayFromObj(array, base) {
        return _.map(array, function (item) {
            return pickFromObj(item, base);
        });
    }
});
