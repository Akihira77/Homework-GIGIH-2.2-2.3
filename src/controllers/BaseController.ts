import mongoose, { Document, Model } from "mongoose";
import { Request, Response } from "express";

const Create = (model: Model<any>) => (req: Request, res: Response) => {
  console.log("Creating new document for " + model.modelName);

  const doc = new model({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  return doc
    .save()
    .then((result: any) => res.status(201).json({ result }))
    .catch((error: any) => res.status(500).json({ error }));
};

const GetAll =
  (model: Model<any>, populate?: string) => (req: Request, res: Response) => {
    console.log("Getting all documents " + model.modelName);

    model
      .find<Document>()
      .populate(populate || [])
      .then((results) => {
        console.log(results);
        return res.status(200).json({ results });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error });
      });
  };

const GetById =
  (model: Model<any>, populate?: string) => (req: Request, res: Response) => {
    const id = req.params.id;
    console.log("Getting document for id " + id);

    model
      .findById<Document>(id)
      .populate(populate || [])
      .then((result) => {
        if (!result) {
          console.log("the data is not found");
          return res.status(404).json({ message: "the data is not found" });
        }
        console.log(result);
        return res.status(200).json({ result });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error });
      });
  };

const Delete = (model: Model<any>) => (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("Deleting document for id " + id);

  model
    .deleteOne({ _id: id })
    .then((result) => {
      if (!result) {
        console.log("the data is not found");
        return res.status(404).json({ message: "the data is not found" });
      }
      return res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

export default {
  Create,
  GetAll,
  GetById,
  Delete,
};
