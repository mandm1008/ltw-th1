import { connect } from 'mongoose';

const mongoURI = 'mongodb+srv://manb2104812:matkhau123@ltw.gjjtlgb.mongodb.net/?retryWrites=true&w=majority&appName=ltw'

const connectDB = async () => {
  try {
    await connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
  }
}

export default connectDB;