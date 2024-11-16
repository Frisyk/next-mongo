import mongoose from "mongoose";
import { number } from "zod";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  uclass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  point: {
    type: Number,
    required: true,
  },
  scores: { type: Map, of: Number }, 
  attempts: {
    type: Number, // Maps test titles to the number of attempts
  }, // Using a Map for dynamic keys like "tes1", "tes2"
  img: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  quizId: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });


const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

const scoreSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  quiztitle: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  point: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const AnswerSchema = new mongoose.Schema({
  label: { type: String, required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  isSelected: { type: Boolean, required: true },
});

// Define the Question schema
const quizSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  questionText: { type: String, required: true },
  answers: [AnswerSchema], // Embed the Answer schema
}, {timestamps: true});

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  keypoints: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);
export const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);
export const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);
export const Quizi = mongoose.models.Quizi || mongoose.model("Quizi", quizSchema);
export const Story = mongoose.models.Story || mongoose.model("Story", storySchema);

