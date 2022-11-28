import axios from 'axios';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const SUCCESS_POST = 'SUCCESS_POST';
export const ERROR = 'ERROR';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_HS = 'ORDER_BY_HS';
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME';
export const GET_DIETS = 'GET_DIETS';
export const GET_ID = 'GET_ID';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';

export const getAllRecipes = () => {
    return async function (dispatch){
        try {
            const response = await axios.get('http://localhost:3001/recipes');
            const recipes = response.data;
            return dispatch({
                type: GET_ALL_RECIPES,
                payload: recipes
            })            
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}

export const postRecipe = (recipe) => {
    return async function (dispatch){
        try {
            const response = await axios.post('http://localhost:3001/recipes',recipe);
            const message = response.data;
            return dispatch({
                type: SUCCESS_POST,
                payload: message
            })            
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}

export function filterRecipesByDiets(payload){
    return{
        type: FILTER_BY_DIETS,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByHs(payload){
    return{
        type: ORDER_BY_HS,
        payload
    }
}

export function getRecipeByName(name){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch({
                type: GET_RECIPE_NAME,
                payload: json.data
            })
        }catch(error){
            return dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}

export function getDiets(){
    return async function (dispatch){
        try {
            var dietsGet = await axios.get(`http://localhost:3001/diets`);
            return dispatch({
                type: GET_DIETS,
                payload: dietsGet.data
            })            
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            var detailId = await axios.get('http://localhost:3001/recipes/' + id);
            // console.log(detailId.data)
            return dispatch ({
                type: GET_ID,
                payload: detailId.data
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}

export const cleanDetail = () => {
    return {type: CLEAN_DETAIL}
}
