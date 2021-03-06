import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { UserServices } from "./user.service";

@Controller({
  model: "./user.model",
  route: "/user",
})
export class UserController {
  constructor(private services: UserServices) {}

  @Get({ path: "/", middlewares: [] })
  async allUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.all());
  }

  @Get({ path: "/:id", middlewares: [] })
  async byId(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.byID(req.params.id));
  }

  @Post({ path: "/", middlewares: [] })
  async addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.create(req.body));
  }

  @Patch({ path: "/:id", middlewares: [] })
  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.update(req.params.id, req.body));
  }

  @Delete({ path: "/:id", middlewares: [] })
  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.delete(req.params.id));
  }
}
