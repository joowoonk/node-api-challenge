const express = require("express");

const router = express.Router();

const Projects = require("./projectModel");
const Actions = require("./actionModel");

router.post("/:id/posts", validateActionById, validateActions, (req, res) => {
  const { id } = req.params;
  //   console.log("req.body", req.body);
  //   let { body } = req;

  req.body.project_id = id;
  console.log("body", req.body);
  Actions.insert(req.body)
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  Actions.get()
    .then((person) => {
      res.status(200).json(person);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Invalid post ID",
        error: error.message,
      });
    });
});

router.get("/:id", validateActionById, (req, res) => {
  res.status(200).json(req.user);
});

router.delete("/:id", validateActionById, (req, res) => {
  Actions.remove(req.user.id)
    .then((deleteThis) => {
      console.log(deleteThis);
      Actions.get().then((personInfo) => {
        console.log(`Delete Success`);
        res.status(200).json(personInfo);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("");
    })
    .then();
});

router.put("/:id", validateActionById, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((updated) => {
      console.log("put:", updated);
      Actions.get(req.params.id)
        .then((person) => {
          res.status(200).json(person);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ Errormessage: "Error is occurred" });
        });
    })
    .catch((err) => {
      res.status(500).json({ Error: "updated error occured" });
    });
});

//custom middleware

function validateActionById(req, res, next) {
  Actions.get(req.params.id)
    .then((person) => {
      if (person === undefined) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = person;
        // console.log("user?:", req.user);

        next();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "error occured" });
    });
}

function validateUser(req, res, next) {
  if (req.body === null) {
    res.status(400).json({ message: "missing user data" });
  } else if (req.body === "") {
    res.status(404).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validateActions(req, res, next) {
  console.log(req.body.project_id);
  if (
    // req.body.project_id === undefined ||
    req.body.description === undefined ||
    req.body.notes === undefined ||
    req.body === null
  ) {
    res.status(400).json({ message: "missing user data" });
  } else if (
    // req.body.project_id === "" ||
    // req.body.project_id === null ||
    req.body.description === "" ||
    req.body.description === null ||
    req.body.notes === "" ||
    req.body.notes === null
  ) {
    res.status(404).json({ message: "missing required name field" });
  } else {
    next();
  }
}

module.exports = router;
