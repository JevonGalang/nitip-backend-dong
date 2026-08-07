import db from "../config/conection.js"

await db.query("ALTER TABLE users MODIFY role ENUM('admin', 'yusuf', 'ahmad', 'ade') NOT NULL DEFAULT 'ade'")
const [hasil] = await db.query("UPDATE users SET role = 'yusuf' WHERE LOWER(username) = 'pak yusuf'")

console.log(`database rbac say: akun Yusuf yang diubah: ${hasil.affectedRows}`)
await db.end()
