import app from 'apprun';
import { getList, getItem } from './hn';

const page_size = 30;

//#region view functions
document.body.addEventListener('click', e => {
  const t = e.target as HTMLElement;
  if (t.matches('.toggle')) {
    t.classList.toggle('closed');
    t.nextElementSibling && t.nextElementSibling.classList.toggle('collapsed');
  }
});

function pluralize(number, label) {
  if (!number) number = 0;
  return (number === 1) ? number + label : number + label + 's'
}

function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

const Comment = ({ comment }) => {
  if (!comment) return;
  return <li className='comment'>
    <div className='meta'>
      <span>by {comment.by}</span> |&nbsp;
      <span>{timeAgo(comment.time)} ago</span>
    </div>
    <div className='text'>{`_html:${comment.text}`}</div>
    <Comments item={comment} />
  </li>
}
const Comments = ({ item }) => {
  if (!item || !item.kids) return;
  const list = item.kids;
  const num = item.kids && item.kids.filter(items => item && !item.deleted && !item.dead).length;
  return <div>
    {num && <div className='toggle'>{pluralize(num, ' comment')} </div>}
    <ul className='comment-list'> {
      list.filter(comment => comment && !comment.deleted)
        .map(comment => <Comment comment={comment} />)
    }
    </ul>
  </div>;
}
const Item = ({ item }) => {
  if (!item) return;
  return <div className='story'>
    <h4><a href={item.url}>{item.title}</a></h4>
    {(item.text) && <div className='text'>{`_html:${item.text}`}</div>}
    <div className='meta'>
      <span>{pluralize(item.score, ' point')}</span> |&nbsp;
        <span>by {item.by}</span> |&nbsp;
        <span>{timeAgo(item.time)} ago</span> |&nbsp;
        <span>{pluralize(item.descendants, ' comment')} (in total)  |&nbsp;</span>
      <span><a onclick={() => history.back()}>back</a></span>
    </div>
    <Comments item={item} />
  </div>
}
const ListItem = ({ item, idx }) => {
  if (!item) return;
  const item_link = `#/item/${item.id}`;
  return <li>
    <div className={'score'}>{item.score}</div>
    <div><a href={item.url || item_link}>{item.title}</a></div>
    <div className='meta'>
      <span>by {item.by}</span> |&nbsp;
        <span>{timeAgo(item.time)} ago</span> |&nbsp;
        <span><a href={`${item_link}`} >{pluralize(item.descendants, ' comment')}</a></span>
    </div>
  </li>
}
const List = ({ list }) => {
  if (!list || !list.items) return;
  return <div>
    <ul className='story-list'> {
      list.items.filter((item, i) => i >= list.min && i < list.max && (typeof item !== 'number'))
        .map(item => <ListItem item={item} idx={list.items.indexOf(item) + 1} />)
    }
    </ul>
    <div className='more'>
      <span>{list.min + 1} - {list.max} ({list.items.length}) &nbsp;</span>
      {list.items && list.max < list.items.length && <a href={`#/${list.type}/${list.max + page_size}`}> |&nbsp; More ...</a>}
    </div>
  </div>;
}
const view = state => {
  if (state instanceof Promise) return;
  const style = (id) => ({ 'font-weight': id === state.id ? 'bold' : 'normal' });
  return <div className={`hn ${state.id}`}>
    <div className='header'>
      <div className='inner'>
        <div style={{ 'float': 'left' }}>
          <span style={{ 'margin-right': '20px' }}>
            <a href='https://github.com/yysun/apprun'>AppRun</a> &#10084;&nbsp;
            <a href='https://news.ycombinator.com'>HN</a>
          </span>
          <a style={style('top')} href={`#/top`}>Top</a> |&nbsp;
          <a style={style('new')} href={`#/new`}>New</a> |&nbsp;
          <a style={style('best')} href={`#/best`}>Best</a> |&nbsp;
          <a style={style('show')} href={`#/show`}>Show</a> |&nbsp;
          <a style={style('ask')} href={`#/ask`}>Ask</a> |&nbsp;
          <a style={style('job')} href={`#/job`}>Jobs</a>
        </div>
      </div>
    </div>
    <div className='main'>
      <div className='inner'>
        {state.type === 'item' ?
          <Item item={state[state.id]} /> :
          <List list={state[state.type]} />}
      </div>
    </div>
    <div className='footer'>
      <div className='inner'>
        Powered by <a href='https://github.com/yysun/apprun'>AppRun</a>,
        Source code: <a href='https://github.com/yysun/apprun-hn'>Github</a>
      </div>
    </div>
  </div>
}
//#endregion

const update = {
  '#': (state, type, id) => {
    type = type || state.type || 'top';
    state.type = type;
    if (type === 'item') {
      state.id = id;
      getItem(state);
    } else {
      if (!state[type]) state[type] = { type, min: 0, max: page_size, items: [] };
      else {
        const max = parseInt(id) || page_size;
        state[type].max = Math.min(max, state[type].items.length);
      }
      getList(state);
    }
  },
  'render': (_, state) => state,
};

app.start('my-app', {}, view, update);