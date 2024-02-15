import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import {TaskRepository} from "./task.repository";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {
    // @ts-ignore
    @InjectRepository(TaskRepository)
    constructor(private taskRepository: TaskRepository) {}

    async getTasks(filterDto: GetTasksFilterDto,user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto,user);
    }

    async getTaskById(id: number|string,user: User): Promise<Task>{
        // @ts-ignore
        const found = await this.taskRepository.findOne({ where: {id:id,userId:user.id} });
        if (!found){
            throw new NotFoundException(`Task with id ${id} not found.`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto,user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto,user);
    }

    async deleteTask(id: number,user: User): Promise<void> {
        const result = await this.taskRepository.delete({id:id,userId:user.id});

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }


    async updateTaskStatus(id: number, status: TaskStatus,user: User): Promise<Task> {
        const task = await this.getTaskById(id,user);
        task.status = status;
        await task.save();
        return task;
    }

}
