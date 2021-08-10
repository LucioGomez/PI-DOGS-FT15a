const {
    Router
} = require('express');
const axios = require('axios')
require('sequelize');
//Me traigo las tablas de la base de datos
const {Dog,Temperament,dogs_temperaments} = require('../db.js');
const { Sequelize } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//TraerData
const loadData = async () => {
    const arrdata = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=bd856d2c-0fea-4f95-92e2-dc351be490dc')
    //console.log("Esto es arrdata", arrdata)
    // let {name,id} = arrdata.find
    // console.log(arrdata.id)
    const apiInfo = await arrdata.data.map(el =>{
        return{
            name: el.name,
            id: el.id,
            height: el.height.metric,
            weight: el.weight.metric,
            img_url: el.image.url
        } 
    })
    console.log(apiInfo);
    return apiInfo;
      
}
loadData()
router.get("/dogs", async function (req, res, next) {
    const dogsAll = await loadData();
    try {
        //traigo los datos de mi db
        let doglenght = await Dog.findAll()
            // si no hay datos los cargo 
    if(!doglenght.lenght){ 
        await Dog.bulkCreate(dogsAll) 
         console.log(dogsAll)
         res.json("entre al if")
    }
    //res.json("no entre")
    }        
     catch (error) {
        next(error)
    }
})

/*
Dog hasmany Temperaments
Temperaments hasmany Dog
*/

module.exports = router;