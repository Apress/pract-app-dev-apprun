import app from 'apprun';
import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' });
const db = firebase.database().ref('/v0');

const fetch = async (path): Promise<any> => {
  const ref = db.child(path);
  return new Promise((resolve, reject) => {
    ref.once('value', snapshot => resolve(snapshot.val()), reject);
  })
}

const fetchItem = async ({ id }) => {
  const item = await fetch(`item/${id}`);
  if (item && item.kids) item.kids =
    await Promise.all(item.kids.map((kid) =>
      typeof kid === 'number' ? fetchItem({ id: kid }) : kid));
  return item;
}

export const getItem = (state) => {
  const id = state.id;
  const ref = db.child(`item/${id}`);
  ref.on('value', async snapshot => {
    state[id] = await fetchItem(snapshot.val());
    app.run('render', state);
  })
};

export const getList = async (state) => {
  const type = state.type;
  const list = state[type];
  const fetchListItems = async ({ items, min, max }) => {
    await Promise.all(items.map(async (id, idx) => {
      if (idx >= min && idx < max && (typeof id === 'number')) {
        items[idx] = await fetch(`item/${id}`)
      }
    }));
    app.run('render', state);
  }
  if (list.items.length) return fetchListItems(list);
  const ref = db.child(`${type}stories`);
  ref.on('value', async snapshot => {
    list.items = snapshot.val();
    fetchListItems(list);
  })
};

