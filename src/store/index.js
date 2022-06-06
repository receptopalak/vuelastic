import {
    createStore
} from "vuex";
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls";

const ls = new SecureLS({
    isCompression: false
})

export default createStore({
    state: {
        search: '',
        historySearch: [],
        searchedData: null,
        allDataCount: 0,

    },
    getters: {
        getCurrentSearch: (state) => {
            const search = state.search
            return search
        },
        getHistorySearch: (state) => {
            const historySearch = state.historySearch
            return historySearch
        },
        getSearchedData: (state) => {
            const searchedData = state.searchedData
            return searchedData
        },
        getAllDataCount: (state) => {
            const allDataCount = state.allDataCount
            return allDataCount
        }
    },
    mutations: {
        setCurrentSearch: function (state, search) {
            state.search = search;
        },
        setHistorySearch: function (state, historySearch) {
            state.historySearch.push(historySearch)
        },
        setSearchedData: function (state, searchedData) {
            state.searchedData = searchedData
        },
        setAllDataCount: function (state, allDataCount) {
            state.allDataCount = allDataCount
        },

    },
    actions: {
        search: ({
            commit
        }, history) => {
            commit("setCurrentSearch", history)
            commit("setHistorySearch", history)
        },
        data: ({
            commit
        }, data) => {
            commit("setSearchedData", data)
        },
        countData: ({commit},count) => {
            commit("setAllDataCount", count)
        }
    },
    plugins: [createPersistedState({
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },
    }), ]
})