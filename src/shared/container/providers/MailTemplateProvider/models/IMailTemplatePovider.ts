import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  // Sempre que tiver algo no interface que vai ter mais de uma informação composta é recomendado criar um DTO

  parse(data: IParseMailTemplateDTO): Promise<string>;
}
