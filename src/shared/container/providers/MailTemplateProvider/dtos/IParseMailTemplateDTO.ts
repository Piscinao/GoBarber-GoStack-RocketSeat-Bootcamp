interface ITemplateVariables {
  [key: string]: string | number;
}

// passar a variavel qualquer coisa para o objeto key
export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
