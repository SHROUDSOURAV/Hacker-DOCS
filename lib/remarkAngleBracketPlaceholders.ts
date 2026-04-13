type Node = {
  type: string;
  value?: string;
  children?: Node[];
};

const PLACEHOLDER_REGEX = /<[^<>\n]+>/g;

function splitTextNode(value: string): Node[] {
  const nodes: Node[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = PLACEHOLDER_REGEX.exec(value);

  while (match) {
    const start = match.index;
    const end = start + match[0].length;

    if (start > lastIndex) {
      nodes.push({ type: 'text', value: value.slice(lastIndex, start) });
    }

    nodes.push({ type: 'inlineCode', value: match[0] });
    lastIndex = end;
    match = PLACEHOLDER_REGEX.exec(value);
  }

  if (lastIndex < value.length) {
    nodes.push({ type: 'text', value: value.slice(lastIndex) });
  }

  PLACEHOLDER_REGEX.lastIndex = 0;
  return nodes.length > 0 ? nodes : [{ type: 'text', value }];
}

function transform(node: Node): void {
  if (!node.children || node.children.length === 0) {
    return;
  }

  const transformedChildren: Node[] = [];

  for (const child of node.children) {
    if (child.type === 'text' && typeof child.value === 'string' && child.value.includes('<') && child.value.includes('>')) {
      transformedChildren.push(...splitTextNode(child.value));
    } else {
      transform(child);
      transformedChildren.push(child);
    }
  }

  node.children = transformedChildren;
}

export default function remarkAngleBracketPlaceholders() {
  return (tree: Node) => {
    transform(tree);
  };
}
