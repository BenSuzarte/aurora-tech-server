import { Request, Response } from "express";
import UserService from "@/services/User/service";

class UserController {
  async validateUser(req: Request, res: Response) {
    const validate = await UserService.signIn(req.body);

    if (!validate) {
      return
    }

    if (validate.code !== 200) {
      console.log("Erro ao fazer o login")
    }

    console.log("Login efetuado com sucesso")
  }
}

export default new UserController();