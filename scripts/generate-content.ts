/* eslint-disable unicorn/prefer-top-level-await */
// import { JsonOutputParser } from "@langchain/core/output_parsers"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts"
import { RunnableSequence } from "@langchain/core/runnables"
import { ChatMistralAI } from "@langchain/mistralai"
import dotenv from "dotenv"

dotenv.config()

const prompt = `### Instruction ###

1. **Topic Selection**
   - Identify a specific topic within the given {Topic} (e.g., health, travel, IT) that is both interesting and likely to attract a high volume of searches.
   - Ensure the topic is relevant and can provide valuable information or insights to the readers.

2. **Audience Integration**
   - Consider the target audience of the blog. Determine what they find engaging or useful within the {Topic}.

3. **SEO Optimization**
   - Focus on a topic that has good potential for SEO. Use tools like Google Trends or keyword research tools to find high-volume, low-competition keywords related to the {Topic}.

4. **Outline Development**
   - Create a detailed, on-page SEO-optimized outline for the blog post.
   - Include relevant headers and subheaders (H1, H2, H3) to structure the content effectively.
   - Ensure the outline covers all necessary sections to provide comprehensive coverage of the topic.

5. **Content Creation**
   - Write a blog post based on the outline.
   - The post should be informative, engaging, and between 1000 to 1800 words.
   - Maintain a natural and conversational tone.
   - Ensure the content is well-researched, accurate, and free of bias.

### Step-by-Step Guide ###

1. **Topic Selection:**
   - Identify a trending or frequently searched topic within the given {Topic}.

2. **Outline Development:**
   - Introduction
     - Briefly introduce the topic and its relevance.
   - Main Sections (3-5 sections based on the topic)
     - Break down the main points or aspects of the topic.
     - Each section should cover a specific subtopic or angle.
   - Additional Information
     - Include any extra information that adds value, such as tips, case studies, or expert opinions.
   - Conclusion
     - Summarize the key points and provide a closing thought.

3. **Content Creation:**
   - Write each section in detail, ensuring clarity and coherence.
   - Use SEO best practices, such as incorporating keywords naturally and using internal and external links.
   - Keep the content within the 1000 to 1800-word range.
   - Construct the content as a markdown format with appropriate headers(#) and subheaders(## or ###).

### Output Instruction ###
You must answer only the created content from the third step of the guide, "Content Creation" step.

### Reward ###
A $200 tip will be awarded for writing a high-quality, engaging, and SEO-optimized blog post that meets the outlined criteria and attracts significant reader interest.`

async function main() {
  const blogPostPrompt = PromptTemplate.fromTemplate(prompt)

  const model = new ChatMistralAI({
    model: "open-mixtral-8x7b",
    temperature: 0.8,
  })

  const chain = RunnableSequence.from([
    blogPostPrompt,
    model,
    new StringOutputParser(),
  ])

  const topic = "stock trading"
  const response = await chain.invoke({
    Topic: topic,
  })

  console.log(response)
}

main()
