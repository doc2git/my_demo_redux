import React, {Component} from 'react';
import ReactDom from 'react-dom';
import PropsType from 'prop-types';
import {createStore, combineReducers, bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
const onMap = new Map(), SEARCH = 'search', DEL = 'del', ADD = 'ADD', DEL_ALL = 'delAll';
onMap.set(SEARCH, (e)=>({
    type: SEARCH,
    id: Number(e.target.value),
}));
onMap.set(ADD, () => ({type: ADD}));
onMap.set(DEL, (e) => ({
    type: DEL,
    id: Number(e.target.parentNode.id),
  }));
onMap.set(DEL_ALL, () => ({type: DEL_ALL}));
const LIST = 'List';
class NumList extends Component {
  render() {
    let {lis, searchId, searchItem} = this.props[LIST];
    let genItemEle = item => (<li id={item.id} key={item.id}>
      {item.id}: {item.active}
      <button onClick={this.props[DEL]}>删除</button>
    </li>);
    let genStateEle = item => (
      <li id={item.id} key={item.id}>
        {item.id}:
        {
          item.active ? (
          <span>正常</span>) : (
          <span>已放入回收站</span>)
        }
        <button onClick={this.props[DEL]}>删除</button>
      </li>
    );
    let listEle = lis.map(item =>
      item.active === 1 ? genStateEle(item) : null
    );
    console.log(searchItem, '28lsdfjseeeeeeeeee');
    let searchItemEle = searchItem ? genStateEle(searchItem) : null;
    return (<div>
      <form>
      <label htmlFor="search">键入id查找: </label>
      <input id="search" type="text" size="10" onChange={this.props[SEARCH]} value={this.props[LIST].searchId || ''}/>
        <br/>
        {searchItemEle}
        <br/>
      <input type="button" value="添加" onClick={this.props[ADD]}/>
      <input type="button" value="删除全部" onClick={this.props[DEL_ALL]}/>
      <ul>
        {listEle}
      </ul>
      </form>
    </div>);
  }
}
let listReducer = (state = {searchId: null, lis: []}, action) => {
  let items = state.lis;
  switch (action.type) {
    case SEARCH:
      console.log(action.id, '45sdfswwwww');
      return {
        ...state,
        searchId: action.id,
        searchItem: items.find(item => item.id === action.id)
      };
    case ADD:
      items.push({
        id: items.slice(-1)[0] && items.slice(-1)[0].id + 1 || 1,
        active: 1,
      });
      return { lis: items  };
      break;
    case DEL:
      let hiddenId = items.findIndex(item => item.id==action.id);
      console.log(hiddenId, '45lskdfppppp');
      items[hiddenId].active = 0;
      return { lis: items  };
      break;
    case DEL_ALL:
      items = [];
      return { lis: items  };
      break;
  }
  return { ...state, lis: [...items] };
};
const REDEX_DEVTOOL = window.__REDUX_DEVTOOLS_EXTENSION__;
let reducer = combineReducers({
  [LIST]: listReducer });
let store = createStore(reducer, REDEX_DEVTOOL && REDEX_DEVTOOL());
let mapStateToProps = state => {
 return state;
};
let mapDispatchToProps = dispatch => bindActionCreators({
  [SEARCH]: onMap.get(SEARCH),
  [DEL]: onMap.get(DEL),
  [ADD]: onMap.get(ADD),
  [DEL_ALL]: onMap.get(DEL_ALL),
}, dispatch);
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumList);
ReactDom.render(
  (<Provider store={store}>
    <App/>
  </Provider>),
  document.getElementById('demo')
);
/* 
 * console.log('What needs to change in this module?'); 
 * console.log('What would be incoming?');
 * console.log('What would be affected?');
 * console.log('What would be return?');
 */