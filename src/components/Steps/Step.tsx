import Arrow from "components/Arrow/Arrow";
import { m } from "framer-motion";

export interface Props {
    step?
    lastStep?
    route?
    align?,
    children?
    classNames?
    style?
}

function Step({
    step = 1,
    lastStep = false,
    route = 'topArc',
    align = '',
    style = {},
    children = <></>,
    classNames
}: Props): JSX.Element {    
  return (

    <m.div
      className="step"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.6 }}
    >
            <m.div
                className="step__number"
                initial={{ opacity: 0 }}
                variants={{
                    onscreen: {
                        opacity: .99,
                        transition:{delay:step - 1, duration:.5}
                    }
                }}
            >
                {step}
            </m.div>
            {!lastStep && 
                <Arrow delay={step-1} route={route} duration={1} variant={'onscreen'} />
            }
            <m.p
                className="step__content"
                initial={{ opacity: 0 }}
                variants={{
                    onscreen: {
                        opacity: .99,
                        transition:{delay:step-1, duration:.5}
                    }
                }}
            >
                {children}
            </m.p>
    </m.div>
  );
}

export default Step;
