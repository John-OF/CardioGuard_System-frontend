import type { TopicContentBlock } from '../types';
import { TopicTip } from './TopicTip';

interface TopicContentProps {
  blocks: TopicContentBlock[];
}

export function TopicContent({ blocks }: TopicContentProps) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h2
              key={i}
              className="text-2xl font-bold text-slate-900 mt-4 first:mt-0"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={i} className="text-lg text-slate-800 leading-relaxed">
              {block.text}
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="text-lg text-slate-800 leading-relaxed flex gap-3"
                >
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-3"
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'numbered_list') {
          return (
            <ol key={i} className="space-y-3">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="text-lg text-slate-800 leading-relaxed flex gap-3"
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center mt-0.5"
                    aria-hidden="true"
                  >
                    {j + 1}
                  </span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === 'highlight') {
          return (
            <TopicTip
              key={i}
              variant={block.variant}
              title={block.title}
              text={block.text}
            />
          );
        }

        return null;
      })}
    </div>
  );
}