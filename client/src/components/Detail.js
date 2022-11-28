import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getDetail } from "../redux/actions";
import { useEffect } from "react";
import './Detail.css';

export default function Detail(props){
    // console.log(props)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));

        return () => {
            dispatch(cleanDetail())
        }
    },[dispatch, props.match.params.id])

    const myRecipe = useSelector((state) => state.detail);
    // console.log(myRecipe)
    return(
        <div>
            {
                myRecipe.length > 0 ?
                <div className="divDetail">
                    <img src={myRecipe[0].image} alt='' width={'600px'} height={'300px'}/>
                    <h1 className="dName">{myRecipe[0].name}</h1>
                    <h2 className="lightGreen">Dish Types: {myRecipe[0].dishTypes}</h2>
                    <h2 className="lightGreen">Diets: {!myRecipe[0].createdInDb ? myRecipe[0].diets.map(el => el + (' ')) : myRecipe[0].diets.map(el => el.name + (' '))}</h2>
                    <h3 className="lightGreen">Description: {myRecipe[0].description.replace(/<[^>]*>?/g,'')}</h3>
                    <h3 className="lightGreen">Health Score: {myRecipe[0].healthScore}</h3>
                    <h3 className="lightGreen">Step by step: {myRecipe[0].stepByStep}</h3>
                </div> : <p className="lightGreen">Loading...</p>
            }
            <Link to={'/home'}>
                <button className="btnDetail">{'Go Back'}</button>
            </Link>
        </div>
    )
}