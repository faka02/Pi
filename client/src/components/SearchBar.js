import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../redux/actions";
import './SearchBar.css';

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipeByName(name));
        setName('');
    }

    return (
        <div>
            <input className="input" type={'text'} placeholder={'Type...'} onChange={(e) => handleInputChange(e)}/>
            <button className="searchBtn" type={"submit"} onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}