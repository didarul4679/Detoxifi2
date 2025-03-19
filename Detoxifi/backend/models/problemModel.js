import mongoose, { model, Schema, Types } from "mongoose";

const questionSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    qus: {
      type: String,
    },
    ans: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const solutionSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const problemSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true, 
    },
    description: {
      type: String,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (questions) {
          return questions.every((q) => Types.ObjectId.isValid(q._id));
        },
        message: "Invalid ObjectId in questions",
      },
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    solutions: {
      type: [solutionSchema],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

problemSchema.pre("save", function (next) {
  if (this.questions && this.questions.length > 0) {
    this.questions.forEach((question) => {
      if (question._id && typeof question._id === "string") {
        if (!mongoose.Types.ObjectId.isValid(question._id)) {
          question._id = new mongoose.Types.ObjectId();
        }
      }
    });
  }
  next();
});

problemSchema.post("save", async function (doc, next) {
  const User = mongoose.model("User");

  try {
    const usersToUpdate = await User.find({
      "problems.name": { $ne: doc.name },
    });

    if (usersToUpdate.length > 0) {
      const updateResult = await User.updateMany(
        { _id: { $in: usersToUpdate.map((user) => user._id) } },
        {
          $push: {
            problems: {
              problemId: doc._id,
              name: doc.name,
            },
          },
        }
      );

      console.log(
        `Problem "${doc.name}" added to ${updateResult.modifiedCount} user(s)`
      );
    }

    next();
  } catch (error) {
    console.error("Error adding problem to users:", error.message);
    next(error);
  }
});

export const Problem = model("Problem", problemSchema);
