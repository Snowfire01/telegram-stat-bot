import { getUser } from "../../controllers/user.controller";

export default function getUserRoute(req, res) {
    let userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        res.status(400).send("id parameter must be an integer");
    }

    getUser(userId)
        .then((result) => {
            res.status(200).json({
                result: result
            });
        }).catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
}