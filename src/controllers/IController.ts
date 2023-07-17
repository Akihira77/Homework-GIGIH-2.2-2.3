import { Request, Response } from "express";

interface IController {
  GetAll(req: Request, res: Response): Response;
  Create(req: Request, res: Response): Response;
  Get(req: Request, res: Response): Response;
  Update(req: Request, res: Response): Response;
  Delete(req: Request, res: Response): Response;
}

export default IController;
