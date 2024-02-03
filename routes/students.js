const router = require("express").Router();
let Student = require("../models/student.js");

//Create Data
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added Successful!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//View Data
router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Data (PUT or POST) : using async function
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  //data structure
  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Updated", user: update });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with Updating Data" });
    });
});

//Delete Data
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Student.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with Deleting Data", error: err.message });
    });
});

//FindbyID
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  const user = await Student.findById(userId)
    .then(() => {
      res.status(200).send({ status: "User Fetched", data: user });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with Fetching Data", error: err.message });
    });
});

module.exports = router;
