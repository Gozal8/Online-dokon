import db from "db"

exports.createOrder = async (customer_id, order_status, address_text) => {
    const query = `
        INSERT INTO orders (customer_id, order_status, address_)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [customer_id, order_status || 'pending', address_text];
    const result = await db.query(query, values);
    return result.rows[0];
};

export async function getAllOrders(req, res) {
    const query = 'SELECT * FROM orders;';
    const result = await db.query(query);
    return result.rows;
}

export async function getOrderById(req, res){
    const query = 'SELECT * FROM orders WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
}

export async function updateOrder(req, res) {
    const query = `
        UPDATE orders
        SET order_status = $2, address_ = $3
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id, order_status, address_text];
    const result = await db.query(query, values);
    return result.rows[0];
}

export async function deleteOrder (req, res){
    const query = 'DELETE FROM orders WHERE id = $1;';
    await db.query(query, [id]);
}
