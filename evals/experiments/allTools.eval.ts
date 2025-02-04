import { runEval } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { redditToolDefinition } from '../../src/tools/reddit'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: { name: toolName },
    },
  ],
})

const allTools = [
  redditToolDefinition,
  generateImageToolDefinition,
  dadJokeToolDefinition,
]

runEval('allTools', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: 'tell me something interesting from reddit',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: 'generate an image of a Mars',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'tell me a funny dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
