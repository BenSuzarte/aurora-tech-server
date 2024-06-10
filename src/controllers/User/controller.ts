import { Request, Response } from "express";
import UserService from "@/services/User/service";

class UserController {
  async createUser(req: Request, res: Response) {

    try {
      const user = await UserService.createUser(req.body);
  
      if (!user) {
        return res.status(500).json({ message: "Erro ao criar o usuário, tente novamente mais tarde..." });
      }
  
      if (!res.headersSent) {
        if (user.code === 200) {
          return res.status(200).json(user.user);
        }
      }
  
      return res.status(user.code).json({ message: user.message });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async validateUser(req: Request, res: Response) {
    try {
      const validate = await UserService.signIn(req.body);
  
      if (!validate) {
        return res.status(500).json({ message: "Erro ao validar o usuário, tente novamente mais tarde..." });
      }
  
      if (validate.code === 200) {
        return res.status(200).json(validate.user);
      }
  
      return res.status(validate.code).json({ message: validate.message }); 
    } catch (error) {
      console.error("Erro ao validar usuário:", error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}

export default new UserController();