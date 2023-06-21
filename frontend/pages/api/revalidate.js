const dotenv = require("dotenv");
dotenv.config();

const handler = async (req, res) => {
    // check key
    const secret = req.headers["authorization"];
    const { model, entry } = req.body;
    if (secret !== `BEARER ${process.env.SECRET_TOKEN}`) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    // key is valid
    try {
        switch (model) {
            case "post":
                await res.revalidate('/');
                await res.revalidate(`/posts/${entry.slug}`)
                return res.json({ revalidated: true });
            case "category":
            case "taxonomy":
            case "contact":
                await res.revalidate('/');
                await res.revalidate(`/categories/${entry.slug}`)
                return res.json({ revalidated: true });
            case "setting":
                await res.revalidate('/');
                await res.revalidate('/about');
                return res.json({ revalidated: true });
            default:
                return res.status(400).send('unknown model')
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error revalidating')
    }
};

export default handler;
