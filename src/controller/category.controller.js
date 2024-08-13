import fs from "fs";
import formidable from "formidable";
import { fetchData } from "../postgres/postgres.js";
import path from "path";

const form = formidable({
  keepExtensions: true,
  uploadDir: "uploads",
});

export async function getAllCategory(req, res) {
  const parentCategories = await fetchData(
    "select * from category"
  );

  res.send({
    message: "success",
    data: parentCategories,
  });
}





export async function createCategory(req, res) {
    const [fields, files] = await form.parse(req);
  
    await fetchData(
      "INSERT INTO category (name, image_url, category_id) VALUES ($1, $2, $3)",
      fields.name[0],
      files.image_url[0].newFilename,
      fields.category_id? fields.category_id[0] : null
    );
  
    res.status(201).send({
      message: "success",
    });
  }


  export async function put (req, res)  {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await db.query('UPDATE Categories SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Kategoriya topilmadi' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export  async function post (req, res) {
    const { name } = req.body;
    try {
        const result = await db.query('INSERT INTO Categories (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}




  export async function deleteCategory(req, res) {
    const { categoryId } = req.params;
  
    const foundedCategory = await fetchData(
      "SELECT * FROM category WHERE id = $1",
      categoryId
    );
  
    if (!foundedCategory.length) {
      res.status(404).send({
        message: "Category not found",
      });
      return;
    }
  
    if (foundedCategory[0].image_url) {
      fs.unlink(
        path.join(process.cwd(), "uploads", foundedCategory[0].image_url),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  
    await fetchData("DELETE FROM category WHERE id = $1", categoryId);
  
    res.status(204).send();
  }
  
















