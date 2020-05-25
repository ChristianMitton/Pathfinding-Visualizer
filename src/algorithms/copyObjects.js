function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = new obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function copy2dArrayOfObjects(array){
    let result = []
    for(let row in array){
        let newRow = []
        for(let col in array[row]){
            let copiedObj = clone(array[row][col]);
            newRow.push(copiedObj);
        }
        result.push(newRow);
    }

    return result;
}

function modify(obj, newObj) {

    Object.keys(obj).forEach(function(key) {
      delete obj[key];
    });
  
    Object.keys(newObj).forEach(function(key) {
      obj[key] = newObj[key];
    });
    
  }


// module.exports.copy2dArrayOfObjects = copy2dArrayOfObjects;
// module.exports.clone = clone;
// module.exports.modify = modify;

// export {
//   copy2dArrayOfObjects,
//   modify,
//   clone
// }

export default {copy2dArrayOfObjects, modify, clone}