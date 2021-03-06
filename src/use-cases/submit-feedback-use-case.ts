import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailService } from "../services/mail-service";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailService: MailService
    ) {
    }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        if (!type) {
            throw new Error('Type is required.')
        }
        if (!comment) {
            throw new Error('Comment is required.')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid Screenshot format.')
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailService.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px color: #111">`,
                `<p>Tipo do feeedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`,
            ].join('\n')
        })

    }
}