const { Router } = require('express');
const axios = require('axios');
const { Diet } = require('../db');
const dietsRouter = Router();

dietsRouter.get('/', async (req, res) => {
    try {
        //const dietsApi = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=44c05db7f69943a199eccc956794e2c7&addRecipeInformation=true&number=100');
        const dietsApi = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/information&number=100`);
        const diets = dietsApi.data.results.map(el => {
            return el.vegetarian ? el.diets.map(el => el).concat('vegetarian') : el.diets.map(el => el)
        });
        //console.log(diets)
    
        const dietsFlat = diets.flat();
        const dietsSet = [...new Set(dietsFlat)];
        //console.log(dietsSet)
        dietsSet.forEach(el => {
            Diet.findOrCreate({
                where: { name: el }
            })})
        const allDiets = await Diet.findAll();
        res.status(200).json(allDiets);        
    } catch (error) {
        res.status(404).json('Error: Diets not found.');
    }
})

module.exports = dietsRouter;