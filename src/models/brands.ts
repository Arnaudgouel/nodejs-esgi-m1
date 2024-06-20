import { Schema, model } from 'mongoose';

interface IBrand {
    name: string;
    quickStart: string;
    image: string;
}

const brandSchema = new Schema<IBrand>({
    name: { type: String, required: true, trim: true },
    quickStart: { type: String, required: false },
    image: { type: String, required: true }
});

const Brand = model<IBrand>('Brand', brandSchema);

export { Brand, IBrand };
