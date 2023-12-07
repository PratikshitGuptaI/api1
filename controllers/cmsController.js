const CmsRepo = require('../repo/cms-repo');
const cmsrepo = new CmsRepo();

class cmsController {
  async getHomeBanners(req, res) {
    try {
      const list = await cmsrepo.getHomeBanners();
      if (!list || list.length == 0) {
        return res.status(200).json({ result: [] });
      }
      else {
        return res.status(200).json({ result: list });
      }
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
    }
  }
  async getHomeBottomSection(req, res) {
    try {
      const list = await cmsrepo.getHomeBottomSection();
      if (!list || list.length == 0) {
        return res.status(200).json({ result: 'No Home Bottom Section Found' });
      }
      else {
        return res.status(200).json({ result: list });
      }
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
    }
  }
  async createHomeBanner(req, res) {
    try {
      
      // const {banner_url,banner_name,banner_type,active_to,active_from,extension} = req.body;
      console.log(req.body)
      console.log(req.body.banner_url)
      const banner_url = req.body.banner_url;
      const banner_name = req.body.banner_name;
      const banner_type = req.body.banner_type;
      const active_to = req.body.active_to;
      const active_from = req.body.active_from;
      const extension = req.body.extension;
      const banner = await cmsrepo.addHomeBanner(banner_url,banner_name,banner_type,active_to,active_from,extension);
      return res.status(200).json(banner);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
      return res.status(400).json({ message: error.message });
    }
  }
  async deleteHomeBanner(req,res){
    try{
      const id = req.params.id;
      const banner = await cmsrepo.deleteHomeBanner(id)
      return banner
    }catch(error){
      console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
      return res.status(400).json({ message: error.message });
    }
  }
}
module.exports = cmsController