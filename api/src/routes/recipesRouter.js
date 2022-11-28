const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db');

const recipesRouter = Router();

recipesRouter.get('/', async (req, res) => {
    try {
        //const apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=44c05db7f69943a199eccc956794e2c7&addRecipeInformation=true&number=100`);
        const apiData = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/information&number=100`);
        const apiRecipes = apiData.data.results.map(r => {
            return {
                id: r.id,
                name: r.title,
                image: r.image,
                description: r.summary,
                healthScore: r.healthScore,
                stepByStep: r.analyzedInstructions[0]? r.analyzedInstructions[0].steps.map(el => el.step) : ["no hay pasos"], 
                //el.analyzedInstructions.map(el => el.steps.map(el => el.step))
                diets: r.vegetarian? r.diets.map(el => el).concat('vegetarian') : r.diets.map(el => el),
                //el.vegetarian ? el.diets.map(el => el).concat('vegetarian') : el.diets.map(el => el)   
                dishTypes: r.dishTypes    
            };
        });
    
        const recipesDb = await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
    
        const allRecipes = [...apiRecipes, ...recipesDb];
    
        const name  = req.query.name;
        //console.log(name)
        if(name){
            const recipesByName = allRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            recipesByName.length ?
            res.status(200).json(recipesByName) :
            res.status(404).json('Error: Recipe not found.');
        }else{
            return res.status(200).json(allRecipes);
        }        
    } catch (error) {
        res.status(404).json('Error: Recipes not found.')
    }
});

recipesRouter.post('/', async (req,res) => {
    try {
        let {
            name,
            description,
            healthScore,
            stepByStep,
            diets
        } = req.body
    
        let recipeCreated = await Recipe.create({
            name,
            description,
            healthScore,
            stepByStep
        })
    
        let dietDb = await Diet.findAll({
            where: { name: diets }
        })
    
        recipeCreated.addDiet(dietDb);
        res.status(200).json('Recipe succesfully created.');
    } catch (error) {
        res.status(400).json('Error: this recipe was not posted.')
    }
});

recipesRouter.get('/:id', async (req, res) => {
    try {
        //const apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=44c05db7f69943a199eccc956794e2c7&addRecipeInformation=true&number=100`);
        const apiData = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/information&number=100`);
        const apiRecipes = apiData.data.results.map(r => {
            return {
                id: r.id,
                name: r.title,
                image: r.image,
                description: r.summary,
                healthScore: r.healthScore,
                diets: r.vegetarian? r.diets.map(el => el).concat('vegetarian') : r.diets.map(el => el),
                stepByStep: r.analyzedInstructions[0]? r.analyzedInstructions[0].steps.map(el => el.step) : ["no hay pasos"],
                dishTypes: r.dishTypes 
                //el.analyzedInstructions.map(el => el.steps.map(el => el.step))            
            };
        });
    
        const recipesDb = await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
    
        const allRecipes = [...apiRecipes, ...recipesDb];
    
        const id = req.params.id;
    
        if (id) {
            let recipeId = allRecipes.filter(el => el.id == id)
            recipeId.length ?
            res.status(200).json(recipeId) :
            res.status(400).json('Error: Recipe not found.') 
        }
        
    } catch (error) {
        res.status(400).json('Error.')
    }
});

module.exports = recipesRouter;