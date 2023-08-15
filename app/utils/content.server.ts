export function replaceMarkdownExpr(markdownStr: string): string {
  const markdownExpr =
    /#|##|###|####|#####|######|\[.*?\]\(.*?\)|\*|-|1.| \| |\n/g;

  return markdownStr.replace(markdownExpr, "");
}

export function createDescriptionFromMarkdown(markdownStr: string) {
  return createDescription(replaceMarkdownExpr(markdownStr));
}

export function replaceHtmlExpr(htmlStr: string): string {
  const htmlExpr = /<("[^"]*"|'[^']*'|[^'">])*>/g;

  return htmlStr.replace(htmlExpr, "");
}

export function createDescriptionFromHtml(htmlStr: string) {
  return createDescription(replaceHtmlExpr(htmlStr));
}

function createDescription(str: string) {
  return str.length > 100 ? str.slice(0, 117) + "..." : str;
}
