let db = require('../../database/models');
const sequelize = db.sequelize;
const log = console.log;

const productAPIController = {
    list: async (req, res) =>{
        try{ 
            let products = await db.Products.findAll({
            include: [
                {association: 'Sizes'},
                {association: 'Styles'}, 
                {association: 'Colours'},
                {association: 'category'}, 
                {association: 'ImageProduct'}
                ]
            });
            let categories = await db.Categories.findAll({
                include: ['products']
            });
            let styles = await db.Styles.findAll({
                include: ['Products']
            });
          
            //Cuento los productos por categoría
            let countByCategory = {
                Blusas : categories[0].products.length , 
                Remeras: categories[1].products.length,
                Vestidos: categories[2].products.length, 
                Monos: categories[3].products.length,
                Shorts: categories[4].products.length, 
                Faldas: categories[5].products.length, 
                Jeans: categories[6].products.length, 
                Pantalones: categories[7].products.length  
            }
            
            //Cuento los productos por styles
            let countByStyle = {
                Casual : styles[0].Products.length , 
                Trendy: styles[1].Products.length,
                Minimalista: styles[2].Products.length, 
                Hipster: styles[3].Products.length
            }

            let countOfCategories = categories.length;
            let countOfStyles = styles.length;

            // API que reemplaza a la funcion normal
            let response = {
                meta: {
                    status : 200,
                    count: products.length,
                    countByCategory: countByCategory,
                    countByStyle: countByStyle,
                    countOfCategories: countOfCategories,
                    countOfStyles: countOfStyles,
                    url: '/api/products'
                },
                data: {
                    list: []
                }
            };

            products.forEach((product,index,arr) => {
                response.data.list.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category.name,
                    color: [],
                    size: [],
                    style: product.Styles.name,
                    img: product.ImageProduct[0].urlName,
                    details: req.headers.host + `/api/products/${product.id}`
                });
                products[index].Colours.forEach(color=>{
                    response.data.list[index].color.push(color.urlColour);
                });
                products[index].Sizes.forEach(size=>{
                    response.data.list[index].size.push(size.name);
                });
            });
           return res.json(response);
        }
        catch(error){
            res.send({ err: 'Not found' });
            log(error)
        }
    }, 
    detail : async (req,res)=>{ 
        db.Products.findByPk(req.params.id,
            {
                include : ['ImageProduct','category','Stars', 'Colours', 'Sizes', 'Styles','Visibility']
            })
            .then(product =>{ 
                let colours = [];
                product.Colours.forEach(color=>{
                    colours.push(color.urlColour);
                });
                let sizes = []; 
                product.Sizes.forEach(size=>{
                    sizes.push(size.name);
                });
                let images = []; 
                product.ImageProduct.forEach(img=>{
                    images.push(`/images/products/${img.urlName}`);
                });
                let response = {
                    meta: {
                        status : 200,
                        url: '/api/products'
                    },
                    data: {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        category: product.category.name,
                        color: colours,
                        size: sizes,
                        style: product.Styles.name,
                        images: images, 
                        //Visibility: product.Visibility.state, 
                        //Stars: product.Stars.cant
                    }
                };
                res.json(response);
            })
            .catch(err=> log(err));
    }
}

module.exports = productAPIController;