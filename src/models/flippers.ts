import { Schema, model, Types } from 'mongoose';


interface IFlipper {
    name: string;
    price: number;
    stockStatus: string;
    state: string;
    releaseDate: Date;
    rating: number;
    dimensions: string;
    weight: string;
    images: string[];
    brandId: Types.ObjectId;
}

const flipperSchema = new Schema<IFlipper>({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    stockStatus: { type: String, required: true },
    state: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    dimensions: { type: String, required: true },
    weight: { type: String, required: true },
    images: { type: [String], required: true },
    brandId: { type: Schema.Types.ObjectId, required: true, ref: "Brand" },
});

const Flipper = model<IFlipper>('flippers', flipperSchema);

export { Flipper, IFlipper };
