const {
    getproduct,
    getproductbyid,
    updateproduct,
} = require('../../services/admin/product.service');
const {
    getuserbyid,
} = require('../../services/admin/user.service');
const {
    addcontract
}=require('../../services/admin/contract.service');
class shopController {
     getAll = async (req, res) => {
     const {state}=req.params;
        let page = parseInt(req.query.page) || 1;
        let limit = 9;
        let skip = (page - 1) * limit;
        let sortField = req.query.sort || 'createdAt'; // Default sort field
        let sortOrder = req.query.order === 'desc' ? -1 : 1; // Default sort order is ascending
        let keyword=req.query.keywords;       
        try {
            if(keyword){
                const data=await getproduct('active',keyword).sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(limit)
                .exec();
               // console.log(data);
                let totalProducts = await getproduct('active',keyword).countDocuments();
                let pages = Math.ceil(totalProducts / limit);
                return res.render('guestmode/shop/view',{
                 data:data,
                 keyword:keyword,
                 limit: limit,
                 pages: pages,
                 currentPage: page,
                 sortField: sortField,
                 sortOrder: req.query.order || 'asc',
                 state: '',
             });
            }
            if(state==='all'){
                let data = await getproduct('active')
                let totalProducts = await getproduct('active').countDocuments();
                let pages = Math.ceil(totalProducts / limit);
                return res.render('guestmode/shop/view', {
                    data,
                    page: page,
                    limit: limit,
                    pages: pages,
                    currentPage: page,
                    state: state,
                });
            }
            let data = await getproduct('active')
                .sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(limit)
                .exec();
    
            let totalProducts = await getproduct('active').countDocuments();
            let pages = Math.ceil(totalProducts / limit);
    
            return res.render('guestmode/shop/view', {
                data,
                page: page,
                limit: limit,
                pages: pages,
                currentPage: page,
                sortField: sortField,
                sortOrder: req.query.order || 'asc',
                state: '',
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Server Error');
        }
    };
    

    getForm = async(req, res) => {
        const { id, salerID } = req.params;
        if (id) {
            const data = await getproductbyid(id);
            const saler = await getuserbyid(salerID);
            return res.render('guestmode/shop/detail', { data, saler });
        }
        return res.redirect('/guest/shop');
    }
}

module.exports = new shopController();