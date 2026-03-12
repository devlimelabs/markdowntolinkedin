export function registerWebMCPTools(convertFn) {
  if (!navigator.modelContext?.registerTool) return

  navigator.modelContext.registerTool({
    name: "convert_markdown_to_linkedin",
    description: "Convert Markdown text to LinkedIn-compatible Unicode formatting. Supports bold (**), italic (*), strikethrough (~~), headers (#), bullet lists (- or *), numbered lists, links, and blockquotes (>). Returns formatted text ready to copy-paste into LinkedIn posts.",
    inputSchema: {
      type: "object",
      properties: {
        markdown: {
          type: "string",
          description: "Markdown-formatted text to convert"
        }
      },
      required: ["markdown"]
    },
    async execute({ markdown }) {
      const linkedinText = convertFn(markdown)
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            linkedinText,
            characterCount: linkedinText.length,
            isOverLimit: linkedinText.length > 3000,
            linkedinCharacterLimit: 3000
          })
        }]
      }
    }
  })
}
