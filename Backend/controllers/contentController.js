import Content from '../models/Content.js'

const getContents = async (req, res) => {
    const content = await Content.find({});
    res.send(content)
}

const getContentById = async (req, res) => {
    const content = await Content.findById(req.params.id)
    if (content) {
        res.send(content);
    }
    else {
        res.status(404).send({ message: 'content was not found' });
    }
}

const getContentCategories = async (req, res) => {
    const categories = await Content.find().distinct('category')
    if (categories) {
        res.send(categories);
    }
    else {
        res.status(404).send({ message: 'categories not found' });
    }
}

export { getContents, getContentById, getContentCategories };