import Vue from 'vue'
import Vuex from 'vuex'
import { SSPaging as paging } from '../modules/SSPaging'
import { shared } from '../modules/Shared'

Vue.use(Vuex)

export const PerbandinganKriteria = new Vuex.Store({
    modules: {
        paging, shared
    },
    state: {
        kriteria: [], token: '', kriteriaToCompare: [],
        CR: '', konsistensi: '', jumlahKolom: {},
        hasilPerbandingan: [], eigen: [],
        namaKriteria: '', saveProgress: false, 
        alert: { successSave: false, errorSave: false, }
    },
    mutations: {
        showAlert(state, type) {
            state.alert[type] = true
            setTimeout(() => {
                state.alert[type] = false
            }, 3500)
        },
    },
    actions: {
        getPerbandinganKriteria({ state, commit, dispatch }) {
            commit('getCookie', 'ss_session')
            state.token = state.shared.cookieName
            if (state.token === '') {
                window.location.href = `${state.shared.apiUrl}AuthController/logout/`
            } else {
                $.ajax({
                    url: `${state.shared.apiUrl}admin/PerbandinganKriteriaController/getPerbandingan/${state.token}`,
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    success: data => {
                        state.kriteria = data['kriteria']
                        state.CR = data['CR']
                        state.konsistensi = data['konsistensi']
                        state.jumlahKolom = data['jumlahKolom']
                    }
                })
            }
        },
        getKriteriaToCompare({ state, commit, dispatch }, kriteriaID) {
            commit('getCookie', 'ss_session')
            state.token = state.shared.cookieName
            if (state.token === '') {
                window.location.href = `${state.shared.apiUrl}AuthController/logout/`
            } else {
                $.ajax({
                    url: `${state.shared.apiUrl}admin/PerbandinganKriteriaController/getKriteriaToCompare/${kriteriaID}/${state.token}`,
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    success: data => {
                        state.kriteriaToCompare = data
                    }
                })
            }
        },
        getComparisonResult({ state, commit, dispatch }) {
            commit('getCookie', 'ss_session')
            state.token = state.shared.cookieName
            if (state.token === '') {
                window.location.href = `${state.shared.apiUrl}AuthController/logout/`
            } else {
                $.ajax({
                    url: `${state.shared.apiUrl}admin/PerbandinganKriteriaController/getComparisonResult/${state.token}`,
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    success: data => {
                        state.eigen = data['eigen']
                        state.CR = data['CR']
                        state.konsistensi = data['konsistensi']
                        state.hasilPerbandingan = data['hasil']
                    }
                })
            }
        },
        save({ state, commit, dispatch }) {
            commit('getCookie', 'ss_session')
            state.token = state.shared.cookieName
            var form = $('#formPerbandinganKriteria').serialize()
            if (state.token === '') {
                window.location.href = `${state.shared.apiUrl}AuthController/logout/`
            } else {
                $.ajax({
                    url: `${state.shared.apiUrl}admin/PerbandinganKriteriaController/save/${state.token}`,
                    type: 'POST',
                    data: form,
                    dataType: 'json',
                    beforeSend: () => {
                        state.saveProgress = true
                    },
                    success: msg => {
                        state.saveProgress = false
                        if(msg === 'success') {
                            commit('showAlert', 'successSave')
                            dispatch('getPerbandinganKriteria')
                        } else {
                            commit('showAlert', 'errorSave')
                        }
                    }
                })
            }
        },
        getKriteriaName({ state, commit, dispatch }, kriteriaID) {
            commit('getCookie', 'ss_session')
            state.token = state.shared.cookieName
            if (state.token === '') {
                window.location.href = `${state.shared.apiUrl}AuthController/logout/`
            } else {
                $.ajax({
                    url: `${state.shared.apiUrl}admin/PerbandinganKriteriaController/getKriteriaName/${kriteriaID}/${state.token}`,
                    type: 'GET',
                    crossDomain: true,
                    success: data => {
                        state.namaKriteria = data
                    }
                })
            }
        },
    }
})