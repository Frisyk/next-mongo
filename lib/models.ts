import mongoose from "mongoose";

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
  attempts: {
    type: Number, // Maps test titles to the number of attempts
  },
  img: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const evaluationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referensi ke model User
    required: true,
    unique: true, // Setiap user hanya bisa submit satu evaluasi
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const materiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  understanding: {
    type: String,
    required: true,
  },
  arguments: {
    type: String,
    required: true,
  },
  forms: {
    type: String,
    required: true,
  },
  values: {
    type: String,
    required: true,
  },
  prevents: {
    type: String,
    required: true,
  },
  traits: {
    type: String,
    required: true,
  },
  examples: {
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

// Skema BARU untuk Evaluasi Media Pembelajaran - Dengan Aspek
const mediaEvaluationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    unique: true,
  },
  // Ganti satu rating dengan rating per aspek
  ratingMateri: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  ratingMedia: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  ratingInteraktivitas: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  // Ubah nama description menjadi overallFeedback
  overallFeedback: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Evaluation = mongoose.models.Evaluation || mongoose.model("Evaluation", evaluationSchema);
export const Materi = mongoose.models.Materi || mongoose.model("Materi", materiSchema);
export const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);
export const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);
export const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);
export const Quizi = mongoose.models.Quizi || mongoose.model("Quizi", quizSchema);
export const Story = mongoose.models.Story || mongoose.model("Story", storySchema);
// Export model BARU untuk evaluasi media
export const MediaEvaluation = mongoose.models.MediaEvaluation || mongoose.model("MediaEvaluation", mediaEvaluationSchema);

