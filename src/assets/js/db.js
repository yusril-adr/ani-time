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

const getUser = () => {
    return new Promise( (resolve, reject) => { 
        dbPromised
        .then( db => {
            const tx = db.transaction("user", "readonly");
            const store = tx.objectStore("user");
            return store.get(0);
        }).then( score => {
            resolve(score);
        })
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
        });
    });
};

const addAnime= anime => {
    dbPromised
    .then( db => {
        const tx = db.transaction("anime-list", "readwrite");
        const store = tx.objectStore("anime-list");
        store.put(anime);
        return tx.complete;
    });
}

const getAnime = id => {
    return new Promise( (resolve, reject) => {
      dbPromised
        .then( db => {
            const tx = db.transaction("anime-list", "readonly");
            const store = tx.objectStore("anime-list");
            return store.get(id);
        }).then( anime => {
            resolve(anime);
        });
    });
};

const deleteAnime= id => {
    dbPromised
    .then( db => {
        const tx = db.transaction("anime-list", "readwrite");
        const store = tx.objectStore("anime-list");
        return store.delete(id);
    });
}

export { updateUser, getUser, addAnime, getList, getAnime, deleteAnime };