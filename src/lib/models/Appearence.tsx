import mongoose, { Schema, model, models } from 'mongoose';

const AppearanceSchema = new Schema({
  header: [
    {
      id: { type: Number, required: true },
      value: { type: String, required: true },
      href: { type: String, required: true },
      children: [
        {
          id: { type: Number, required: true },
          value: { type: String, required: true },
          href: { type: String, required: true },
          children: { type: [this], default: [] }, // Recursive reference for nested children
        },
      ],
    },
  ],
  // Other fields if needed
});

const Appearance = models.Appearance || model('Appearance', AppearanceSchema);

export default Appearance;
