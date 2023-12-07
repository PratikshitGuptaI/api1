const sequelize = require('../config/db.js');
const homeBanners = sequelize.HomeBanners;
const bottomSection = sequelize.HomeBottomSection;

class CmsRepo{

    //get homebanners
    async getHomeBanners(){
        const list = await homeBanners.findAll();
        return list;
    }
    async getHomeBottomSection(){
        const list = await bottomSection.findAll();
        return list;
    }
    async addHomeBanner(banner_url,banner_name,banner_type,active_to,active_from,extension){
        // const {banner_url,banner_name,banner_type,active_to,active_from,extension} = req.body;
console.log(banner_url,banner_name,banner_type,active_to,active_from,extension)
        const banner = await homeBanners.create({banner_url:banner_url,banner_name:banner_name,banner_type:banner_type,active_to:active_to,active_from:active_from,extension:extension})
        return banner;
    }
    async deleteHomeBanner(id){
        const banner = await homeBanners.destroy({
            where:{
                id:id
            }
        })
        return banner
    }
    //get bottomSection
    
    //add homebanners
    
    //update homebanners
    //update bottomSection
}

module.exports = CmsRepo;