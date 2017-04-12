
function LocalDB(){
  const db_name = "shoppingDB";
  const that = {};
  let idb = null;
  const init = () => {
    const promise = new Promise( (resolve, reject) => {
      const open = window.indexedDB.open(db_name, 1);
      open.onupgradeneeded = () => {
        idb = open.result;
        idb.createObjectStore( db_name, { keyPath: "created"});
      };
      open.onsuccess = () => {
        idb = open.result;
        resolve( true);
      };
    });
    return promise;
  };
  const createShoppingList = ( list) => {
    const promise = new Promise( (resolve, reject) => {
      const tx = idb.transaction( db_name, "readwrite");
      const store = tx.objectStore( db_name);
      store.add( list)
      .onsuccess = (event) => {
        resolve( event.target.result);
      };
    });
    return promise;
  };
  const deleteShoppingList = (by_created) => {
    const promise = new Promise( (resolve, reject) => {
      const tx = idb.transaction( db_name, "readwrite");
      const store = tx.objectStore( db_name);
      store.delete( by_created);
      tx.oncomplete = (e) => {
        resolve( e.target.result);
      };
    });
    return promise;
  };
  const getAllShoppingLists = () => {
    const promise = new Promise( ( resolve, reject) => {
      const tx = idb.transaction( db_name, "readonly");
      const store = tx.objectStore( db_name);
      let shopping_list = [];
      store.openCursor().onsuccess = (event) => {
        const cur = event.target.result;
        if( cur){
          shopping_list.push( cur.value);
          cur.continue();
        } else {
          resolve( shopping_list);
        }
      };
    });
    return promise;
  };
  const findListByCreated = ( created) => {
    const promise = new Promise( (resolve, reject) => {
      const tx = idb.transaction( db_name, "readonly");
      const store = tx.objectStore( db_name);
      const index = store.index( "created");
      const res = index.get( created);
      if( res){
        resolve( res);
      } else {
        reject( "not found");
      }
    });
    return promise;
  };
  const updateShoppingList = ( shopping_list) => {
    const promise = new Promise( ( resolve, reject) => {
      const list = findListByCreated( shopping_list.created)
      .then( ( found_list) => {
        const tx = idb.transaction( db_name, "readonly");
        const store = tx.objectStore( db_name);
        if( found_list.length){
          store.put( shopping_list)
          .onsuccess = (event) => {
            resolve( event.target.result);
          }
        } else {
          store.add( list)
          .onsuccess = (event) => {
            resolve( event.target.result);
          };
        }
      });
    });
    return promise;
  };
  const close = () => {
    idb.close();
  };
  that.init = init;
  that.createShoppingList = createShoppingList;
  that.updateShoppingList = updateShoppingList;
  that.deleteShoppingList = deleteShoppingList;
  that.close = close;
  that.getAll = getAllShoppingLists;
  return that;
};

export default LocalDB();
