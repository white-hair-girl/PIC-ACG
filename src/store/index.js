import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedCollection = localStorage.getItem('collection');
const savedviewHistory = localStorage.getItem('viewHistory');

export default new Vuex.Store({
  state: {
    collection: savedCollection ? JSON.parse(savedCollection) : [],
    viewHistory: savedviewHistory ? JSON.parse(savedviewHistory) : [],
    mangaList: [],
  },
  getters: {

  },
  mutations: {
    //收藏漫画
    addCollection(state, manga) {
      if(manga) {
        
        state.collection.unshift(manga);
  
        localStorage.setItem('collection', JSON.stringify(state.collection));
      }
    },

    //取消收藏漫画
    removeCollection(state, id) {
      for (let i = 0; i < state.collection.length; i++) {
        if (state.collection[i].id == id) {
          state.collection.splice(i, 1);
          localStorage.setItem('collection', JSON.stringify(state.collection));
          return;
        }
      }

    },

    //观看历史
    addViewHistory(state, manga) {

      if(manga) {
        for (let i = 0; i < state.viewHistory.length; i++) {
          if (state.viewHistory[i].id == manga.id) {
  
            state.viewHistory.splice(i, 1);
  
            state.viewHistory.unshift(manga);
  
            localStorage.setItem('viewHistory', JSON.stringify(state.viewHistory));
            return;
          }
        }
  
        state.viewHistory.unshift(manga);
  
        localStorage.setItem('viewHistory', JSON.stringify(state.viewHistory));
        
      }


    },

    //获取当前漫画列表
    getMangaList(state, mangaList) {

      state.mangaList = mangaList;

    }
  },
  actions: {
  },
  modules: {
  }
})
