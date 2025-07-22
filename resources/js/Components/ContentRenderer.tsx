import parse, { DOMNode, Element, domToReact } from 'html-react-parser'
import { FaCheck } from 'react-icons/fa'

type ContentRendererProps = {
  content: string
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  const options = {
    replace: (domNode: DOMNode) => {
      // لو العنصر <li> نستبدله مع أيقونة
      if (domNode.type === 'tag' && (domNode as Element).name === 'li') {
        const el = domNode as Element

        return (
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCheck color="green" />
            {domToReact(el.children as DOMNode[], options)}
          </li>
        )
      }
    },
  }

  return <div className="ql-editor">{parse(content, options)}</div>
}
