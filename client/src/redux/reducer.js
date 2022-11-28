import { ERROR, 
    FILTER_BY_DIETS,
     GET_ALL_RECIPES,
      SUCCESS_POST,
       ORDER_BY_NAME,
        ORDER_BY_HS,
         GET_RECIPE_NAME,
          GET_DIETS,
           GET_ID,
            CLEAN_DETAIL } from "./actions";

const initialState = {
    recipes: [],
    error: {},
    success: {},
    allRecipes: [],
    diets: [],
    detail: []
}

export default function rootReducer(state = initialState, action){

    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case SUCCESS_POST:
            return{
                ...state,
                success: action.payload
            }
        case ERROR:
            return{
                ...state,
                error: action.payload
            }
        case FILTER_BY_DIETS:
            const allRecipes = state.allRecipes;
            const dietsFiltered = action.payload === 'alldiets' ? allRecipes : allRecipes.filter(el => el.diets.includes(action.payload))
            return{
                ...state,
                recipes: dietsFiltered
            }
        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc' ?
                state.recipes.sort(function(a,b) {
                    if (a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a,b){
                    if (a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    recipes: sortedArr
                }
        case ORDER_BY_HS:
            let sortedArrHs = action.payload === 'ascHS' ?
            state.recipes.sort(function(a,b) {
                if (a.healthScore > b.healthScore){
                    return 1;
                }
                if(b.healthScore > a.healthScore){
                    return -1;
                }
                return 0;
            }) :
            state.recipes.sort(function(a,b){
                if (a.healthScore > b.healthScore){
                    return -1;
                }
                if(b.healthScore > a.healthScore){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                recipes: sortedArrHs
            }
        case GET_RECIPE_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case GET_ID:
            return {
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: []
            }
        default:
            return {...state}
    }
}