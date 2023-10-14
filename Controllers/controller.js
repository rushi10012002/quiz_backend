import Questions from "../Models/questionSchema.js"
import Result from "../Models/resultSchema.js"
import questions, { answers } from '../database/data.js'
export async function getQuestions(req, res) {
    try {
        const qn = await Questions.find()
        res.json(qn)
        console.log("ddd")
    } catch (error) {
        res.json({ error })
    }
}

export async function insertQuestions(req, res) {
    try {
        await Questions.insertMany({ questions, answers },
            res.json({ msg: "Data Saved Successfully....!" }))
    } catch (error) {
        res.json({ error })
    }
}

export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany()
        res.json({ msg: 'Question Delete Successfully....!' })
    } catch (error) {
        res.json({ error })
    }
}

/** Result Api's request */
export async function getResult(req, res) {
    try {
        const re = await Result.find()
        res.json(re)
    } catch (error) {
        res.json({ error })
    }
}

export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body; // Fixed a typo in 'achieved'
        if (!username && !result) throw new Error('Data Not Provided...!'); // Changed '&&' to '||'

        const resultDocument = await Result.create({ username, result, attempts, points, achieved });
        res.json({ msg: "Result Saved Successfully....!", data: resultDocument });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export async function dropResult(req, res) {
    try {
        await Result.deleteMany()
        res.json("Result Deleted SuccessFully....!")
    } catch (error) {
        res.json({ error })
    }
}