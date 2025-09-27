import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'website' | 'landing-page' | 'ecommerce' | 'portfolio';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: Date;
}

const PortfolioSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    enum: ['website', 'landing-page', 'ecommerce', 'portfolio'],
    required: [true, 'Category is required'],
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  githubUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

// Indexes for better query performance
PortfolioSchema.index({ category: 1, featured: 1 });
PortfolioSchema.index({ featured: 1, createdAt: -1 });
PortfolioSchema.index({ category: 1, createdAt: -1 });
PortfolioSchema.index({ technologies: 1 });

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
