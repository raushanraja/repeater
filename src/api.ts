/**
 * Sends a request to the Gemini API for code analysis.
 * @param {string} code - The code to analyze.
 * @param {string} url - The API endpoint URL.
 * @returns {Promise<string>} - The API response.
 */

const headers = [['Content-Type', 'application/json']];
const options = { headers, method: 'POST', body: '' };

const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=`;
async function post(code1: string, code2: string, baseURI = apiUrl) {
    const api = localStorage.getItem('aistudioapikey') || '';
    const url = baseURI + api;
    const data = `
    You are given two code snippets:
    Code Snippet 1 (Reference Implementation - assumed correct): 
    \`\`\`
    ${code1}
    \`\`\`

    Code Snippet 2 (New Implementation):
    \`\`\`
    ${code2}
    \`\`\`

    **Task:**

    1. **Functionality Comparison:** Analyze both code snippets and determine if they achieve the same functionality.  Describe, in detail, the purpose of each code snippet and explain whether they produce the same output for the same inputs.  Highlight any potential differences in behavior or edge cases where they might diverge.  Be as specific as possible in comparing their logic and approach.  State explicitly whether the two snippets are functionally equivalent.

    2. **Complexity Analysis (for EACH snippet separately):**  For *each* code snippet (Code Snippet 1 and Code Snippet 2), perform a detailed complexity analysis:

        *   **Step-by-Step Breakdown:**  Provide a step-by-step breakdown of the code's execution, explaining the time complexity of each individual operation.
        *   **Summarized Breakdown:**  Summarize the breakdown with just the step name and its corresponding time complexity (e.g., "Loop Initialization: O(1)", "Inner Loop Execution: O(n)").

    3. **Formatted Space & Time Complexity (for EACH snippet separately):** Provide the final Space and Time Complexity in the following format *for each code snippet*:

        **Code Snippet [1 or 2] - Time & Space Complexity:**

        *   Time Complexity:
            *   Best Case:
            *   Average Case:
            *   Worst Case:
        *   Space Complexity: (Provide just one, as it will be assumed consistent)

    **Example Output Structure:**

    **Functionality Comparison:**

    (Detailed explanation of whether the code snippets are functionally equivalent and why.  Highlight differences and potential issues.)

    **Code Snippet 1 - Complexity Analysis:**

    *   **Step-by-Step Breakdown:** (Detailed step-by-step analysis of Code Snippet 1)
    *   **Summarized Breakdown:**
        *   (Step Name): (Time Complexity)
        *   ...
    *   **Code Snippet 1 - Time & Space Complexity:**
        *   Time Complexity:
            *   Best Case:
            *   Average Case:
            *   Worst Case:
        *   Space Complexity:

    **Code Snippet 2 - Complexity Analysis:**

    *   **Step-by-Step Breakdown:** (Detailed step-by-step analysis of Code Snippet 2)
    *   **Summarized Breakdown:**
        *   (Step Name): (Time Complexity)
        *   ...
    *   **Code Snippet 2 - Time & Space Complexity:**
        *   Time Complexity:
            *   Best Case:
            *   Average Case:
            *   Worst Case:
        *   Space Complexity:

    **Important Considerations:**

    *   Assume the input code is written in the same language (e.g., JavaScript, Python, Java).
    *   Be explicit about any assumptions you make regarding input size or data distribution.
    *   If the code snippets are not functionally equivalent, focus the complexity analysis on identifying the sections that contribute most significantly to the difference in performance.
    *   Give the result in properly html formatted text with tailwind class.
    *   Add proper styling with tailwind css, to make it look appealing.
    *   All the css is already included in the project, you just need to use the classes. And give reslut inside the div without body/html tags.
    *   Use pre,code,ul,li,h1,h2,h3,h4,h5,h6,p tags for proper formatting.
    *   Use kbd,pre,code whereever code is written or snippet is given.
    *   Don't wrap it in \`\`\`html \`\`\`, just plain text.
`;

    const body = {
        contents: [{ parts: [{ text: data }] }],
    };

    options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options as RequestInit);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
        const responseData = await response.json();
        return responseData.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return null;
    }
}

export { post };
