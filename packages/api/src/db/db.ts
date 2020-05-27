import knex from 'knex'
import { dbConfig } from './dbConfig'

const db = knex(dbConfig)

// function getProxyHandler() {
//   return {
//     get: function (target, key) {
//       //proxy through object graph
//       if (typeof target[key] === 'object' && target[key] !== null){
//         return new Proxy(target[key], getProxyHandler());
//       } else {
//         return target[key];      
//       }
//     }
//   }
// }

let handler = {
  get: function(target, key) {
      console.log('getting '+key);
      if (target[key]) {
        console.log('return knex[key] field '+key);
        return target[key];
      } else {
        console.log('calling knex(tableName) function '+key);
        return target(key);
      }
  },
  set: function(target, key, value) {
      console.log('setting '+key);
      target[key] = value;
      return true;
  }
}
let dbProxy = new Proxy(db, handler)

export { dbProxy as db, dbProxy as default }
