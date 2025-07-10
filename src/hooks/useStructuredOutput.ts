// src/hooks/useStructuredOutput.ts
import { useState } from 'react';
import { intelGenAIService, type ChatMessage } from '../services/intelGenAIService';

export interface StructuredOutputSchema {
  name: string;
  schema: any;
  strict?: boolean;
}

export interface UseStructuredOutputOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

interface StructuredOutputResult<T = any> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: (
    messages: ChatMessage[],
    schema: StructuredOutputSchema,
    options?: UseStructuredOutputOptions
  ) => Promise<void>;
  reset: () => void;
}

export function useStructuredOutput<T = any>(): StructuredOutputResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (
    messages: ChatMessage[],
    schema: StructuredOutputSchema,
    options: UseStructuredOutputOptions = {}
  ) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await intelGenAIService.chatCompletion({
        messages,
        model: options.model || 'gpt-4o',
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 800,
        stream: false, // Structured output typically doesn't work with streaming
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: schema.name,
            schema: schema.schema,
            strict: schema.strict !== false, // Default to true
          },
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const content = result.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from API');
      }

      // Parse the JSON response
      const parsedData = JSON.parse(content);
      setData(parsedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Structured output error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    error,
    sendMessage,
    reset,
  };
}

// Common schema definitions for reuse
export const commonSchemas = {
  mathResponse: {
    name: 'math_response',
    schema: {
      type: 'object',
      properties: {
        steps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              explanation: { type: 'string' },
              output: { type: 'string' },
            },
            required: ['explanation', 'output'],
            additionalProperties: false,
          },
        },
        final_answer: { type: 'string' },
      },
      required: ['steps', 'final_answer'],
      additionalProperties: false,
    },
    strict: true,
  },

  analysis: {
    name: 'analysis_response',
    schema: {
      type: 'object',
      properties: {
        summary: { type: 'string' },
        key_points: {
          type: 'array',
          items: { type: 'string' },
        },
        recommendations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              priority: { 
                type: 'string', 
                enum: ['high', 'medium', 'low'] 
              },
            },
            required: ['title', 'description', 'priority'],
            additionalProperties: false,
          },
        },
        confidence_score: {
          type: 'number',
          minimum: 0,
          maximum: 1,
        },
      },
      required: ['summary', 'key_points', 'recommendations', 'confidence_score'],
      additionalProperties: false,
    },
    strict: true,
  },

  classification: {
    name: 'classification_response',
    schema: {
      type: 'object',
      properties: {
        category: { type: 'string' },
        subcategory: { type: 'string' },
        confidence: {
          type: 'number',
          minimum: 0,
          maximum: 1,
        },
        reasoning: { type: 'string' },
        tags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['category', 'confidence', 'reasoning'],
      additionalProperties: false,
    },
    strict: true,
  },

  codeAnalysis: {
    name: 'code_analysis',
    schema: {
      type: 'object',
      properties: {
        language: { type: 'string' },
        complexity_score: {
          type: 'number',
          minimum: 1,
          maximum: 10,
        },
        issues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { 
                type: 'string',
                enum: ['bug', 'performance', 'security', 'style', 'maintainability']
              },
              severity: {
                type: 'string',
                enum: ['critical', 'high', 'medium', 'low']
              },
              line: { type: 'number' },
              description: { type: 'string' },
              suggestion: { type: 'string' },
            },
            required: ['type', 'severity', 'description'],
            additionalProperties: false,
          },
        },
        suggestions: {
          type: 'array',
          items: { type: 'string' },
        },
        overall_quality: {
          type: 'string',
          enum: ['excellent', 'good', 'average', 'poor']
        },
      },
      required: ['language', 'complexity_score', 'issues', 'suggestions', 'overall_quality'],
      additionalProperties: false,
    },
    strict: true,
  },
};

// Example usage component
// export const StructuredOutputExample = () => {
//   const { data, isLoading, error, sendMessage } = useStructuredOutput<{
//     steps: Array<{ explanation: string; output: string }>;
//     final_answer: string;
//   }>();

//   const handleMathQuestion = async () => {
//     await sendMessage(
//       [
//         {
//           role: 'system',
//           content: 'You are a helpful math tutor. Guide the user through the solution step by step.',
//         },
//         {
//           role: 'user',
//           content: 'how can I solve 8x + 7 = -22',
//         },
//       ],
//       commonSchemas.mathResponse
//     );
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <button onClick={handleMathQuestion}>Solve Math Problem</button>
//       {data && (
//         <div>
//           <h3>Solution Steps:</h3>
//           {data.steps.map((step, index) => (
//             <div key={index}>
//               <p><strong>Step {index + 1}:</strong> {step.explanation}</p>
//               <p><strong>Result:</strong> {step.output}</p>
//             </div>
//           ))}
//           <p><strong>Final Answer:</strong> {data.final_answer}</p>
//         </div>
//       )}
//     </div>
//   );
// };