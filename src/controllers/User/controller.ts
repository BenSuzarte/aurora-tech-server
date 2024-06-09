import { Request, Response } from "express";
import UserService from "@/services/User/service";

class UserController {
  async validateUser(req: Request, res: Response) {
    const validate = await UserService.signIn(req.body);

    if (!validate) {
      return
    }

    if (validate.code == 200) {
      res.status(200).json(validate.user);
    }

    res.status(401).json({ message: validate.message } )

  }
}

export default new UserController();