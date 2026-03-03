require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect(); // Connect the client to the server

    const db = client.db("quickHireDB");
    const jobsCollection = db.collection("jobs");
    const applicationsCollection = db.collection("applications");
    const usersCollection = db.collection("users");

    app.get("/", (req, res) => {
      res.send("QuickHire API is running!");
    });

    app.get("/api/jobs", async (req, res) => {
      try {
        const { search, category, location } = req.query;
        let query = {};

        if (search) {
          query.title = { $regex: search, $options: "i" };
        }
        if (category && category !== "All Categories") {
          query.category = category;
        }
        if (location && location !== "All Locations") {
          query.location = location;
        }

        const jobs = await jobsCollection
          .find(query)
          .sort({ created_at: -1 })
          .toArray();
        res.json(jobs);
      } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error });
      }
    });

    app.get("/api/jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid job ID format" });
        }
        const job = await jobsCollection.findOne({ _id: new ObjectId(id) });
        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }
        res.json(job);
      } catch (error) {
        res.status(500).json({ message: "Error fetching job", error });
      }
    });

    app.post("/api/jobs", async (req, res) => {
      try {
        const {
          title,
          company,
          companyLogo,
          location,
          category,
          employmentType,
          description,
        } = req.body;

        if (!title || !company || !location || !category || !description) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const newJob = {
          title,
          company,
          companyLogo: companyLogo || "",
          location,
          category,
          employmentType: employmentType || "Full-Time",
          description,
          created_at: new Date(),
        };

        const result = await jobsCollection.insertOne(newJob);
        res.status(201).json({
          message: "Job created successfully",
          jobId: result.insertedId,
        });
      } catch (error) {
        res.status(500).json({ message: "Error creating job", error });
      }
    });

    app.delete("/api/jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid job ID format" });
        }
        const result = await jobsCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Job not found" });
        }
        res.json({ message: "Job deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting job", error });
      }
    });

    app.post("/api/applications", async (req, res) => {
      try {
        const { jobId, name, email, resume_link, cover_note } = req.body;

        if (!jobId || !name || !email || !resume_link) {
          return res.status(400).json({
            message: "Job ID, Name, Email, and Resume link are required",
          });
        }

        if (!ObjectId.isValid(jobId)) {
          return res.status(400).json({ message: "Invalid Job ID format" });
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate Resume Link
        const urlRegex =
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlRegex.test(resume_link)) {
          return res.status(400).json({ message: "Invalid resume URL format" });
        }

        const newApplication = {
          jobId: new ObjectId(jobId),
          name,
          email,
          resume_link,
          cover_note: cover_note || "",
          created_at: new Date(),
        };

        const result = await applicationsCollection.insertOne(newApplication);
        res.status(201).json({
          message: "Application submitted successfully",
          applicationId: result.insertedId,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error submitting application", error });
      }
    });

    app.put("/api/users", async (req, res) => {
      try {
        const { email, name } = req.body;

        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

        const query = { email: email };
        const existingUser = await usersCollection.findOne(query);

        if (existingUser) {
          return res.json({
            message: "User already exists",
            user: existingUser,
          });
        }

        const role = email === "admin@quickhire.com" ? "admin" : "user";

        const newUser = {
          email,
          name: name || "",
          role: role,
          created_at: new Date(),
        };

        const result = await usersCollection.insertOne(newUser);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ message: "Error saving user", error });
      }
    });

    app.get("/api/users/admin/:email", async (req, res) => {
      try {
        const email = req.params.email;
        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

        const query = { email: email };
        const user = await usersCollection.findOne(query);

        let isAdmin = false;
        if (user && user.role === "admin") {
          isAdmin = true;
        }

        if (email === "admin@quickhire.com") {
          isAdmin = true;
        }

        res.json({ admin: isAdmin });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error verifying admin status", error });
      }
    });

    app.listen(port, () => {
      console.log(`QuickHire API listening on port ${port}`);
    });
  } catch (error) {
    console.dir(error);
  }
}

run().catch(console.dir);
