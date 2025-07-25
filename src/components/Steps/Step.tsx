import Arrow from "components/Arrow/Arrow";
import EqualHeightContainer from "components/Blocks/EqualHeight";
import NoSSRMotion from "components/Motion/NoSSRMotion";
import { m } from "framer-motion";
import { parseHtml } from "lib/parser";

export interface Props {
    step?
    lastStep?
    route?
    heading?
    duration?
    align?
    encodedContent?
    children?
    classNames?
    style?
}

function Step({
    step = 1,
    lastStep = false,
    route = 'topArc',
    heading = '',
    encodedContent = '',
    duration = 1,
    align = '',
    style = {},
    children = <></>,
    classNames
}: Props): JSX.Element {
//   const delay = (step - 1) * duration < 0 ? 0 : (step - 1)  * duration;
//   const slowDelay = (step - 1) * duration /2 < 0 ? 0 : (step - 1)  * duration/2;
    const arrowDelay = (duration * .75) * (step);
    const stepDelay = arrowDelay - .5;
  return (
    <NoSSRMotion>
        <m.div
        className="step"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        >
                <m.div
                    className="step__number"
                    initial={{ opacity: 0 }}
                    variants={{
                        onscreen: {
                            opacity: 1,
                            transition:{delay:stepDelay, duration:duration}
                        }
                    }}
                >
                    {step}
                </m.div>
                {!lastStep && 
                    <>
                        <span className="cx-hidden__mobile"><Arrow delay={arrowDelay} route={route} duration={duration/3} variant={'onscreen'} /></span>
                    </>
                }
                
                <m.div
                    className="step__content"
                    initial={{ opacity: 0 }}
                    variants={{
                        onscreen: {
                            opacity: 1,
                            transition:{delay:stepDelay, duration:duration}
                        }
                    }}
                >
                    {heading && heading !== '' &&
                        <h3 className="no-margin--vertical-top cx-h3--mobile"><EqualHeightContainer name={'step-heading'}>{heading}</EqualHeightContainer></h3>
                    }
                    <p>{encodedContent !== '' ? parseHtml(Buffer.from(encodedContent, 'base64').toString()) : parseHtml(children)}</p>
                </m.div>
                {!lastStep && 
                    <>
                        <span className="cx-hidden__desktop cx-hidden__tablet"><Arrow delay={arrowDelay} route={'downArrow'} duration={duration/3} variant={'onscreen'} /></span>
                    </>
                }
        </m.div>
    </NoSSRMotion>
  );
}

export default Step;
