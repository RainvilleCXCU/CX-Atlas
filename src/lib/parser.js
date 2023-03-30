import parse, { domToReact, attributesToProps } from "html-react-parser";
import Link from "next/link";
import Script from "next/script";

export default function parseHtml(html) {
    const options = {
        replace: ({ name, attribs, children}) => {
            const isInternalLink =  name === "a";
            const script =  name === "script";

            if(isInternalLink) {
                return (
                    <Link href={attribs.href.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, '')} {...attributesToProps(attribs)}>{domToReact(children, options)}</Link>
                );
            }
            /*if(script && attribs.src === null) {
                return (
                    <Script id={attribs.id}
                    strategy="beforeInteractive"
                        dangerouslySetInnerHTML={{
                        __html: children,
                        }}
                    ></Script>
                )
            }*/
        },
    }
    return parse(html, options);
};