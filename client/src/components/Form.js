import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../redux/actions";
import './Form.css';

const Form = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector(state => state.diets)
    // const message = useSelector(state => state.success);
    // const errorState = useSelector(state => state.error);
    const [error,setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        description: '',
        healthScore: 0,
        stepByStep: '',
        diets: []
    })
    
    useEffect(() => {
        dispatch(getDiets());
        setErrors(validateInput(input));
    },[input, dispatch])

    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(input);
        if(!Object.keys(error).length){
            dispatch(postRecipe(input))
            alert('Recipe created succesfully.')
            setInput({
                name: '',
                description: '',
                healthScore: 0,
                stepByStep: ''
            })
            history.push('/home');
        } else {
            alert('Must fill all the inputs.')
        }
    }

    const validateInput = (input) => {
        const error = {};
        if(!input.name.length) error.name = "Must type a name.";
        if(!input.description.length) error.description = "Must type a description.";
        if(!input.healthScore.length) error.healthScore = "Must type a valid health score between 0 and 100.";
        if(!input.stepByStep.length) error.stepByStep = "Must type the step by step.";
        return error;
    }

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })

    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
    
    const handleDelete = (e) => {
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== e)
        })
    }

    return (
        <div className="divForm">
            <h2 className="titleForm">Create a recipe :</h2>
            <form className="mainForm" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className="labelForm" htmlFor="name">Name: </label>
                    <input className="inputForm" type={'text'} name='name' value={input.name} onChange={handleChange} autoComplete='off'/>
                    <p className="errorForm">{error.name && error.name}</p>
                </div>

                <div>
                    <label className="labelForm" htmlFor="description">Description: </label>
                    <input className="inputForm" type={'text'} name='description' value={input.description} onChange={handleChange} autoComplete='off'/>
                    <p className="errorForm">{error.description && error.description}</p>
                </div>

                <div>
                    <label className="labelForm" htmlFor="healthScore">Health Score: </label>
                    <input className="inputForm" type={'number'} name='healthScore' value={input.healthScore} onChange={handleChange} min='0' max='100' autoComplete='off'/>
                    <p className="errorForm">{error.healthScore && error.healthScore}</p>
                </div>

                <div>
                    <label className="labelForm" htmlFor="stepByStep">Step by step: </label>
                    <input className="inputForm" type={'text'} name='stepByStep' value={input.stepByStep} onChange={handleChange} autoComplete='off'/>
                    <p className="errorForm">{error.stepByStep && error.stepByStep}</p>
                </div>

                <label className="labelForm" htmlFor="diets">Choose Diets: </label>
                
                    <select className="selectForm" onChange={(e) => handleSelect(e)}>
                        {
                            diets.map((diet) => (
                                <option value={diet.name}>{diet.name}</option>
                            ))
                        }
                    </select>
                <button className="btnCreateForm" type="submit">Create</button>
            </form>
            {
                input.diets.map(el =>
                    <div>
                        <p className="p">{el}</p>
                        <button className="btnXForm" onClick={() => handleDelete(el)}>x</button>
                    </div>    
                )
            }
        </div>
    )
}

export default Form