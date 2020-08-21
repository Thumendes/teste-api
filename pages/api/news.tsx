import NewsAPI from "newsapi";

const newsapi = new NewsAPI("f4e124cfe6e2496c813bf7cc15fdf1ab");

export default async (req, res) => {
  console.log(req.body);
  const { category, query } = req.body;
  const response = await newsapi.v2.topHeadlines({
    q: query,
    category: category,
    language: "pt-br",
    country: "br",
  });

  res.statusCode = 200;
  res.json(response);
};
