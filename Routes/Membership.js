const express = require('express');
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const router = express.Router();

const {AddMember,ShowMembers} = require('./Controller/Membership');
const {upload} = require('../Sheared/Multer');

router.route("/")
.get(ShowMembers)
.post(upload.single("image"),AddMember)


module.exports = router;