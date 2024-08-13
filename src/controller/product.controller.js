import { fetchData }  from "../postgres/postgres.js"

export async function getProductsByCategory(req, res) {
    const { categoryId } = req.params;

    const foundedProducts = await fetchData(
        "SELECT * FROM product WHERE category_id = $1",
        categoryId
    );

    res.send({
        message: "succes",
        data: foundedProducts,
    });
}

export async function getSingleProduct(req, res) {
    const { productId } = req.params;
    console.log(productId)
    const foundedProduct = await fetchData(
        "SELECT * FROM product WHERE id = $1",
        productId
    );

    res.send({
        message:"succes",
        data: foundedProduct,
    });
}

export async function getAllProduct(req, res){
    const {filter, sort, order} = req.query;

    let query = "SELECT * FROM product"
    let queryparams = [];

    if (filter){
        query += `Where title ILIKE ${filter}`;
        queryparams.push(toUpperCase);
    }

    if (sort){
        query += `Order BY  ${sort}`;
        if (order){
            queryparams.push(toUpperCase);
        }  
      }

      const AllProduct = await fetchData(query, ...queryparams);


      res.send({
        message:"succes",
        data: AllProduct
      })
}



import formidable from "formidable";
import { categoryRoutes } from "../routes/category.routes.js";
const form = formidable({
    keepExtensions: true,
    uploadDir: "uploads"
}
)
export const createProduct = async (req, res) => {
    const [fields, files] = await form.parse(req)
    try{
        await fetchData('INSERT INTO product(title, description, price, image_url, rating, category_id, count) VALUES ($1, $2,$3, $4, $5, $6, $7);',
            fields.title[0],
            fields.description[0],
            fields.price[0],
            fields.image_url[0].newFilename,
            fields.rating[0],
            fields.category_id[0],
            fields.count[0]
        )
        res.status(201).send({message: "sucessfuly"})
    }catch(err){
        res.status(500).send({error: err.message})
    }
}





export async function getOverduePayments(req, res) {
    try {
        const overduePayments = await fetchData(`
            SELECT 
                c.name AS customer_name,
                p.title AS product_name,
                ct.imei,
                ct.id AS contract_id,
                (ct.total_amount - COALESCE(SUM(py.amount), 0)) AS amount_due,
                EXTRACT(DAY FROM (CURRENT_DATE - ct.due_date)) AS days_overdue
            FROM 
                customers c
            JOIN 
                contracts ct ON c.id = ct.customer_id
            JOIN 
                products p ON p.id = ct.product_id
            LEFT JOIN 
                payments py ON ct.id = py.contract_id
            WHERE 
                ct.due_date < CURRENT_DATE
            GROUP BY 
                c.name, p.title, ct.imei, ct.id, ct.total_amount, ct.due_date
            HAVING 
                (ct.total_amount - COALESCE(SUM(py.amount), 0)) > 0
            ORDER BY 
                days_overdue DESC;
        `);

        res.send({
            message: "success",
            data: overduePayments,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}
 