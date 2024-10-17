import {
  Controller,
  Get,
  Post,
  Delete,
  Route,
  Path,
  Body,
  Tags,
  Patch,
  Security,
} from "tsoa";
import { userService } from "../services/user.service";
import {
  UserInputDTO,
  UserInputPatchDTO,
  UserOutputDTO,
} from "../dto/user.dto";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Get("/")
  @Security("jwt", ["user:read"])
  public async getAllUsers(): Promise<UserOutputDTO[]> {
    return userService.getAllUsers();
  }

  @Get("{id}")
  @Security("jwt", ["user:read"])
  public async getUserById(@Path() id: number): Promise<UserOutputDTO> {
    return userService.getUserById(id);
  }

  @Post("/")
  @Security("jwt", ["user:write"])
  public async createUser(
    @Body() requestBody: UserInputDTO,
  ): Promise<UserOutputDTO> {
    const { username, password } = requestBody;
    return userService.createUser(username, password);
  }

  @Delete("{id}")
  @Security("jwt", ["user:delete"])
  public async deleteUser(@Path() id: number): Promise<void> {
    await userService.deleteUser(id);
  }

  @Patch("{id}")
  @Security("jwt", ["user:update"])
  public async updateUser(
    @Path() id: number,
    @Body() requestBody: UserInputPatchDTO,
  ): Promise<UserOutputDTO> {
    const { username, password } = requestBody;
    return userService.updateUser(id, username, password);
  }
}
