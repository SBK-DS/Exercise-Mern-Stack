const { Workout } = require('../models/workout_Modal')
const mongoose = require('mongoose')

// get all workouts

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout

const getSingleWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: res.error})
    }

    const workout = await Workout.findById(id)
    if(!workout) {
        return res.status(404).json({error: res.error})
    }

    res.status(200).json(workout)
}

// create a new workout

const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    try {
        console.log(Workout)
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a  workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: res.error})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout) {
        return res.status(404).json({error: res.error})
    }

    res.status(200).json(workout)
}


// Update a workout


const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: res.error})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})
    if(!workout) {
        return res.status(404).json({error: res.error})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}