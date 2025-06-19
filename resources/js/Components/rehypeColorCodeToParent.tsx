import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { visit } from 'unist-util-visit';
import { IoMdCheckmark } from 'react-icons/io';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';

// Plugin to move <code>color</code> to parent as style
const rehypeColorCodeToParent = () => {
  return (tree: any) => {
    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'code' &&
        node.children &&
        typeof node.children[0]?.value === 'string'
      ) {
        const colorValue = node.children[0].value.trim();

        // Only apply if the parent is one of these
        if (parent && ['p', 'strong', 'span'].includes(parent.tagName)) {
          // Convert existing style to object (optional improvement)
          const prevStyle = parent.properties?.style ?? '';

          // Merge styles properly
          const mergedStyle = prevStyle
            ? `${prevStyle}; color: ${colorValue};`
            : `color: ${colorValue};`;

          parent.properties = {
            ...parent.properties,
            style: mergedStyle,
          };

          // Remove the <code> tag from parent children
          parent.children = parent.children.filter((child: any) => child !== node);
        }
      }
    });
  };
};

export default rehypeColorCodeToParent;
