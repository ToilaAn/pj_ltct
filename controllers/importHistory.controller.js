const db = require("../models/index");
const importHistory = db["import_history"];
// const newHistoryList = require("../config/config.json");
const Response = require("../utils/responses");
const QueryParser = require("../utils/query");

class importHistoryController {
  async getAllProduct(req, res) {
    try {
      const { limit, offset, page } = QueryParser.paginate(req);
      // NOTE: paginate
      // TODO: filter by attr
      await importHistory.findAll().then(async (result) => {
        const filters = req.query;
        console.log("day la :", filters);
        try {
          const data = await importHistory.findAndCountAll({
            where: {},
            order: [],
            limit,
            offset,
          });

          return Response.paginate(res, page, limit, data?.count, data?.rows);
        } catch (e) {
          return Response.error(res, err);
        }
      });
    } catch (err) {
      return Response.error(res, err);
    }
  }

  async createHistory(req, res) {
    try {
      // const list = newHistoryList.importHistory;
      const data = req.body;
      // TODO: VALIDATE DATA
      const newRecord = await importHistory.create(data);
      return Response.success(res, newRecord.toJSON());
    } catch (e) {
      Response.error(res, e);
    }
  }

  async findById(req, res) {
    await importHistory
      .findByPk(req.params.id)
      .then((result) => {
        return Response.success(res, result);
      })
      .catch((err) => {
        return Response.error(res, err);
      });
  }

  async updateHistory(req, res) {
    try {
      const updated = await importHistory.update(req.body, {
        where: { id: req.params.id },
      });
      return Response.success(res);
    } catch (e) {
      Response.error(res, e);
    }
  }

  async deleteHistory(req, res) {
    try {
      await importHistory.destroy({
        where: {
          id: req.params.id,
        },
      });

      return Response.success(res);
    } catch (error) {
      // return res.json({
      //   Error: "Something went wrong! Check this message: " + error,
      // });
      return Response.error(res, error);
    }
  }
}

module.exports = new importHistoryController();
