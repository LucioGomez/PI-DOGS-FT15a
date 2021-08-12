const {Router} = require('express');
const axios = require('axios')
const {Op}= require('sequelize');
//Me traigo las tablas de la base de datos
const {
    Dog,
    Temperament,
    dogs_temperaments
} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//TraerData
const loadData = async () => {
   try{ 
    const arrdata = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=bd856d2c-0fea-4f95-92e2-dc351be490dc')
    const apiInfo = await arrdata.data.map(el => {
        return {
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            url_image: el.image.url,
            temperaments: el.temperament
        }
    })
    ///console.log(apiInfo);
    return apiInfo;
}
    catch(error){
        console.log(error);
    }

}
//loadData()

/////Traer de la bd




router.get("/dogs", async function (req, res) {
    ////// 
    let name = req.query.name
    console.log("Esto es name", name)
    /////
    const dogsAll = await loadData();
    try {
        //traigo los datos de mi db
        const doglenght = await Dog.findAndCountAll()
        // si no hay datos los cargo
        console.log("eso es dog lengt",doglenght.count)
        if (doglenght.count < 1) {
            await Dog.bulkCreate(dogsAll)
        }
        // else{
        //    res.json(doglenght.rows)
        // }
    } catch (error) {
        console.log(error)
    }
    ///////////////////////////// Busco por name 
    if (name) {
      try{  
        let breedName = await Dog.findAll({where:{
             name: {
                 [Op.iLike] : '%' + name + '%'
             }
        }})
       // console.log('Esto es breedname',breedName)
        return res.json(breedName)
    }
     catch(error){
       console.log(error)
     }
    }
    ////////// filter

})

/*
Dog hasmany Temperaments
Temperaments hasmany Dog
*/

module.exports = router;