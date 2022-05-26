import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

class EtherealMail {
    static async enviaEmail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
        const hadlebarsMailTemplate = new HandlebarsMailTemplate();

        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe Sales_API',
                address: from?.email || 'suporte@sales_api.com.br',
            },
            to: {
                name: to.name || '',
                address: to.email || '',
            },
            subject,
            html: await hadlebarsMailTemplate.parse(templateData),
        });
        console.log(`Mensagem enviada ${message.messageId}`);
        console.log(`Acesse o link ${nodemailer.getTestMessageUrl(message)}`);
    }
}

export default EtherealMail;
