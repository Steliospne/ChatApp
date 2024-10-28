const pool = require("./pool");

const getUser = async (username) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE "userName" = $1 ;',
    [username],
  );
  return rows[0];
};

const getUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

const getFriends = async (user_id) => {
  const query = `
    SELECT u.id, u."userName", CONCAT_WS(' ', u."firstName",u."lastName") AS "fullName"
    FROM friends f
    JOIN users u ON u.id = f.friend_id
    WHERE f.user_id = $1

    UNION

    SELECT u.id, u."userName", CONCAT_WS(' ', u."firstName",u."lastName") AS "fullName"
    FROM friends f
    JOIN users u ON u.id = f.user_id
    WHERE f.friend_id = $1;
  `;
  const { rows } = await pool.query(query, [user_id]);
  return rows;
};

module.exports = { getUser, getUsers, getFriends };
