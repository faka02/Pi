import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRecipes, filterRecipesByDiets, orderByName, orderByHs, getDiets} from "../redux/actions";
import Recipe from "./Recipe";
import Pagination from './Pagination';
import SearchBar from "./SearchBar";
import './Home.css';

const Home = () => {

    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe,indexOfLastRecipe);

    const paginationConst = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getDiets())
        dispatch(getAllRecipes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getAllRecipes());
    }

    function handleFilterDiets(e){
        dispatch(filterRecipesByDiets(e.target.value));
    }

    function handleOrderHS(e){
        e.preventDefault();
        dispatch(orderByHs(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }

    function handleOrderName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);        
    }

    return(
        <div className="homeMain">
            <button className="buttonReload" onClick={e => {handleClick(e)}}>Refresh</button>
            <div className="filter">Filters: 
                <select className="selects" onChange={e => handleOrderName(e)}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                <select className="selects" onChange={e => handleFilterDiets(e)}>
                    <option value='alldiets'>All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="primal">Primal</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="vegan">Vegan</option>
                    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Fodmap Friendly</option>
                </select>
                <select className="selects" onChange={e => handleOrderHS(e)}>
                    <option value='ascHS'>Health Score Ascending</option>
                    <option value='descHS'>Health Score Descending</option>
                </select>
                <Pagination
                    recipesPerPage = {recipesPerPage}
                    recipes = {recipes.length}
                    paginationConst = {paginationConst}
                />
                <SearchBar/>
            </div>
            <div className="wrapper">{                
                currentRecipes?.map(recipe => {
                    return (                        
                        <Link className="homeLink" to={'/home/' + recipe.id}>
                            <Recipe key={recipe.id} recipe={recipe}/>
                        </Link>                        
                    )})}
            </div>
        </div>
    )
}

export default Home