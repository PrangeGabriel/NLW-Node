import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveyUsersRepository";


class AnswerController{

// Route params > parametros que compoe a rota 
//exemplo: routes.get("/answers/:value/:nota/:batata")

//query params > Busca, paginacao, nao obrigatorios. Sempre vem depois do '?'
// chave = valor




    async execute(request: Request, response: Response){
        const {value} = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists!")


            // return response.status(400).json({
            //     error: "Survey User does not exists!"
            // })
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        return response.json(surveyUser);
    }
}


export { AnswerController }