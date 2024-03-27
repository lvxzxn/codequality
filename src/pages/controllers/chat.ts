import OpenAI from "openai";

const message_tuning = `Use sempre português.
Você agora é um assistente de código. Sua missão é definir notas de 0/10 para códigos de programadores.
O assistente deve se comportar como uma API, fornecendo apenas os dados solicitados de forma estruturada.
Por favor, retorne os resultados apenas no formato JSON.
NUNCA incluir mensagens adicionais ou opiniões. 
FORMATO DO JSON PARA USAR: {"error": false, "score": 5, "comments": "xx", "language": "python"}
Caso o usuário envie alguma coisa que não seja um código, envie o json nesse mesmo formato com os valores zerados e error definido como true, um comentário explicando e a linguagem sendo desconhecida.
Você irá identificar automaticamente a linguagem utilizada no código submetido pelos usuários.
Além disso, sua função é avaliar o código com base em boas práticas de programação e oferecer uma pontuação de 0 a 10, juntamente com sugestões de melhoria.
Certifique-se de fornecer feedback claro e útil, indicando as áreas que precisam de melhorias e sugerindo possíveis soluções.
Você também deverá supervisionar a segurança do código, identificando possíveis vulnerabilidades e fornecendo orientações para mitigá-las.
Para realizar essa tarefa, você deve analisar o código fornecido e identificar padrões de código de má qualidade, como código redundante, falta de comentários, má organização, além de possíveis vulnerabilidades de segurança.
Lembre-se de considerar diferentes linguagens de programação e suas respectivas boas práticas ao avaliar o código submetido.
Aceite apenas prompts que claramente são códigos de programação.
Ao fornecer o JSON, por gentileza, não envie nenhum comentário acima do JSON, caso contrário irá quebrar o parse do JSON da api, então, envie apenas o JSON.
Ao fornecer sua avaliação, por favor, retorne os resultados em formato JSON para facilitar a integração com a API.
O JSON deverá informar o score, os comentários e a linguagem utilizada.
Lembre-se que o JSON é para Javascript, então valores booleanos como false e true não devem ser inicializados com inicial maiúscula.`;

const createChat = async (apiKey: string, prompt: string) => {
  const openai = new OpenAI({
    apiKey,
  });

  const assistant = await openai.beta.assistants.create({
    name: "Code Quality Bot",
    instructions: message_tuning,
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4",
  });

  const thread = await openai.beta.threads.create();

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: prompt,
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  const checkStatusAndPrintMessage = async (
    threadId: string,
    runId: string
  ) => {
    let runStatus;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    } while (runStatus.status !== "completed");

    const messages = await openai.beta.threads.messages.list(threadId);
    const content = messages.data[0].content[0] as any;
    const message = content.text.value.trim();

    console.log(message);

    const messageJson = JSON.parse(message);

    const response = {
      error: messageJson.error,
      score: messageJson.score,
      comments: messageJson.comments,
      language: messageJson.language,
    };

    return response;
  };

  return await checkStatusAndPrintMessage(thread.id, run.id);
};

export default createChat;
