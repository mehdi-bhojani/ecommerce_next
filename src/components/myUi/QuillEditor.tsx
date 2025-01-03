import { useEffect, useRef } from 'react';
import Quill from 'quill';

const QuillEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow', // Other options: 'bubble'
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
          ],
        },
      });

      // Handle Quill content updates
      quill.on('text-change', () => {
        console.log('Content changed:', quill.root.innerHTML);
      });
    }
  }, []);

  return <div ref={editorRef} style={{ height: '300px' }} />;
};

export default QuillEditor;
