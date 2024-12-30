const Products = require("../../models/Product");

const productResolvers = {
    Query:{
        products:async () =>await Products.find(),
        product: async (_, { id }) => await Products.findById(id)
    },
    Mutation:{
        addProduct:async(_,{name,price,quantity,description,category})=>{
            const product = new Products({name, price, quantity, description, category});
            return await product.save();
        },
        updateProduct :async(_,{id,name,price,quantity,description,category})=>{
            const updates ={name,price,quantity,description,category};
            const updateProduct =await Products.findByIdAndUpdate(id,updates,{new:true});

            if(!updateProduct) throw new Error('Product not found');
            return updateProduct;
        },
        deleteProduct:async(_,{id})=>{
            const deleteProduct = await Products.findByIdAndDelete(id);
            return !!deleteProduct;
        }
    }
}

module.exports = productResolvers;