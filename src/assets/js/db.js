import { openDB } from 'idb';

const dbPromised = openDB("ANi-TIME", 1, {
    upgrade(db, oldVersion) {
        switch(oldVersion) {
            case 0: 
                const userObjectStore = db.createObjectStore("user", {
                    keyPath: "id",
                });

                const animeObjectStore = db.createObjectStore("anime-list", {
                    keyPath: "mal_id",
                });
        }
    }
})

const updateUser = user => {
    dbPromised
    .then( db => {
        const tx = db.transaction("user", "readwrite");
        const store = tx.objectStore("user");
        store.put(user);
        return tx.complete;
    })
}

const addAnime= anime => {
    dbPromised
    .then( db => {
        const tx = db.transaction("anime-list", "readwrite");
        const store = tx.objectStore("anime-list");
        store.put(anime);
        return tx.complete;
    }).catch( error => { 
        M.toast({html: 'Feature not supported by browser'}) 
    })
}

const getUser = () => {
    return new Promise( (resolve, reject) => { 
        dbPromised
        .then( db => {
            const tx = db.transaction("user", "readonly");
            const store = tx.objectStore("user");
            return store.get(0);
        }).then( score => {
            resolve(score);
        }).catch(error => {
            reject(error);
        });
    })
}

const getList = () => {
    return new Promise( (resolve, reject) => {
      dbPromised
        .then( db => {
            const tx = db.transaction("anime-list", "readonly");
            const store = tx.objectStore("anime-list");
            return store.getAll();
        }).then( list => {
            resolve(list);
        }).catch(error => {
            reject(error);
        });
    });
};

const getAnime = id => {
    return new Promise( (resolve, reject) => {
      dbPromised
        .then( db => {
            const tx = db.transaction("anime-list", "readonly");
            const store = tx.objectStore("anime-list");
            return store.get(id);
        }).then( anime => {
            resolve(anime);
        }).catch(error => {
            reject(error);
        });
    });
};

const deleteList = () => {
    dbPromised
    .then( db => {
        const tx = db.transaction("anime-list", "readwrite");
        const store = tx.objectStore("anime-list");
        return store.clear();
    }).catch( error => { 
        M.toast({html: 'Feature not supported by browser'}) 
    })
}

const deleteAnime= id => {
    dbPromised
    .then( db => {
        const tx = db.transaction("anime-list", "readwrite");
        const store = tx.objectStore("anime-list");
        return store.delete(id);
    }).catch( error => { 
        M.toast({html: 'Feature not supported by browser'}) 
    })
}

export { updateUser, getUser, addAnime, getList, getAnime, deleteList, deleteAnime };