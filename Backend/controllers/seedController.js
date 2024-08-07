import {data} from '../data.js';
import User from '../models/User.js';
import Content from '../models/Content.js';
const seedData = async (req,res) => {
    try {
        await Content.deleteMany({});
        const createdProducts = await Content.insertMany(data.content);
        await User.deleteMany({});
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdProducts, createdUsers });
    } catch (err) {
        console.log(`Failed to update users/products: ${err.message}`);
    }
}
export default seedData;