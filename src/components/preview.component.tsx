import "./preview.component.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  err: string;
}

//<style> html { background-color: white; }</style>
const html = `
    <html>
        <head>
            <style> html { background-color: white; }</style>
        </head>
        <body>
            <div id="root"></div>
            <script>
            const handleError = (err) => {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
            
            window.addEventListener('error', (event) => {
              console.log('xD', event);
              event.preventDefault();
              handleError(event.error)
            });

            window.addEventListener('message', (event) => {
                try {
                    eval(event.data);
                } catch (err) {
                    handleError(err);
                }
            }, false);

            const show = (value) => {
              const node = document.createElement("div");
              const textnode = document.createTextNode(value);
              node.appendChild(textnode);
              document.getElementById("root").appendChild(node);
            }
            </script>
        </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    //reset the iframe every time in case the user does something like document.body.innerHTML = '';

    iframe.current.srcdoc = html;
    //sometimes the html does not have enough time to setup the event listener for the message so we wait a bit
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="A frame that shows the output of the code we have written"
        sandbox="allow-scripts"
        ref={iframe}
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
