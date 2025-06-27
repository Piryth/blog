import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // You can choose any other theme

export function highlightCode(content: string): string {
  return content.replace(/<pre><code class="language-(\w+)">([\s\S]+?)<\/code><\/pre>/g, (match, lang, code) => {
    const highlightedCode = hljs.highlight(code, {language: lang}).value;
    return `<pre><code class="language-${lang}">${highlightedCode}</code></pre>`;
  });
}
