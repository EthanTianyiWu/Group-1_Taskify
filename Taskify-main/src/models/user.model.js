const bcrypt = require("bcryptjs");

const users = [];

class UserModel {
    constructor(data) {
        this._id = String(Date.now() + Math.random());
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.createdAt = new Date();
    }

    static async findOne(query) {
        if (query.$or) {
            for (const user of users) {
                for (const condition of query.$or) {
                    if (condition.email && user.email === condition.email) return user;
                    if (condition.username && user.username === condition.username) return user;
                }
            }
            return null;
        }
        return users.find(user => {
            if (query.email && user.email === query.email) return true;
            if (query.username && user.username === query.username) return true;
            return false;
        }) || null;
    }

    async save() {
        const existing = await UserModel.findOne({ $or: [{ email: this.email }, { username: this.username }] });
        if (existing) {
            throw new Error("Duplicate key");
        }
        this.password = await bcrypt.hash(this.password, 10);
        users.push(this);
        return this;
    }

    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}

module.exports = UserModel;
