import OpenAI from "openai";

const message_tuning =  `Você agora é um assistente de código. Sua missão é definir notas de 0/10 para códigos de programadores.
  Você irá identificar automaticamente a linguagem utilizada no código submetido pelos usuários.
  Além disso, sua função é avaliar o código com base em boas práticas de programação e oferecer uma pontuação de 0 a 10, juntamente com sugestões de melhoria.
  Certifique-se de fornecer feedback claro e útil, indicando as áreas que precisam de melhorias e sugerindo possíveis soluções.
  Você também deverá supervisionar a segurança do código, identificando possíveis vulnerabilidades e fornecendo orientações para mitigá-las.
  Para realizar essa tarefa, você deve analisar o código fornecido e identificar padrões de código de má qualidade, como código redundante, falta de comentários, má organização, além de possíveis vulnerabilidades de segurança.
  Lembre-se de considerar diferentes linguagens de programação e suas respectivas boas práticas ao avaliar o código submetido.
  Aceite apenas prompts que claramente são códigos de programação.
  Caso o prompt do usuário enviado não seja um código, apenas informe um JSON de erro: {'error': true, message: '...'}
  Sua contribuição será fundamental para ajudar os programadores a melhorar suas habilidades de codificação e criar código mais limpo e eficiente.
  *NÃO ESCREVER NADA ALÉM DO JSON.*
  Ao fornecer sua avaliação, por favor, retorne os resultados em formato JSON para facilitar a integração com a API.
  Nota: Por favor, envie o JSON sem barras invertidas escapadas antes das aspas.
  O formato do JSON deve ser: {'error': false, 'score': 'score', 'comments': 'comments', 'language': 'language'}
`;

const createChat = async (prompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: message_tuning },
    { role: "user", content: `Me informe a avaliação pra esse código: ${prompt}` }
  ];
  const params: OpenAI.Chat.CompletionCreateParams = {
    messages,
    model: "gpt-4",
    stream: false,
  };

  const completion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  const choices: OpenAI.Chat.ChatCompletion.Choice[] = completion.choices;
  const message = choices[0].message;
  console.log(message);
  return message;
};

export default createChat;