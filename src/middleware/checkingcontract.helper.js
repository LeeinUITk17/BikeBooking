const { getcontract } = require('../services/admin/contract.service');
const { getproductbyid } = require('../services/admin/product.service');

const checkContract = async (req, res, next) => {
    try {
        const now = new Date();

        const expiredContracts = await getcontract({ expiresAt: { $lt: now }, status: 'active' });

        for (const contract of expiredContracts) {
            contract.status = 'inactive';
            contract.updatedAt = now;
            await contract.save();

            const product = await getproductbyid(contract.productID);
            if (product) {
                product.hireState = 'rentOut';
                product.updatedAt = now;
                product.save();
            }
        }
        next();
    } catch (error) {
        console.error('Error in checkContract middleware:', error);
        next();  
    }
};

module.exports = {
    checkContract,
};
