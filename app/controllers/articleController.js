import { articleDataMapper } from "../datamappers/index.js";

const articleController = {
  test: (req, res) => {
    res.send('article Controller');
  },

  getArticlesFromShoplist: async (req, res) => {
    console.log(req.params.coloc_id)
    const { result, error } = await articleDataMapper.getArticles(req.params.coloc_id);

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },

  addArticleToShoplist: async (req, res) => {
    console.log(req.params.coloc_id, req.body);
    const { result, error } = await articleDataMapper.addArticle(
      req.params.coloc_id,
      req.body,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },

  modifyArticleFromShoplist: async (req, res) => {
    console.log(req.params.coloc_id, req.params.article_id);
    const { result, error } = await articleDataMapper.modifyArticle(
      req.params.coloc_id,
      req.params.article_id,
      req.body,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },

  deleteArticleFromShoplist: async (req, res) => {
    console.log(req.params.coloc_id, req.params.article_id);
    const { result, error } = await articleDataMapper.deleteArticle(
      req.params.coloc_id,
      req.params.article_id,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },
};

export default articleController;
