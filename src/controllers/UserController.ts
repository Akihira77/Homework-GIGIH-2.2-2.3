import { Request, Response } from "express";
import IController from "./IController.js";

let data: any[] = [
  { id: 1, name: "Adi" },
  { id: 2, name: "Bdi" },
  { id: 3, name: "Cdi" },
  { id: 4, name: "Ddi" },
  { id: 5, name: "Edi" },
];

class UserController implements IController {
  GetAll(req: Request, res: Response): Response {
    return res.send({ data: data });
  }
  Create(req: Request, res: Response): Response {
    const { id, name } = req.body;

    data.push({
      id: id,
      name: name,
    });

    return res.send("create success");
  }
  Get(req: Request, res: Response): Response {
    const id = req.params.id;

    let person = data.find((e) => e.id == id);
    return res.send({ data: person });
  }
  Update(req: Request, res: Response): Response {
    const id = req.params.id;

    let person = data.find((e) => e.id == id);
    if (person == null) {
      return res.send(`data with id ${id} does not exists`);
    }

    person.name = req.body.name;
    return res.send({ message: "update data success", data: person });
  }
  Delete(req: Request, res: Response): Response {
    const id = req.params.id;
    let person = data.find((e) => e.id == id);
    if (person == null) {
      return res.send(`data with id ${id} does not exists`);
    }

    let people = data.filter((e) => e.id != id);
    return res.send({ message: "delete data success", data: people });
  }
}

export default new UserController();
